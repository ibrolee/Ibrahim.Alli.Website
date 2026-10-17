# Scent Cabinet private sync — activation guide

This feature is deliberately OFF until Cloudflare D1 and a setup secret are configured. Existing localStorage and IndexedDB collections remain untouched; the site continues to work offline. **Do not use an empty Safari session as your first synced device.** Connect the Home Screen app containing your six saved fragrances first.

## What to create in Cloudflare (once)

1. Open Cloudflare Dashboard → Storage & databases → D1 → Create database. Name: `scent-cabinet-sync`.
2. Copy the **database ID** (UUID). This is not a secret. Add the following to the existing root `wrangler.jsonc` with the exact ID, preserving all existing fields:

   ```json
   "d1_databases": [
     {
       "binding": "SCENT_SYNC_DB",
       "database_name": "scent-cabinet-sync",
       "database_id": "PASTE_ACTUAL_DATABASE_UUID_HERE"
     }
   ]
   ```

   The repository must use the real ID; do not deploy the placeholder. Use the existing Git-linked Worker and keep its production branch `migration/cloudflare-portfolio-2026-10-17`. Do not move DNS or create another Worker.
3. In the D1 database's **Console**, run the SQL from `migrations/0001_scent_sync.sql`. Verify four tables were created: `scent_account`, `scent_session`, `scent_snapshot`, `scent_login_limit`.
4. In Cloudflare Workers & Pages → **ibrahimalli-portfolio-preview** → Settings → Variables and Secrets, create a secret (encrypted, not plaintext variable) named `SCENT_SYNC_SETUP_KEY`. Generate a random code of at least 24 characters. **Never paste the secret, your chosen password or an API token into ChatGPT or GitHub**.
5. Once the real D1 UUID is committed and the Worker deploy succeeds, open `https://ibrahimalli.com/fragrance` from the **Home Screen app with the six saved wishes**. Tap Sync → create account. Enter your setup key privately on the site and choose a private password of at least 12 characters. The site will upload your current wishlist and show Synced.
6. Open the same URL in Safari → Sync → enter the same private password. Its empty collection will download the saved wishlist.

## Safeguards

- All sync routes are same-origin, require secure, HttpOnly, SameSite=Strict cookies and a server-side PBKDF2 password check.
- Only one private account. Login attempts are throttled; session tokens are SHA-256 hashed in D1 and expire after 30 days.
- Each snapshot has a database version number; stale writes return HTTP 409 rather than overwriting.
- A browser with an empty collection downloads a populated cloud collection. Two independent nonempty collections require an explicit choice before replacement.
- The app saves a local recovery copy before importing cloud state; downloaded JSON backups remain supported.
- Auto sync runs after edits and when a connected device returns online. **True simultaneous cross-device editing may require conflict selection**; the app does not attempt risky automatic conflict merging.
- Only collection data is cloud-synced initially. **Owner-uploaded images in IndexedDB are not uploaded**; keep using the full JSON backup/restore for photos. R2 photo sync can be added after D1 is proven stable.
- Public fragrance discovery API is unchanged; the D1 database is not public.
- When D1 is not configured, Sync displays a setup-needed message without disabling any existing collection features.

## Recovery and rollback

Do not clear browser storage or remove the Home Screen app during rollout. Download a full JSON backup from the original six-item app before enabling any new account. If a sync branch has a bug, revert only the sync feature's GitHub commit or disable D1 binding; unsynced local data remains in that browser. To safely start over, preserve full backups before making any cloud database changes.
