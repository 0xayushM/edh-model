-- Create contact_submissions table
CREATE TABLE IF NOT EXISTS contact_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add index on created_at for faster queries
CREATE INDEX IF NOT EXISTS idx_contact_submissions_created_at 
ON contact_submissions(created_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Allow anonymous inserts" ON contact_submissions;
DROP POLICY IF EXISTS "Allow authenticated reads" ON contact_submissions;
DROP POLICY IF EXISTS "Enable insert for anon" ON contact_submissions;
DROP POLICY IF EXISTS "Enable read for authenticated" ON contact_submissions;

-- Create policy to allow anonymous inserts (for contact form submissions)
-- This allows anyone to submit the contact form
CREATE POLICY "Enable insert for anon" 
ON contact_submissions 
FOR INSERT 
TO anon, authenticated
WITH CHECK (true);

-- Create policy to allow authenticated users to read all submissions
CREATE POLICY "Enable read for authenticated" 
ON contact_submissions 
FOR SELECT 
TO authenticated 
USING (true);

-- Optional: Add a trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_contact_submissions_updated_at 
BEFORE UPDATE ON contact_submissions 
FOR EACH ROW 
EXECUTE FUNCTION update_updated_at_column();
