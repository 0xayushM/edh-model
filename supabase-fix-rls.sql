-- COMPLETE FIX FOR CONTACT FORM RLS ISSUE
-- Run this entire script in Supabase SQL Editor

-- Step 1: Disable RLS temporarily to clean up
ALTER TABLE contact_submissions DISABLE ROW LEVEL SECURITY;

-- Step 2: Drop ALL existing policies
DO $$ 
DECLARE 
    r RECORD;
BEGIN
    FOR r IN (SELECT policyname FROM pg_policies WHERE tablename = 'contact_submissions') 
    LOOP
        EXECUTE 'DROP POLICY IF EXISTS ' || quote_ident(r.policyname) || ' ON contact_submissions';
    END LOOP;
END $$;

-- Step 3: Re-enable RLS
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Step 4: Create a simple, permissive policy for inserts
CREATE POLICY "allow_all_inserts" 
ON contact_submissions 
FOR INSERT 
WITH CHECK (true);

-- Step 5: Create policy for authenticated reads (optional)
CREATE POLICY "allow_authenticated_select" 
ON contact_submissions 
FOR SELECT 
TO authenticated 
USING (true);

-- Verify the policies were created
SELECT policyname, roles, cmd 
FROM pg_policies 
WHERE tablename = 'contact_submissions';
