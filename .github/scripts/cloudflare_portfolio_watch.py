#!/usr/bin/env python3
"""Read-only Cloudflare Web Analytics watcher for three portfolio landing pages.

The Cloudflare token is supplied exclusively by GitHub Actions secrets.
Only verified RUM browser pageload events are used; never HTTP requests/bots.
GitHub issue state prevents duplicate alerts across hourly scheduled runs.
"""
from __future__ import annotations

import argparse
import datetime as dt
import json
import os
import sys
import urllib.error
import urllib.parse
import urllib.request

API = "https://api.cloudflare.com/client/v4/graphql"
REPO = "ibrolee/Ibrahim.Alli.Website"
STATE_TITLE = "[Cloudflare Portfolio Watch] State"
HOSTS = {"ibrahimalli.com", "www.ibrahimalli.com"}
PAGES = {
    "/dayyah-couture": "Dayyah Couture",
    "/safiyyr": "Safiyyr",
    "/sallys-apparel": "Sally's Apparel",
}
LOOKBACK_HOURS = 6
GRAPHQL = """
query PortfolioWebAnalytics($account: string!, $start: Time!, $end: Time!) {
  viewer {
    accounts(filter: {accountTag: $account}) {
      rumPageloadEventsAdaptiveGroups(
        limit: 5000
        filter: {datetime_geq: $start, datetime_leq: $end}
        orderBy: [datetimeMinute_ASC]
      ) {
        count
        dimensions {requestHost requestPath datetimeMinute}
      }
    }
  }
}
"""
UTC = dt.timezone.utc


def timestamp(value: dt.datetime) -> str:
    return value.astimezone(UTC).replace(microsecond=0).isoformat().replace("+00:00", "Z")


def minute_datetime(raw: str) -> dt.datetime:
    value = dt.datetime.fromisoformat(raw.replace("Z", "+00:00"))
    if value.tzinfo is None:
        value = value.replace(tzinfo=UTC)
    return value.astimezone(UTC).replace(second=0, microsecond=0)


def clean_path(value: str) -> str:
    path = urllib.parse.urlsplit(value).path.rstrip("/").lower() or "/"
    try:
        return urllib.parse.unquote(path)
    except (UnicodeError, ValueError):
        return path


def matched_page(host: str, path: str) -> tuple[str, str] | None:
    if host.lower().rstrip(".") not in HOSTS:
        return None
    safe_path = clean_path(path)
    for prefix, name in PAGES.items():
        if safe_path == prefix or safe_path.startswith(prefix + "/"):
            return prefix, name
    return None


def summarize(groups: list[dict]) -> dict[str, int]:
    """Group by UTC minute + matched named route, not by HTTP requests."""
    counts: dict[str, int] = {}
    for row in groups:
        dims = row.get("dimensions") or {}
        page = matched_page(str(dims.get("requestHost") or ""), str(dims.get("requestPath") or ""))
        if not page:
            continue
        raw_time = dims.get("datetimeMinute")
        amount = row.get("count")
        if not raw_time or type(amount) not in (int, float) or amount < 0:
            continue
        moment = timestamp(minute_datetime(str(raw_time)))
        key = page[0] + "|" + moment
        counts[key] = counts.get(key, 0) + int(amount)
    return counts


def new_events(old: dict, fresh: dict[str, int], now: dt.datetime) -> tuple[dict, dict[str, int]]:
    """Compute positive deltas only; retain a rolling baseline to avoid duplicates."""
    observed: dict[str, int] = old.get("observed", {})
    activated = minute_datetime(str(old["activated"]))
    earliest = now - dt.timedelta(hours=LOOKBACK_HOURS)
    latest = now + dt.timedelta(minutes=1)
    alerts: dict[str, int] = {}
    next_observed = {
        key: value for key, value in observed.items()
        if key.count("|") == 1 and earliest <= minute_datetime(key.split("|", 1)[1]) <= latest
    }
    for key, count in fresh.items():
        moment = minute_datetime(key.split("|", 1)[1])
        previous = int(observed.get(key, 0))
        # A delayed RUM event from before activation isn't a new visit.
        if moment >= activated and count > previous:
            route = key.split("|", 1)[0]
            alerts[route] = alerts.get(route, 0) + count - previous
        next_observed[key] = max(previous, count)
    return {
        "version": 1,
        "activated": old["activated"],
        "updated": timestamp(now),
        "observed": next_observed
    }, alerts


def call(url: str, token: str, method: str = "GET", data: dict | None = None) -> dict | list:
    payload = json.dumps(data).encode() if data is not None else None
    headers = {
        "Authorization": "Bearer " + token,
        "Accept": "application/vnd.github+json" if "api.github.com" in url else "application/json",
        "User-Agent": "scent-portfolio-analytics-watch/1.0",
    }
    if data is not None:
        headers["Content-Type"] = "application/json"
    req = urllib.request.Request(url, data=payload, headers=headers, method=method)
    with urllib.request.urlopen(req, timeout=35) as resp:
        raw = resp.read(2_000_000)
    return json.loads(raw.decode("utf-8"))


def rum(account: str, token: str, now: dt.datetime) -> dict[str, int]:
    start = now - dt.timedelta(hours=LOOKBACK_HOURS)
    result = call(API, token, method="POST", data={
        "query": GRAPHQL,
        "variables": {"account": account, "start": timestamp(start), "end": timestamp(now)}
    })
    if not isinstance(result, dict) or result.get("errors"):
        raise RuntimeError("Cloudflare Web Analytics query rejected: " + str(
            [e.get("message", "unknown") for e in result.get("errors", [])][:3]
        ))
    zones = (((result.get("data") or {}).get("viewer") or {}).get("accounts") or [])
    if not zones or not isinstance(zones[0].get("rumPageloadEventsAdaptiveGroups"), list):
        raise RuntimeError("Cloudflare RUM account dataset missing. Check account permissions.")
    groups = zones[0]["rumPageloadEventsAdaptiveGroups"]
    if len(groups) >= 5000:
        raise RuntimeError("Web Analytics response hit the 5000-group cap; cannot safely detect every visit.")
    return summarize(groups)


def find_state(token: str) -> dict | None:
    # The repo is public and contains no secret values in this state issue.
    for page in range(1, 21):
        url = f"https://api.github.com/repos/{REPO}/issues?state=open&sort=created&direction=asc&per_page=100&page={page}"
        issues = call(url, token)
        if not isinstance(issues, list):
            raise RuntimeError("Unexpected GitHub issues response")
        for issue in issues:
            if issue.get("title") == STATE_TITLE and not issue.get("pull_request"):
                return issue
        if len(issues) < 100:
            break
    return None


def write_state(token: str, issue: dict | None, state: dict) -> None:
    data = {"body": "Private token not stored here. State of read-only RUM monitoring.\n\n" +
            "<!-- portfolio-watch-state\n" + json.dumps(state, separators=(",", ":"), sort_keys=True) +
            "\n-->"}
    if issue:
        call(f"https://api.github.com/repos/{REPO}/issues/{issue['number']}", token, "PATCH", data)
    else:
        call(f"https://api.github.com/repos/{REPO}/issues", token, "POST", {
            "title": STATE_TITLE, **data
        })


def parse_state(issue: dict) -> dict:
    text = issue.get("body") or ""
    marker = "<!-- portfolio-watch-state\n"
    if marker not in text:
        raise RuntimeError("Existing watch state is damaged; refuse to reset or duplicate alerts")
    raw = text.split(marker, 1)[1].split("\n-->", 1)[0]
    result = json.loads(raw)
    if result.get("version") != 1 or not isinstance(result.get("observed"), dict):
        raise RuntimeError("Existing watch state version invalid")
    return result


def write_alert(token: str, route: str, count: int, now: dt.datetime) -> None:
    name = PAGES[route]
    body = (f"Cloudflare Web Analytics recorded **{count} new browser page-view(s)** "
            f"for **{name}** (\`{route}\`) on ibrahimalli.com.\n\n"
            f"Detected at **{timestamp(now)}** using Cloudflare's RUM pageload data; "
            "the activity may have happened within the last six hours because analytics can be delayed.\n"
            "These are anonymous page views, not proof that any named client visited.")
    call(f"https://api.github.com/repos/{REPO}/issues", token, "POST", {
        "title": f"[Portfolio Visit Alert] {name} — {count} new page view(s)",
        "body": body,
        "assignees": ["ibrolee"]
    })


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--probe", action="store_true", help="Validate RUM connection without writing issues")
    args = parser.parse_args()
    cf = os.environ.get("CLOUDFLARE_ANALYTICS_TOKEN", "").strip()
    account = os.environ.get("CLOUDFLARE_ACCOUNT_ID", "").strip()
    github = os.environ.get("GH_TOKEN", "").strip()
    if not cf or not account:
        raise RuntimeError("Missing Cloudflare Analytics token or account ID in GitHub Actions")
    now = dt.datetime.now(UTC)
    counts = rum(account, cf, now)
    if args.probe:
        print("Cloudflare browser Web Analytics query succeeded. Tracked route/minute groups:", len(counts))
        return
    if not github:
        raise RuntimeError("Missing GitHub Actions token")
    issue = find_state(github)
    if issue is None:
        state = {
            "version": 1, "activated": timestamp(now), "updated": timestamp(now),
            "observed": counts
        }
        write_state(github, None, state)
        print("Initialized visit monitor baseline; historic page views ignored.")
        return
    state, alerts = new_events(parse_state(issue), counts, now)
    # Save the watermark first: if issue posting fails, do not generate duplicate alerts.
    write_state(github, issue, state)
    for route, value in alerts.items():
        if value:
            write_alert(github, route, value, now)
    print("Cloudflare portfolio watch checked:", len(alerts), "routes with new browser page views.")


if __name__ == "__main__":
    try:
        main()
    except Exception as exc:
        # Never log the secret token, even in error cases.
        print("Portfolio watch failed:", str(exc), file=sys.stderr)
        sys.exit(1)
