-- ============================================================
-- Add image_url to testimonials
-- Migration: 20240002_testimonial_image.sql
-- ============================================================

ALTER TABLE public.testimonials
  ADD COLUMN IF NOT EXISTS image_url TEXT;

-- ============================================================
-- Supabase Storage — testimonials bucket
-- Run this ONCE in the Supabase Dashboard > SQL Editor
-- (Storage buckets can't be created via migrations directly,
--  but the policy below locks down who can upload)
-- ============================================================

-- Allow public read access to the testimonials bucket
-- (Create the bucket manually in Dashboard > Storage first,
--  name it "testimonials", set it to PUBLIC)

-- RLS: only admins can upload/delete; anyone can read
-- These policies apply once the bucket exists:

-- INSERT (upload)
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'storage' AND tablename = 'objects'
      AND policyname = 'Admins can upload testimonial images'
  ) THEN
    CREATE POLICY "Admins can upload testimonial images"
      ON storage.objects FOR INSERT
      WITH CHECK (bucket_id = 'testimonials' AND public.is_admin());
  END IF;
END $$;

-- UPDATE
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'storage' AND tablename = 'objects'
      AND policyname = 'Admins can update testimonial images'
  ) THEN
    CREATE POLICY "Admins can update testimonial images"
      ON storage.objects FOR UPDATE
      USING (bucket_id = 'testimonials' AND public.is_admin());
  END IF;
END $$;

-- DELETE
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'storage' AND tablename = 'objects'
      AND policyname = 'Admins can delete testimonial images'
  ) THEN
    CREATE POLICY "Admins can delete testimonial images"
      ON storage.objects FOR DELETE
      USING (bucket_id = 'testimonials' AND public.is_admin());
  END IF;
END $$;

-- SELECT (public read)
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'storage' AND tablename = 'objects'
      AND policyname = 'Public can read testimonial images'
  ) THEN
    CREATE POLICY "Public can read testimonial images"
      ON storage.objects FOR SELECT
      USING (bucket_id = 'testimonials');
  END IF;
END $$;
