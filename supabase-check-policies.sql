-- Check if the table exists and RLS is enabled
SELECT 
  schemaname,
  tablename,
  rowsecurity as rls_enabled
FROM pg_tables 
WHERE tablename = 'contact_submissions';

-- Check all existing policies on the table
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual,
  with_check
FROM pg_policies 
WHERE tablename = 'contact_submissions';

-- If you see policies that shouldn't be there, run this to clean up:
-- DROP POLICY IF EXISTS "policy_name_here" ON contact_submissions;
