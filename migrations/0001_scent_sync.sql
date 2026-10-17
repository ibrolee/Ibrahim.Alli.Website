-- One private Scent Cabinet account. No existing browser data is migrated or deleted.
CREATE TABLE IF NOT EXISTS scent_account (
  id TEXT PRIMARY KEY CHECK(id='owner'),
  salt TEXT NOT NULL,
  password_hash TEXT NOT NULL,
  iterations INTEGER NOT NULL,
  created_at INTEGER NOT NULL
);
CREATE TABLE IF NOT EXISTS scent_session (
  token_hash TEXT PRIMARY KEY,
  expires_at INTEGER NOT NULL,
  created_at INTEGER NOT NULL
);
CREATE TABLE IF NOT EXISTS scent_snapshot (
  id TEXT PRIMARY KEY CHECK(id='owner'),
  version INTEGER NOT NULL CHECK(version>=1),
  payload TEXT NOT NULL,
  updated_at INTEGER NOT NULL
);
CREATE TABLE IF NOT EXISTS scent_login_limit (
  id TEXT PRIMARY KEY CHECK(id='owner'),
  attempts INTEGER NOT NULL,
  window_start INTEGER NOT NULL,
  lock_until INTEGER NOT NULL
);
