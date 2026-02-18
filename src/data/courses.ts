export interface Lesson {
    title: string;
    type: "video" | "pdf" | "quiz" | "exercise";
    duration?: string;
}

export interface Chapter {
    title: string;
    lessons: Lesson[];
}

export interface CourseData {
    slug: string;
    title: string;
    description: string;
    longDescription: string;
    price: string;
    originalPrice: string;
    discount: string;
    category: string;
    featured?: boolean;
    totalLessons: number;
    totalDuration: string;
    accessibility: string;
    thumbnail: string;
    syllabus: Chapter[];
}

export const allCourses: CourseData[] = [
    {
        slug: "the-anxiety-blueprint",
        title: "The Anxiety Blueprint",
        description:
            "A 6-week deep dive into understanding, managing, and reframing anxiety using CBT frameworks and journaling protocols.",
        longDescription:
            "Are you stuck in cycles of overthinking, self-doubt, and restlessness? Anxiety isn't your enemy — it's a signal. This course gives you the tools to decode it. Through 6 structured weeks of CBT-based frameworks, guided journaling, and evidence-based exercises, you'll learn to understand, manage, and ultimately reframe your anxiety into a source of clarity and strength.",
        price: "₹2,999",
        originalPrice: "₹4,999",
        discount: "40% OFF",
        category: "CBT & Anxiety",
        featured: true,
        totalLessons: 24,
        totalDuration: "8h 30m",
        accessibility: "Online",
        thumbnail: "https://images.unsplash.com/photo-1544027993-37dbfe43562a?auto=format&fit=crop&q=80&w=600",
        syllabus: [
            {
                title: "Understanding Anxiety — The Foundation",
                lessons: [
                    { title: "Welcome & How to Use This Course", type: "pdf" },
                    { title: "What Is Anxiety, Really?", type: "video", duration: "18m 30s" },
                    { title: "The Neuroscience Behind Anxious Thoughts", type: "video", duration: "22m 15s" },
                    { title: "Self-Assessment: Your Anxiety Profile", type: "exercise" },
                ],
            },
            {
                title: "Cognitive Behavioral Therapy — Core Tools",
                lessons: [
                    { title: "Introduction to CBT", type: "video", duration: "16m 45s" },
                    { title: "Identifying Cognitive Distortions", type: "video", duration: "20m 10s" },
                    { title: "The Thought Record Technique", type: "pdf" },
                    { title: "Practice: Reframing Your Top 3 Worries", type: "exercise" },
                ],
            },
            {
                title: "Journaling Protocols for Anxiety",
                lessons: [
                    { title: "Why Journaling Works (The Science)", type: "video", duration: "12m 20s" },
                    { title: "Morning Pages Protocol", type: "pdf" },
                    { title: "The Worry Dump Technique", type: "video", duration: "14m 50s" },
                    { title: "Evening Reflection Framework", type: "pdf" },
                ],
            },
            {
                title: "Physical & Breathwork Techniques",
                lessons: [
                    { title: "The Body-Mind Connection", type: "video", duration: "15m 30s" },
                    { title: "Box Breathing & 4-7-8 Method", type: "video", duration: "10m 45s" },
                    { title: "Progressive Muscle Relaxation", type: "video", duration: "18m 00s" },
                    { title: "Daily Practice Checklist", type: "pdf" },
                ],
            },
            {
                title: "Building Long-Term Resilience",
                lessons: [
                    { title: "From Coping to Thriving", type: "video", duration: "20m 15s" },
                    { title: "Creating Your Personal Anxiety Toolkit", type: "exercise" },
                    { title: "Lifestyle Design for Mental Health", type: "video", duration: "16m 30s" },
                    { title: "Final Assessment & Certificate", type: "quiz" },
                ],
            },
        ],
    },
    {
        slug: "emotional-intelligence-for-men",
        title: "Emotional Intelligence for Men",
        description:
            "Learn to identify, process, and articulate emotions without suppression. Practical frameworks for daily life.",
        longDescription:
            "Most men are taught to suppress emotions. This course teaches you to master them instead. Using frameworks from emotional intelligence research, attachment theory, and clinical psychology, you'll learn to identify what you feel, why you feel it, and how to express it in ways that strengthen — not weaken — your relationships and self-image.",
        price: "₹1,999",
        originalPrice: "₹3,499",
        discount: "43% OFF",
        category: "Emotional Mastery",
        totalLessons: 20,
        totalDuration: "6h 45m",
        accessibility: "Online",
        thumbnail: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600",
        syllabus: [
            {
                title: "Emotional Intelligence — Overview",
                lessons: [
                    { title: "What Is Emotional Intelligence?", type: "video", duration: "14m 20s" },
                    { title: "The 5 Pillars of EQ", type: "pdf" },
                    { title: "Why Men Struggle with Emotions", type: "video", duration: "18m 45s" },
                ],
            },
            {
                title: "Self-Awareness & Emotional Literacy",
                lessons: [
                    { title: "The Emotion Wheel: Naming What You Feel", type: "video", duration: "12m 30s" },
                    { title: "Body Scanning for Hidden Emotions", type: "video", duration: "15m 10s" },
                    { title: "Journaling for Emotional Clarity", type: "exercise" },
                    { title: "Self-Awareness Assessment", type: "quiz" },
                ],
            },
            {
                title: "Emotional Regulation",
                lessons: [
                    { title: "Fight, Flight, Freeze: Understanding Reactions", type: "video", duration: "20m 00s" },
                    { title: "The Pause Protocol", type: "video", duration: "10m 35s" },
                    { title: "Anger Management Without Suppression", type: "video", duration: "22m 15s" },
                    { title: "Practice: Trigger Mapping", type: "exercise" },
                ],
            },
            {
                title: "Empathy & Social Skills",
                lessons: [
                    { title: "Active Listening Masterclass", type: "video", duration: "16m 50s" },
                    { title: "Reading Emotional Cues", type: "video", duration: "13m 25s" },
                    { title: "Navigating Difficult Conversations", type: "video", duration: "19m 40s" },
                ],
            },
            {
                title: "Integration & Daily Practice",
                lessons: [
                    { title: "Building Your EQ Routine", type: "pdf" },
                    { title: "The 30-Day EQ Challenge", type: "exercise" },
                    { title: "Final Assessment", type: "quiz" },
                ],
            },
        ],
    },
    {
        slug: "discipline-and-identity",
        title: "Discipline & Identity",
        description:
            "Build lasting habits rooted in self-understanding rather than willpower. A psychology-first approach to discipline.",
        longDescription:
            "Willpower fades. Identity doesn't. This course takes a radically different approach to discipline — instead of brute-force motivation, you'll learn to build habits that align with your core identity. Drawing from behavioral psychology, identity-based habit theory, and self-determination research, this is discipline that actually lasts.",
        price: "₹2,499",
        originalPrice: "₹3,999",
        discount: "38% OFF",
        category: "Personal Growth",
        totalLessons: 18,
        totalDuration: "5h 50m",
        accessibility: "Online",
        thumbnail: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&q=80&w=600",
        syllabus: [
            {
                title: "The Discipline Myth",
                lessons: [
                    { title: "Why Willpower Fails", type: "video", duration: "16m 30s" },
                    { title: "The Identity-Behavior Loop", type: "video", duration: "20m 00s" },
                    { title: "Assessment: Your Discipline Profile", type: "exercise" },
                ],
            },
            {
                title: "Identity Architecture",
                lessons: [
                    { title: "Who Do You Want to Become?", type: "video", duration: "18m 15s" },
                    { title: "Values Clarification Exercise", type: "exercise" },
                    { title: "The Identity Statement Blueprint", type: "pdf" },
                ],
            },
            {
                title: "Habit Engineering",
                lessons: [
                    { title: "The Habit Loop Decoded", type: "video", duration: "14m 45s" },
                    { title: "Habit Stacking & Environment Design", type: "video", duration: "19m 20s" },
                    { title: "The 2-Minute Rule", type: "video", duration: "10m 30s" },
                    { title: "Building Your Habit Stack", type: "exercise" },
                ],
            },
            {
                title: "Overcoming Resistance",
                lessons: [
                    { title: "Procrastination Psychology", type: "video", duration: "17m 00s" },
                    { title: "The Motivation Myth", type: "video", duration: "13m 50s" },
                    { title: "Accountability Systems That Work", type: "pdf" },
                ],
            },
            {
                title: "The Disciplined Life",
                lessons: [
                    { title: "Daily Systems Design", type: "video", duration: "15m 40s" },
                    { title: "Your 90-Day Transformation Plan", type: "exercise" },
                    { title: "Final Assessment & Certificate", type: "quiz" },
                ],
            },
        ],
    },
    {
        slug: "shadow-work-fundamentals",
        title: "Shadow Work Fundamentals",
        description:
            "Explore Jungian shadow work concepts to confront hidden patterns, heal inner conflicts, and integrate your full personality.",
        longDescription:
            "Carl Jung said, 'Until you make the unconscious conscious, it will direct your life and you will call it fate.' This course guides you through the powerful practice of shadow work — identifying the hidden parts of your personality that drive self-sabotage, relationship conflicts, and emotional reactivity. Through guided exercises and deep psychological frameworks, you'll learn to integrate your shadow and reclaim your full potential.",
        price: "₹3,499",
        originalPrice: "₹5,499",
        discount: "36% OFF",
        category: "Depth Psychology",
        totalLessons: 22,
        totalDuration: "7h 20m",
        accessibility: "Online",
        thumbnail: "https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&q=80&w=600",
        syllabus: [
            {
                title: "Introduction to Shadow Work",
                lessons: [
                    { title: "What Is the Shadow?", type: "video", duration: "20m 15s" },
                    { title: "Jung's Theory of the Unconscious", type: "video", duration: "24m 30s" },
                    { title: "The Shadow in Everyday Life", type: "pdf" },
                ],
            },
            {
                title: "Identifying Your Shadow",
                lessons: [
                    { title: "Projection — Seeing Yourself in Others", type: "video", duration: "18m 45s" },
                    { title: "Trigger Journaling Exercise", type: "exercise" },
                    { title: "The Shadow Inventory", type: "pdf" },
                    { title: "Childhood Patterns & Conditioning", type: "video", duration: "22m 00s" },
                ],
            },
            {
                title: "Confronting the Shadow",
                lessons: [
                    { title: "Active Imagination Technique", type: "video", duration: "16m 30s" },
                    { title: "Dialoguing With Your Shadow Self", type: "exercise" },
                    { title: "Working With Shame & Guilt", type: "video", duration: "20m 10s" },
                    { title: "The Role of Dreams", type: "video", duration: "14m 50s" },
                ],
            },
            {
                title: "Integration & Wholeness",
                lessons: [
                    { title: "From Fragmentation to Integration", type: "video", duration: "18m 20s" },
                    { title: "Embracing Your Dark Side", type: "video", duration: "15m 45s" },
                    { title: "The Integrated Self Assessment", type: "quiz" },
                    { title: "Building a Shadow Work Practice", type: "pdf" },
                ],
            },
            {
                title: "Living Beyond the Shadow",
                lessons: [
                    { title: "Authentic Relationships After Shadow Work", type: "video", duration: "17m 30s" },
                    { title: "Creativity & the Shadow", type: "video", duration: "13m 15s" },
                    { title: "Your Ongoing Practice Plan", type: "exercise" },
                    { title: "Final Reflection & Certificate", type: "quiz" },
                ],
            },
        ],
    },
    {
        slug: "stoic-resilience",
        title: "Stoic Resilience",
        description:
            "Ancient Stoic philosophy meets modern psychology. Build mental toughness through practical daily exercises.",
        longDescription:
            "The Stoics understood something modern self-help often misses: true strength comes from within. This course bridges 2,000 years of Stoic wisdom with contemporary psychological research. You'll learn practical techniques from Marcus Aurelius, Seneca, and Epictetus — adapted for the modern Indian man. Build genuine mental toughness, not toxic resilience.",
        price: "₹1,499",
        originalPrice: "₹2,499",
        discount: "40% OFF",
        category: "Philosophy",
        totalLessons: 16,
        totalDuration: "5h 10m",
        accessibility: "Online",
        thumbnail: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=600",
        syllabus: [
            {
                title: "Foundations of Stoicism",
                lessons: [
                    { title: "A Brief History of Stoic Philosophy", type: "video", duration: "18m 00s" },
                    { title: "The Dichotomy of Control", type: "video", duration: "15m 30s" },
                    { title: "Key Stoic Texts & Readings", type: "pdf" },
                ],
            },
            {
                title: "Stoic Psychology",
                lessons: [
                    { title: "Perception vs Reality", type: "video", duration: "20m 15s" },
                    { title: "The Role of Judgments", type: "video", duration: "14m 45s" },
                    { title: "Negative Visualization Practice", type: "exercise" },
                ],
            },
            {
                title: "Daily Stoic Practices",
                lessons: [
                    { title: "The Morning Reflection", type: "video", duration: "12m 30s" },
                    { title: "Evening Review Protocol", type: "pdf" },
                    { title: "Voluntary Discomfort Training", type: "video", duration: "16m 20s" },
                    { title: "Journaling Like Marcus Aurelius", type: "exercise" },
                ],
            },
            {
                title: "Stoic Resilience in Modern Life",
                lessons: [
                    { title: "Dealing With Setbacks", type: "video", duration: "19m 10s" },
                    { title: "Stoic Approaches to Anger", type: "video", duration: "17m 45s" },
                    { title: "Building Equanimity", type: "video", duration: "13m 50s" },
                    { title: "Final Assessment & Certificate", type: "quiz" },
                ],
            },
        ],
    },
    {
        slug: "relationships-and-attachment-styles",
        title: "Relationships & Attachment Styles",
        description:
            "Understand your attachment patterns and build healthier, more conscious relationships using research-backed frameworks.",
        longDescription:
            "Your relationship patterns aren't random — they're deeply rooted in your attachment style, formed in childhood and reinforced through every connection since. This course uses attachment theory, Gottman's research on relationship dynamics, and modern communication frameworks to help you understand your patterns and build healthier, more fulfilling relationships.",
        price: "₹2,999",
        originalPrice: "₹4,499",
        discount: "33% OFF",
        category: "Relationships",
        totalLessons: 20,
        totalDuration: "7h 00m",
        accessibility: "Online",
        thumbnail: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&q=80&w=600",
        syllabus: [
            {
                title: "Attachment Theory — Overview",
                lessons: [
                    { title: "What Is Attachment Theory?", type: "video", duration: "16m 30s" },
                    { title: "The 4 Attachment Styles Explained", type: "video", duration: "24m 15s" },
                    { title: "Discovering Your Attachment Pattern", type: "quiz" },
                    { title: "Reading: Bowlby & Ainsworth Summary", type: "pdf" },
                ],
            },
            {
                title: "Understanding Your Patterns",
                lessons: [
                    { title: "Anxious Attachment Deep Dive", type: "video", duration: "18m 45s" },
                    { title: "Avoidant Attachment Deep Dive", type: "video", duration: "19m 20s" },
                    { title: "Disorganized Attachment", type: "video", duration: "15m 10s" },
                    { title: "Relationship History Mapping", type: "exercise" },
                ],
            },
            {
                title: "Communication Frameworks",
                lessons: [
                    { title: "Non-Violent Communication Basics", type: "video", duration: "20m 00s" },
                    { title: "The Repair Conversation Template", type: "pdf" },
                    { title: "Expressing Needs Without Blame", type: "video", duration: "16m 35s" },
                    { title: "Practice: Difficult Conversation Role-Play", type: "exercise" },
                ],
            },
            {
                title: "Building Secure Relationships",
                lessons: [
                    { title: "Earned Secure Attachment", type: "video", duration: "22m 10s" },
                    { title: "Setting Healthy Boundaries", type: "video", duration: "14m 50s" },
                    { title: "The Gottman Method Basics", type: "video", duration: "18m 30s" },
                    { title: "Boundary Setting Exercises", type: "exercise" },
                ],
            },
            {
                title: "Sustaining Connection",
                lessons: [
                    { title: "Love Languages & Beyond", type: "video", duration: "13m 20s" },
                    { title: "Conflict as Growth", type: "video", duration: "17m 45s" },
                    { title: "Your Relationship Growth Plan", type: "exercise" },
                    { title: "Final Assessment & Certificate", type: "quiz" },
                ],
            },
        ],
    },
];

export function getCourseBySlug(slug: string): CourseData | undefined {
    return allCourses.find((c) => c.slug === slug);
}
