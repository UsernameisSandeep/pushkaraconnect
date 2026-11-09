import "dotenv/config";
import express from "express";
import cors from "cors";
import pg from "pg";

const { Pool } = pg;
const app = express();
const port = Number(process.env.PORT) || 4000;

app.use(cors({ origin: process.env.WEB_ORIGIN || "http://localhost:5173" }));
app.use(express.json());

const sampleLocations = [
  { id: "ap-rajahmundry", name: "Rajamahendravaram", district: "East Godavari", state: "Andhra Pradesh", note: "Godavari riverfront area", status: "RESEARCH_CANDIDATE" },
  { id: "ap-kovvur", name: "Kovvur", district: "East Godavari", state: "Andhra Pradesh", note: "Godavari riverfront area", status: "RESEARCH_CANDIDATE" },
  { id: "ap-pattiseema", name: "Pattiseema", district: "Polavaram", state: "Andhra Pradesh", note: "Godavari river area", status: "RESEARCH_CANDIDATE" },
  { id: "ts-basara", name: "Basara", district: "Nirmal", state: "Telangana", note: "Godavari river area", status: "RESEARCH_CANDIDATE" },
  { id: "ts-dharmapuri", name: "Dharmapuri", district: "Jagtial", state: "Telangana", note: "Godavari river area", status: "RESEARCH_CANDIDATE" },
  { id: "ts-bhadrachalam", name: "Bhadrachalam", district: "Bhadradri Kothagudem", state: "Telangana", note: "Godavari river area", status: "RESEARCH_CANDIDATE" }
];

const pool = process.env.DATABASE_URL
  ? new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: process.env.DATABASE_SSL === "true" ? { rejectUnauthorized: false } : undefined
    })
  : null;

app.get("/api/health", async (_req, res) => {
  let database = "not_configured";
  if (pool) {
    try {
      await pool.query("SELECT 1");
      database = "connected";
    } catch {
      database = "unavailable";
    }
  }
  res.json({
    status: "ok",
    service: "PushkaraConnect API",
    database,
    timestamp: new Date().toISOString()
  });
});

app.get("/api/locations", async (req, res) => {
  const search = String(req.query.search || "").trim();
  const state = String(req.query.state || "").trim();

  try {
    let locations;
    let source = "sample_data";

    if (pool) {
      const result = await pool.query(
        `SELECT id, name, district, state, note, verification_status
         FROM locations
         WHERE ($1 = '' OR name ILIKE '%' || $1 || '%' OR district ILIKE '%' || $1 || '%' OR state ILIKE '%' || $1 || '%')
           AND ($2 = '' OR state = $2)
         ORDER BY state, district, name`,
        [search, state]
      );
      locations = result.rows.map((row) => ({
        ...row,
        status: row.verification_status
      }));
      source = "postgresql";
    } else {
      locations = sampleLocations.filter((place) => {
        const searchable = `${place.name} ${place.district} ${place.state}`.toLowerCase();
        return searchable.includes(search.toLowerCase()) && (!state || place.state === state);
      });
    }

    res.json({ data: locations, meta: { source, count: locations.length } });
  } catch (error) {
    console.error("Unable to load locations:", error.message);
    res.status(500).json({ error: "Unable to load locations right now." });
  }
});

app.listen(port, () => {
  console.log(`PushkaraConnect API listening on http://localhost:${port}`);
  console.log(pool ? "Database mode: PostgreSQL configured" : "Database mode: sample data (DATABASE_URL not set)");
});
