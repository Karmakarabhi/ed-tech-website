

# Gandhi University — Premium Course Platform

## Overview
A psychology-driven self-mastery course platform for Indian men, designed with calm authority, editorial elegance, and intellectual credibility. Warm, grounded aesthetics — no startup feel.

---

## Design System Setup

### Typography (Google Fonts)
- **Cormorant Garamond** (Bold/SemiBold) → Hero/display headings
- **DM Serif Display** → Section titles, editorial statements
- **Plus Jakarta Sans** → Body, buttons, UI, navigation
- **Rajdhani** (Medium/SemiBold) → Stats, badges, prices, metadata

### Color System
- **Light theme ("Ivory & Ember")**: Warm ivory backgrounds, deep brown text, ember orange accents, gold highlights
- **Dark theme ("Obsidian & Ember")**: Deep warm blacks, warm cream text, brighter ember accents — warm and premium, not techy
- Theme toggle via CSS variables + Tailwind config

### Design Rules
- Subtle border radius (8–12px), generous whitespace, clear vertical rhythm
- No glassmorphism, no neon, no startup gradients
- Card hover scale capped at 1.03, button hover = slight darken
- Smooth scroll + subtle fade-in animations on sections

---

## Homepage Sections

### 1. Sticky Navbar
- Logo (left), navigation links (Courses, About, Resources), Login + CTA button (right)
- Backdrop blur on scroll, warm styling

### 2. Hero Section (Full Viewport)
- Large Cormorant Garamond headline — dominant, left-aligned
- Supporting paragraph in Plus Jakarta Sans
- Primary CTA button (ember accent) + secondary text link
- Subtle warm gradient or textured background

### 3. Problem Statement
- Dark/secondary background panel
- Bold editorial statement in DM Serif Display
- 2–3 supporting paragraphs addressing the audience's pain points

### 4. Authority / Social Proof
- Clean grid with stats: "1M+ Subscribers", "50K+ Students", "Certified CBT Practitioner"
- Stats rendered in Rajdhani font with clear visual hierarchy

### 5. Featured Courses Grid
- 3-column responsive grid (stacks on mobile)
- Elevated card backgrounds with subtle hover lift + shadow
- Course metadata: title, description, price (Rajdhani), category badge
- Gold accent highlight on featured course

### 6. Testimonials
- Minimal layout, no carousel/slider
- Elevated cards with student quotes, names, context
- Clean and trustworthy

### 7. Final CTA Section
- Accent-colored background
- Strong editorial heading (DM Serif)
- Single dominant action button

### 8. Footer
- Minimal column layout
- Warm muted text, essential links, copyright

---

## Reusable Components
- `Navbar` — sticky navigation with theme toggle
- `Hero` — full-viewport hero with typography hierarchy
- `SectionHeading` — reusable editorial section header
- `CourseCard` — course display card with hover effects
- `StatBlock` — authority stats display
- `TestimonialCard` — minimal testimonial display
- `CTASection` — accent-background call-to-action
- `Footer` — minimal site footer

---

## Notes
- All content will use placeholder/demo data (courses, testimonials, stats)
- Light/dark theme toggle included
- Fully responsive across desktop, tablet, and mobile
- No backend needed for this phase — pure UI build

