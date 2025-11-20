# Supabase Setup Instructions

## 1. Create a Supabase Project

1. Go to [https://supabase.com](https://supabase.com) and sign up/login
2. Click "New Project"
3. Fill in your project details:
   - Name: EDHWay Contact Forms
   - Database Password: (create a strong password)
   - Region: Choose closest to your users
4. Wait for the project to be created (~2 minutes)

## 2. Create the Database Table

1. In your Supabase dashboard, go to the **SQL Editor**
2. Click "New Query"
3. Paste the following SQL and click "Run":

```sql
-- Create contact_submissions table
CREATE TABLE contact_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Create a policy to allow inserts from anyone
CREATE POLICY "Allow public inserts" ON contact_submissions
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Create a policy to allow authenticated users to read all submissions
CREATE POLICY "Allow authenticated reads" ON contact_submissions
  FOR SELECT
  TO authenticated
  USING (true);
```

## 3. Get Your API Keys

1. In your Supabase dashboard, go to **Settings** → **API**
2. Copy the following values:
   - **Project URL** (under "Project URL")
   - **anon public** key (under "Project API keys")

## 4. Update Environment Variables

1. Open the `.env.local` file in your project root
2. Replace the placeholder values with your actual Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

## 5. Test the Integration

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Open your app and try submitting the contact form
3. Check your Supabase dashboard → **Table Editor** → **contact_submissions** to see the submitted data

## 6. View Submissions

To view all contact form submissions:

1. Go to your Supabase dashboard
2. Navigate to **Table Editor**
3. Select the **contact_submissions** table
4. You'll see all submissions with name, email, message, and timestamp

## Optional: Set Up Email Notifications

If you want to receive email notifications when someone submits the form:

1. Go to **Database** → **Webhooks** in Supabase
2. Create a new webhook that triggers on INSERT to `contact_submissions`
3. Use a service like Zapier, Make.com, or a custom endpoint to send emails

## Security Notes

- The `anon` key is safe to use in client-side code
- Row Level Security (RLS) is enabled to control access
- Only INSERT operations are allowed for anonymous users
- Reading submissions requires authentication (for admin access)
