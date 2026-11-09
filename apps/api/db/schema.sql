CREATE TABLE IF NOT EXISTS locations (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  district TEXT NOT NULL,
  state TEXT NOT NULL CHECK (state IN ('Andhra Pradesh', 'Telangana')),
  note TEXT NOT NULL DEFAULT '',
  verification_status TEXT NOT NULL DEFAULT 'RESEARCH_CANDIDATE'
    CHECK (verification_status IN ('RESEARCH_CANDIDATE', 'PENDING_VERIFICATION', 'VERIFIED', 'REJECTED')),
  source_url TEXT,
  verified_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS locations_state_district_idx
  ON locations (state, district);
