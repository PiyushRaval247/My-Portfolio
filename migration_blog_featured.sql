-- BLOG FEATURED STATUS UPGRADE
-- Run this in your Supabase SQL Editor (https://supabase.com/dashboard/project/_/sql)

-- 1. Add is_featured column to blogs table
ALTER TABLE IF EXISTS blogs 
ADD COLUMN IF NOT EXISTS is_featured BOOLEAN DEFAULT false;

-- 2. Optional: Set the most recent post as featured initially
UPDATE blogs
SET is_featured = true
WHERE id IN (
  SELECT id FROM blogs 
  ORDER BY created_at DESC 
  LIMIT 1
);
