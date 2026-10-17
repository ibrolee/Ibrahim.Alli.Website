# Scent Cabinet — private uploaded photo sync

Photo sync is deliberately **disabled until an R2 bucket is bound**. Existing local IndexedDB images, the seven saved wishlist items, and D1 sync must continue working even if R2 is missing.

## Cloudflare account setup (one-time)
1. Cloudflare Dashboard → R2 object storage → Overview → Create bucket.
2. Bucket name: `scent-cabinet-photos`, with the default private settings. **Do not turn on public access, R2.dev, or custom public domains.**
3. Open Workers & Pages → `ibrahimalli-portfolio-preview` → Settings → Bindings → Add binding → R2 bucket.
4. Binding variable: `SCENT_PHOTOS_R2`; Bucket: `scent-cabinet-photos`. Save and deploy if requested.
5. Once the bucket actually exists, also update `wrangler.jsonc` with:
   ```json
   "r2_buckets": [
      {"binding":"SCENT_PHOTOS_R2","bucket_name":"scent-cabinet-photos"}
   ]
   ```
   Never include this binding **before** the R2 bucket is created: Cloudflare builds may fail against a non-existent bucket.
6. Sign in to Scent Cabinet as before, using the existing account and no new password. On the Home Screen app that has the original pictures, open Sync and keep the app online until **Uploaded perfume photos — synced** is shown. Then open Safari, select Sync, and allow photo download.

## Protections

- R2 bucket is private; same-origin, authenticated API only. No anonymous photos.
- Accept JPEG, PNG, WebP uploads up to 500 kB only; existing client compresses imported photos to under 450 kB.
- Manual fragrance and combo images are supported. Identity keys are validated; no arbitrary paths.
- Local photo changes are queued even when offline and retried when the user opens the app, refocuses or every 90 seconds.
- Photo deletion writes a tombstone, preventing an outdated picture on another browser being reuploaded during reconciliation.
- A new browser downloads the image from R2 to its local IndexedDB copy; removing the R2 binding does not delete local copies.
- Conflicting, independently saved photos stay preserved locally until the owner deliberately replaces one. Replacements are explicit.
- Use **Backup** to export both details and uploaded photos; do not uninstall the Home Screen shortcut before confirming R2 upload on that device.
- Browser and D1 can report "Everything is synced" before R2 is configured; the Sync dialog now has a distinct uploaded-photo sync indicator.

## Verification

After binding R2:
- `GET /api/fragrance/sync/photos/status` requires signed-in cookies and returns `{"enabled":true}`.
- Anonymous requests receive HTTP 401.
- On Home Screen app, Sync → Photos should transition Checking → Syncing → Uploaded perfume photos are synced.
- On Safari, manually uploaded photos should be present in Wishlist, Shelf and combos.

No additional R2 API tokens or access keys are needed. The Worker binding is the only runtime credential.
