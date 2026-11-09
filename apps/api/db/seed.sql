INSERT INTO locations (id, name, district, state, note, verification_status)
VALUES
  ('ap-rajahmundry', 'Rajamahendravaram', 'East Godavari', 'Andhra Pradesh', 'Godavari riverfront area', 'RESEARCH_CANDIDATE'),
  ('ap-kovvur', 'Kovvur', 'East Godavari', 'Andhra Pradesh', 'Godavari riverfront area', 'RESEARCH_CANDIDATE'),
  ('ap-pattiseema', 'Pattiseema', 'Polavaram', 'Andhra Pradesh', 'Godavari river area', 'RESEARCH_CANDIDATE'),
  ('ts-basara', 'Basara', 'Nirmal', 'Telangana', 'Godavari river area', 'RESEARCH_CANDIDATE'),
  ('ts-dharmapuri', 'Dharmapuri', 'Jagtial', 'Telangana', 'Godavari river area', 'RESEARCH_CANDIDATE'),
  ('ts-bhadrachalam', 'Bhadrachalam', 'Bhadradri Kothagudem', 'Telangana', 'Godavari river area', 'RESEARCH_CANDIDATE')
ON CONFLICT (id) DO NOTHING;
