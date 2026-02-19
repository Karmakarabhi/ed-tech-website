-- ============================================================
-- Gandhi University — Seed Data
-- supabase/seed.sql
-- ============================================================
-- NOTE: prices are stored in paise (₹1 = 100 paise)
-- ============================================================

-- ============================================================
-- COURSES
-- ============================================================
INSERT INTO public.courses (
  id, slug, title, description, long_description,
  price, original_price, discount, category,
  featured, total_lessons, total_duration, accessibility, thumbnail_url, status
) VALUES
(
  'c1000000-0000-0000-0000-000000000001',
  'the-anxiety-blueprint',
  'The Anxiety Blueprint',
  'A 6-week deep dive into understanding, managing, and reframing anxiety using CBT frameworks and journaling protocols.',
  '{"blocks": [{"type": "paragraph", "text": "Are you stuck in cycles of overthinking, self-doubt, and restlessness? Anxiety isn''t your enemy — it''s a signal. This course gives you the tools to decode it. Through 6 structured weeks of CBT-based frameworks, guided journaling, and evidence-based exercises, you''ll learn to understand, manage, and ultimately reframe your anxiety into a source of clarity and strength."}]}',
  299900, 499900, '40% OFF', 'CBT & Anxiety',
  true, 24, '8h 30m', 'Online',
  'https://images.unsplash.com/photo-1544027993-37dbfe43562a?auto=format&fit=crop&q=80&w=600',
  'published'
),
(
  'c1000000-0000-0000-0000-000000000002',
  'emotional-intelligence-for-men',
  'Emotional Intelligence for Men',
  'Learn to identify, process, and articulate emotions without suppression. Practical frameworks for daily life.',
  '{"blocks": [{"type": "paragraph", "text": "Most men are taught to suppress emotions. This course teaches you to master them instead. Using frameworks from emotional intelligence research, attachment theory, and clinical psychology, you''ll learn to identify what you feel, why you feel it, and how to express it in ways that strengthen — not weaken — your relationships and self-image."}]}',
  199900, 349900, '43% OFF', 'Emotional Mastery',
  false, 20, '6h 45m', 'Online',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600',
  'published'
),
(
  'c1000000-0000-0000-0000-000000000003',
  'discipline-and-identity',
  'Discipline & Identity',
  'Build lasting habits rooted in self-understanding rather than willpower. A psychology-first approach to discipline.',
  '{"blocks": [{"type": "paragraph", "text": "Willpower fades. Identity doesn''t. This course takes a radically different approach to discipline — instead of brute-force motivation, you''ll learn to build habits that align with your core identity. Drawing from behavioral psychology, identity-based habit theory, and self-determination research, this is discipline that actually lasts."}]}',
  249900, 399900, '38% OFF', 'Personal Growth',
  false, 18, '5h 50m', 'Online',
  'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&q=80&w=600',
  'published'
),
(
  'c1000000-0000-0000-0000-000000000004',
  'shadow-work-fundamentals',
  'Shadow Work Fundamentals',
  'Explore Jungian shadow work concepts to confront hidden patterns, heal inner conflicts, and integrate your full personality.',
  '{"blocks": [{"type": "paragraph", "text": "Carl Jung said, ''Until you make the unconscious conscious, it will direct your life and you will call it fate.'' This course guides you through the powerful practice of shadow work — identifying the hidden parts of your personality that drive self-sabotage, relationship conflicts, and emotional reactivity."}]}',
  349900, 549900, '36% OFF', 'Depth Psychology',
  false, 22, '7h 20m', 'Online',
  'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&q=80&w=600',
  'published'
),
(
  'c1000000-0000-0000-0000-000000000005',
  'stoic-resilience',
  'Stoic Resilience',
  'Ancient Stoic philosophy meets modern psychology. Build mental toughness through practical daily exercises.',
  '{"blocks": [{"type": "paragraph", "text": "The Stoics understood something modern self-help often misses: true strength comes from within. This course bridges 2,000 years of Stoic wisdom with contemporary psychological research. You''ll learn practical techniques from Marcus Aurelius, Seneca, and Epictetus — adapted for the modern Indian man."}]}',
  149900, 249900, '40% OFF', 'Philosophy',
  false, 16, '5h 10m', 'Online',
  'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=600',
  'published'
),
(
  'c1000000-0000-0000-0000-000000000006',
  'relationships-and-attachment-styles',
  'Relationships & Attachment Styles',
  'Understand your attachment patterns and build healthier, more conscious relationships using research-backed frameworks.',
  '{"blocks": [{"type": "paragraph", "text": "Your relationship patterns aren''t random — they''re deeply rooted in your attachment style, formed in childhood and reinforced through every connection since. This course uses attachment theory, Gottman''s research on relationship dynamics, and modern communication frameworks to help you understand your patterns and build healthier, more fulfilling relationships."}]}',
  299900, 449900, '33% OFF', 'Relationships',
  false, 20, '7h 00m', 'Online',
  'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&q=80&w=600',
  'published'
);

-- ============================================================
-- CHAPTERS — Course 1: The Anxiety Blueprint
-- ============================================================
INSERT INTO public.chapters (id, course_id, title, sort_order) VALUES
  ('a1000001-0000-0000-0000-000000000001', 'c1000000-0000-0000-0000-000000000001', 'Understanding Anxiety — The Foundation', 1),
  ('a1000001-0000-0000-0000-000000000002', 'c1000000-0000-0000-0000-000000000001', 'Cognitive Behavioral Therapy — Core Tools', 2),
  ('a1000001-0000-0000-0000-000000000003', 'c1000000-0000-0000-0000-000000000001', 'Journaling Protocols for Anxiety', 3),
  ('a1000001-0000-0000-0000-000000000004', 'c1000000-0000-0000-0000-000000000001', 'Physical & Breathwork Techniques', 4),
  ('a1000001-0000-0000-0000-000000000005', 'c1000000-0000-0000-0000-000000000001', 'Building Long-Term Resilience', 5);

-- Lessons — Chapter 1
INSERT INTO public.lessons (chapter_id, title, type, duration, preview, sort_order) VALUES
  ('a1000001-0000-0000-0000-000000000001', 'Welcome & How to Use This Course', 'pdf', NULL, true, 1),
  ('a1000001-0000-0000-0000-000000000001', 'What Is Anxiety, Really?', 'video', '18m 30s', true, 2),
  ('a1000001-0000-0000-0000-000000000001', 'The Neuroscience Behind Anxious Thoughts', 'video', '22m 15s', false, 3),
  ('a1000001-0000-0000-0000-000000000001', 'Self-Assessment: Your Anxiety Profile', 'exercise', NULL, false, 4);

-- Lessons — Chapter 2
INSERT INTO public.lessons (chapter_id, title, type, duration, preview, sort_order) VALUES
  ('a1000001-0000-0000-0000-000000000002', 'Introduction to CBT', 'video', '16m 45s', false, 1),
  ('a1000001-0000-0000-0000-000000000002', 'Identifying Cognitive Distortions', 'video', '20m 10s', false, 2),
  ('a1000001-0000-0000-0000-000000000002', 'The Thought Record Technique', 'pdf', NULL, false, 3),
  ('a1000001-0000-0000-0000-000000000002', 'Practice: Reframing Your Top 3 Worries', 'exercise', NULL, false, 4);

-- Lessons — Chapter 3
INSERT INTO public.lessons (chapter_id, title, type, duration, preview, sort_order) VALUES
  ('a1000001-0000-0000-0000-000000000003', 'Why Journaling Works (The Science)', 'video', '12m 20s', false, 1),
  ('a1000001-0000-0000-0000-000000000003', 'Morning Pages Protocol', 'pdf', NULL, false, 2),
  ('a1000001-0000-0000-0000-000000000003', 'The Worry Dump Technique', 'video', '14m 50s', false, 3),
  ('a1000001-0000-0000-0000-000000000003', 'Evening Reflection Framework', 'pdf', NULL, false, 4);

-- Lessons — Chapter 4
INSERT INTO public.lessons (chapter_id, title, type, duration, preview, sort_order) VALUES
  ('a1000001-0000-0000-0000-000000000004', 'The Body-Mind Connection', 'video', '15m 30s', false, 1),
  ('a1000001-0000-0000-0000-000000000004', 'Box Breathing & 4-7-8 Method', 'video', '10m 45s', false, 2),
  ('a1000001-0000-0000-0000-000000000004', 'Progressive Muscle Relaxation', 'video', '18m 00s', false, 3),
  ('a1000001-0000-0000-0000-000000000004', 'Daily Practice Checklist', 'pdf', NULL, false, 4);

-- Lessons — Chapter 5
INSERT INTO public.lessons (chapter_id, title, type, duration, preview, sort_order) VALUES
  ('a1000001-0000-0000-0000-000000000005', 'From Coping to Thriving', 'video', '20m 15s', false, 1),
  ('a1000001-0000-0000-0000-000000000005', 'Creating Your Personal Anxiety Toolkit', 'exercise', NULL, false, 2),
  ('a1000001-0000-0000-0000-000000000005', 'Lifestyle Design for Mental Health', 'video', '16m 30s', false, 3),
  ('a1000001-0000-0000-0000-000000000005', 'Final Assessment & Certificate', 'quiz', NULL, false, 4);

-- ============================================================
-- CHAPTERS — Course 2: Emotional Intelligence for Men
-- ============================================================
INSERT INTO public.chapters (id, course_id, title, sort_order) VALUES
  ('a1000002-0000-0000-0000-000000000001', 'c1000000-0000-0000-0000-000000000002', 'Emotional Intelligence — Overview', 1),
  ('a1000002-0000-0000-0000-000000000002', 'c1000000-0000-0000-0000-000000000002', 'Self-Awareness & Emotional Literacy', 2),
  ('a1000002-0000-0000-0000-000000000003', 'c1000000-0000-0000-0000-000000000002', 'Emotional Regulation', 3),
  ('a1000002-0000-0000-0000-000000000004', 'c1000000-0000-0000-0000-000000000002', 'Empathy & Social Skills', 4),
  ('a1000002-0000-0000-0000-000000000005', 'c1000000-0000-0000-0000-000000000002', 'Integration & Daily Practice', 5);

INSERT INTO public.lessons (chapter_id, title, type, duration, preview, sort_order) VALUES
  ('a1000002-0000-0000-0000-000000000001', 'What Is Emotional Intelligence?', 'video', '14m 20s', true, 1),
  ('a1000002-0000-0000-0000-000000000001', 'The 5 Pillars of EQ', 'pdf', NULL, true, 2),
  ('a1000002-0000-0000-0000-000000000001', 'Why Men Struggle with Emotions', 'video', '18m 45s', false, 3),
  ('a1000002-0000-0000-0000-000000000002', 'The Emotion Wheel: Naming What You Feel', 'video', '12m 30s', false, 1),
  ('a1000002-0000-0000-0000-000000000002', 'Body Scanning for Hidden Emotions', 'video', '15m 10s', false, 2),
  ('a1000002-0000-0000-0000-000000000002', 'Journaling for Emotional Clarity', 'exercise', NULL, false, 3),
  ('a1000002-0000-0000-0000-000000000002', 'Self-Awareness Assessment', 'quiz', NULL, false, 4),
  ('a1000002-0000-0000-0000-000000000003', 'Fight, Flight, Freeze: Understanding Reactions', 'video', '20m 00s', false, 1),
  ('a1000002-0000-0000-0000-000000000003', 'The Pause Protocol', 'video', '10m 35s', false, 2),
  ('a1000002-0000-0000-0000-000000000003', 'Anger Management Without Suppression', 'video', '22m 15s', false, 3),
  ('a1000002-0000-0000-0000-000000000003', 'Practice: Trigger Mapping', 'exercise', NULL, false, 4),
  ('a1000002-0000-0000-0000-000000000004', 'Active Listening Masterclass', 'video', '16m 50s', false, 1),
  ('a1000002-0000-0000-0000-000000000004', 'Reading Emotional Cues', 'video', '13m 25s', false, 2),
  ('a1000002-0000-0000-0000-000000000004', 'Navigating Difficult Conversations', 'video', '19m 40s', false, 3),
  ('a1000002-0000-0000-0000-000000000005', 'Building Your EQ Routine', 'pdf', NULL, false, 1),
  ('a1000002-0000-0000-0000-000000000005', 'The 30-Day EQ Challenge', 'exercise', NULL, false, 2),
  ('a1000002-0000-0000-0000-000000000005', 'Final Assessment', 'quiz', NULL, false, 3);

-- ============================================================
-- CHAPTERS — Course 3: Discipline & Identity
-- ============================================================
INSERT INTO public.chapters (id, course_id, title, sort_order) VALUES
  ('a1000003-0000-0000-0000-000000000001', 'c1000000-0000-0000-0000-000000000003', 'The Discipline Myth', 1),
  ('a1000003-0000-0000-0000-000000000002', 'c1000000-0000-0000-0000-000000000003', 'Identity Architecture', 2),
  ('a1000003-0000-0000-0000-000000000003', 'c1000000-0000-0000-0000-000000000003', 'Habit Engineering', 3),
  ('a1000003-0000-0000-0000-000000000004', 'c1000000-0000-0000-0000-000000000003', 'Overcoming Resistance', 4),
  ('a1000003-0000-0000-0000-000000000005', 'c1000000-0000-0000-0000-000000000003', 'The Disciplined Life', 5);

INSERT INTO public.lessons (chapter_id, title, type, duration, preview, sort_order) VALUES
  ('a1000003-0000-0000-0000-000000000001', 'Why Willpower Fails', 'video', '16m 30s', true, 1),
  ('a1000003-0000-0000-0000-000000000001', 'The Identity-Behavior Loop', 'video', '20m 00s', false, 2),
  ('a1000003-0000-0000-0000-000000000001', 'Assessment: Your Discipline Profile', 'exercise', NULL, false, 3),
  ('a1000003-0000-0000-0000-000000000002', 'Who Do You Want to Become?', 'video', '18m 15s', false, 1),
  ('a1000003-0000-0000-0000-000000000002', 'Values Clarification Exercise', 'exercise', NULL, false, 2),
  ('a1000003-0000-0000-0000-000000000002', 'The Identity Statement Blueprint', 'pdf', NULL, false, 3),
  ('a1000003-0000-0000-0000-000000000003', 'The Habit Loop Decoded', 'video', '14m 45s', false, 1),
  ('a1000003-0000-0000-0000-000000000003', 'Habit Stacking & Environment Design', 'video', '19m 20s', false, 2),
  ('a1000003-0000-0000-0000-000000000003', 'The 2-Minute Rule', 'video', '10m 30s', false, 3),
  ('a1000003-0000-0000-0000-000000000003', 'Building Your Habit Stack', 'exercise', NULL, false, 4),
  ('a1000003-0000-0000-0000-000000000004', 'Procrastination Psychology', 'video', '17m 00s', false, 1),
  ('a1000003-0000-0000-0000-000000000004', 'The Motivation Myth', 'video', '13m 50s', false, 2),
  ('a1000003-0000-0000-0000-000000000004', 'Accountability Systems That Work', 'pdf', NULL, false, 3),
  ('a1000003-0000-0000-0000-000000000005', 'Daily Systems Design', 'video', '15m 40s', false, 1),
  ('a1000003-0000-0000-0000-000000000005', 'Your 90-Day Transformation Plan', 'exercise', NULL, false, 2),
  ('a1000003-0000-0000-0000-000000000005', 'Final Assessment & Certificate', 'quiz', NULL, false, 3);

-- ============================================================
-- CHAPTERS — Course 4: Shadow Work Fundamentals
-- ============================================================
INSERT INTO public.chapters (id, course_id, title, sort_order) VALUES
  ('a1000004-0000-0000-0000-000000000001', 'c1000000-0000-0000-0000-000000000004', 'Introduction to Shadow Work', 1),
  ('a1000004-0000-0000-0000-000000000002', 'c1000000-0000-0000-0000-000000000004', 'Identifying Your Shadow', 2),
  ('a1000004-0000-0000-0000-000000000003', 'c1000000-0000-0000-0000-000000000004', 'Confronting the Shadow', 3),
  ('a1000004-0000-0000-0000-000000000004', 'c1000000-0000-0000-0000-000000000004', 'Integration & Wholeness', 4),
  ('a1000004-0000-0000-0000-000000000005', 'c1000000-0000-0000-0000-000000000004', 'Living Beyond the Shadow', 5);

INSERT INTO public.lessons (chapter_id, title, type, duration, preview, sort_order) VALUES
  ('a1000004-0000-0000-0000-000000000001', 'What Is the Shadow?', 'video', '20m 15s', true, 1),
  ('a1000004-0000-0000-0000-000000000001', 'Jung''s Theory of the Unconscious', 'video', '24m 30s', false, 2),
  ('a1000004-0000-0000-0000-000000000001', 'The Shadow in Everyday Life', 'pdf', NULL, false, 3),
  ('a1000004-0000-0000-0000-000000000002', 'Projection — Seeing Yourself in Others', 'video', '18m 45s', false, 1),
  ('a1000004-0000-0000-0000-000000000002', 'Trigger Journaling Exercise', 'exercise', NULL, false, 2),
  ('a1000004-0000-0000-0000-000000000002', 'The Shadow Inventory', 'pdf', NULL, false, 3),
  ('a1000004-0000-0000-0000-000000000002', 'Childhood Patterns & Conditioning', 'video', '22m 00s', false, 4),
  ('a1000004-0000-0000-0000-000000000003', 'Active Imagination Technique', 'video', '16m 30s', false, 1),
  ('a1000004-0000-0000-0000-000000000003', 'Dialoguing With Your Shadow Self', 'exercise', NULL, false, 2),
  ('a1000004-0000-0000-0000-000000000003', 'Working With Shame & Guilt', 'video', '20m 10s', false, 3),
  ('a1000004-0000-0000-0000-000000000003', 'The Role of Dreams', 'video', '14m 50s', false, 4),
  ('a1000004-0000-0000-0000-000000000004', 'From Fragmentation to Integration', 'video', '18m 20s', false, 1),
  ('a1000004-0000-0000-0000-000000000004', 'Embracing Your Dark Side', 'video', '15m 45s', false, 2),
  ('a1000004-0000-0000-0000-000000000004', 'The Integrated Self Assessment', 'quiz', NULL, false, 3),
  ('a1000004-0000-0000-0000-000000000004', 'Building a Shadow Work Practice', 'pdf', NULL, false, 4),
  ('a1000004-0000-0000-0000-000000000005', 'Authentic Relationships After Shadow Work', 'video', '17m 30s', false, 1),
  ('a1000004-0000-0000-0000-000000000005', 'Creativity & the Shadow', 'video', '13m 15s', false, 2),
  ('a1000004-0000-0000-0000-000000000005', 'Your Ongoing Practice Plan', 'exercise', NULL, false, 3),
  ('a1000004-0000-0000-0000-000000000005', 'Final Reflection & Certificate', 'quiz', NULL, false, 4);

-- ============================================================
-- CHAPTERS — Course 5: Stoic Resilience
-- ============================================================
INSERT INTO public.chapters (id, course_id, title, sort_order) VALUES
  ('a1000005-0000-0000-0000-000000000001', 'c1000000-0000-0000-0000-000000000005', 'Foundations of Stoicism', 1),
  ('a1000005-0000-0000-0000-000000000002', 'c1000000-0000-0000-0000-000000000005', 'Stoic Psychology', 2),
  ('a1000005-0000-0000-0000-000000000003', 'c1000000-0000-0000-0000-000000000005', 'Daily Stoic Practices', 3),
  ('a1000005-0000-0000-0000-000000000004', 'c1000000-0000-0000-0000-000000000005', 'Stoic Resilience in Modern Life', 4);

INSERT INTO public.lessons (chapter_id, title, type, duration, preview, sort_order) VALUES
  ('a1000005-0000-0000-0000-000000000001', 'A Brief History of Stoic Philosophy', 'video', '18m 00s', true, 1),
  ('a1000005-0000-0000-0000-000000000001', 'The Dichotomy of Control', 'video', '15m 30s', true, 2),
  ('a1000005-0000-0000-0000-000000000001', 'Key Stoic Texts & Readings', 'pdf', NULL, false, 3),
  ('a1000005-0000-0000-0000-000000000002', 'Perception vs Reality', 'video', '20m 15s', false, 1),
  ('a1000005-0000-0000-0000-000000000002', 'The Role of Judgments', 'video', '14m 45s', false, 2),
  ('a1000005-0000-0000-0000-000000000002', 'Negative Visualization Practice', 'exercise', NULL, false, 3),
  ('a1000005-0000-0000-0000-000000000003', 'The Morning Reflection', 'video', '12m 30s', false, 1),
  ('a1000005-0000-0000-0000-000000000003', 'Evening Review Protocol', 'pdf', NULL, false, 2),
  ('a1000005-0000-0000-0000-000000000003', 'Voluntary Discomfort Training', 'video', '16m 20s', false, 3),
  ('a1000005-0000-0000-0000-000000000003', 'Journaling Like Marcus Aurelius', 'exercise', NULL, false, 4),
  ('a1000005-0000-0000-0000-000000000004', 'Dealing With Setbacks', 'video', '19m 10s', false, 1),
  ('a1000005-0000-0000-0000-000000000004', 'Stoic Approaches to Anger', 'video', '17m 45s', false, 2),
  ('a1000005-0000-0000-0000-000000000004', 'Building Equanimity', 'video', '13m 50s', false, 3),
  ('a1000005-0000-0000-0000-000000000004', 'Final Assessment & Certificate', 'quiz', NULL, false, 4);

-- ============================================================
-- CHAPTERS — Course 6: Relationships & Attachment Styles
-- ============================================================
INSERT INTO public.chapters (id, course_id, title, sort_order) VALUES
  ('a1000006-0000-0000-0000-000000000001', 'c1000000-0000-0000-0000-000000000006', 'Attachment Theory — Overview', 1),
  ('a1000006-0000-0000-0000-000000000002', 'c1000000-0000-0000-0000-000000000006', 'Understanding Your Patterns', 2),
  ('a1000006-0000-0000-0000-000000000003', 'c1000000-0000-0000-0000-000000000006', 'Communication Frameworks', 3),
  ('a1000006-0000-0000-0000-000000000004', 'c1000000-0000-0000-0000-000000000006', 'Building Secure Relationships', 4),
  ('a1000006-0000-0000-0000-000000000005', 'c1000000-0000-0000-0000-000000000006', 'Sustaining Connection', 5);

INSERT INTO public.lessons (chapter_id, title, type, duration, preview, sort_order) VALUES
  ('a1000006-0000-0000-0000-000000000001', 'What Is Attachment Theory?', 'video', '16m 30s', true, 1),
  ('a1000006-0000-0000-0000-000000000001', 'The 4 Attachment Styles Explained', 'video', '24m 15s', true, 2),
  ('a1000006-0000-0000-0000-000000000001', 'Discovering Your Attachment Pattern', 'quiz', NULL, false, 3),
  ('a1000006-0000-0000-0000-000000000001', 'Reading: Bowlby & Ainsworth Summary', 'pdf', NULL, false, 4),
  ('a1000006-0000-0000-0000-000000000002', 'Anxious Attachment Deep Dive', 'video', '18m 45s', false, 1),
  ('a1000006-0000-0000-0000-000000000002', 'Avoidant Attachment Deep Dive', 'video', '19m 20s', false, 2),
  ('a1000006-0000-0000-0000-000000000002', 'Disorganized Attachment', 'video', '15m 10s', false, 3),
  ('a1000006-0000-0000-0000-000000000002', 'Relationship History Mapping', 'exercise', NULL, false, 4),
  ('a1000006-0000-0000-0000-000000000003', 'Non-Violent Communication Basics', 'video', '20m 00s', false, 1),
  ('a1000006-0000-0000-0000-000000000003', 'The Repair Conversation Template', 'pdf', NULL, false, 2),
  ('a1000006-0000-0000-0000-000000000003', 'Expressing Needs Without Blame', 'video', '16m 35s', false, 3),
  ('a1000006-0000-0000-0000-000000000003', 'Practice: Difficult Conversation Role-Play', 'exercise', NULL, false, 4),
  ('a1000006-0000-0000-0000-000000000004', 'Earned Secure Attachment', 'video', '22m 10s', false, 1),
  ('a1000006-0000-0000-0000-000000000004', 'Setting Healthy Boundaries', 'video', '14m 50s', false, 2),
  ('a1000006-0000-0000-0000-000000000004', 'The Gottman Method Basics', 'video', '18m 30s', false, 3),
  ('a1000006-0000-0000-0000-000000000004', 'Boundary Setting Exercises', 'exercise', NULL, false, 4),
  ('a1000006-0000-0000-0000-000000000005', 'Love Languages & Beyond', 'video', '13m 20s', false, 1),
  ('a1000006-0000-0000-0000-000000000005', 'Conflict as Growth', 'video', '17m 45s', false, 2),
  ('a1000006-0000-0000-0000-000000000005', 'Your Relationship Growth Plan', 'exercise', NULL, false, 3),
  ('a1000006-0000-0000-0000-000000000005', 'Final Assessment & Certificate', 'quiz', NULL, false, 4);

-- ============================================================
-- TESTIMONIALS
-- ============================================================
INSERT INTO public.testimonials (quote, name, context, visible, sort_order) VALUES
(
  'This isn''t motivation — it''s education. I finally understood why I react the way I do, and how to change it.',
  'Arjun Mehta',
  'Software Engineer, Bangalore',
  true, 1
),
(
  'The Anxiety Blueprint gave me tools I''ll use for life. No fluff, no toxic positivity — just real psychology.',
  'Rohit Sharma',
  'MBA Student, Delhi',
  true, 2
),
(
  'Gandhi University feels like the serious education in self-mastery that I wish existed when I was 20.',
  'Vikram Rao',
  'Doctor, Mumbai',
  true, 3
);

-- ============================================================
-- SITE SETTINGS
-- ============================================================
INSERT INTO public.site_settings (key, value) VALUES
(
  'hero',
  '{
    "headline": "Master Your Mind.",
    "subheadline": "Master Your Life.",
    "description": "Psychology-driven self-mastery courses for Indian men. Built on evidence, not hype.",
    "cta_primary": "Explore Courses",
    "cta_secondary": "Learn More"
  }'::jsonb
),
(
  'stats',
  '[
    {"label": "Students Enrolled", "value": "2,400+"},
    {"label": "Courses Available", "value": "6"},
    {"label": "Average Rating", "value": "4.9★"},
    {"label": "Completion Rate", "value": "87%"}
  ]'::jsonb
),
(
  'cta_section',
  '{
    "headline": "Ready to transform your mind?",
    "description": "Join thousands of men building clarity, discipline, and emotional mastery.",
    "button_text": "Start Learning Today"
  }'::jsonb
),
(
  'upcoming_section',
  '{
    "title": "Coming Soon",
    "description": "More courses in development. Join the waitlist to be first.",
    "courses": [
      {"title": "Mindfulness & Meditation", "eta": "Q2 2026"},
      {"title": "Leadership Psychology", "eta": "Q3 2026"},
      {"title": "Financial Mindset", "eta": "Q4 2026"}
    ]
  }'::jsonb
);
