export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          first_name: string | null;
          last_name: string | null;
          role: "student" | "admin";
          avatar_url: string | null;
          created_at: string;
          deleted_at: string | null;
        };
        Insert: {
          id: string;
          first_name?: string | null;
          last_name?: string | null;
          role?: "student" | "admin";
          avatar_url?: string | null;
          created_at?: string;
          deleted_at?: string | null;
        };
        Update: {
          id?: string;
          first_name?: string | null;
          last_name?: string | null;
          role?: "student" | "admin";
          avatar_url?: string | null;
          created_at?: string;
          deleted_at?: string | null;
        };
      };
      courses: {
        Row: {
          id: string;
          slug: string;
          title: string;
          description: string | null;
          long_description: Json | null;
          price: number;
          original_price: number | null;
          discount: string | null;
          category: string | null;
          featured: boolean;
          total_lessons: number;
          total_duration: string | null;
          accessibility: string;
          thumbnail_url: string | null;
          status: "draft" | "published" | "archived";
          created_at: string;
          updated_at: string;
          deleted_at: string | null;
        };
        Insert: {
          id?: string;
          slug: string;
          title: string;
          description?: string | null;
          long_description?: Json | null;
          price: number;
          original_price?: number | null;
          discount?: string | null;
          category?: string | null;
          featured?: boolean;
          total_lessons?: number;
          total_duration?: string | null;
          accessibility?: string;
          thumbnail_url?: string | null;
          status?: "draft" | "published" | "archived";
          created_at?: string;
          updated_at?: string;
          deleted_at?: string | null;
        };
        Update: {
          id?: string;
          slug?: string;
          title?: string;
          description?: string | null;
          long_description?: Json | null;
          price?: number;
          original_price?: number | null;
          discount?: string | null;
          category?: string | null;
          featured?: boolean;
          total_lessons?: number;
          total_duration?: string | null;
          accessibility?: string;
          thumbnail_url?: string | null;
          status?: "draft" | "published" | "archived";
          created_at?: string;
          updated_at?: string;
          deleted_at?: string | null;
        };
      };
      chapters: {
        Row: {
          id: string;
          course_id: string;
          title: string;
          sort_order: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          course_id: string;
          title: string;
          sort_order?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          course_id?: string;
          title?: string;
          sort_order?: number;
          created_at?: string;
        };
      };
      lessons: {
        Row: {
          id: string;
          chapter_id: string;
          title: string;
          type: "video" | "pdf" | "quiz" | "exercise";
          duration: string | null;
          content_url: string | null;
          preview: boolean;
          sort_order: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          chapter_id: string;
          title: string;
          type: "video" | "pdf" | "quiz" | "exercise";
          duration?: string | null;
          content_url?: string | null;
          preview?: boolean;
          sort_order?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          chapter_id?: string;
          title?: string;
          type?: "video" | "pdf" | "quiz" | "exercise";
          duration?: string | null;
          content_url?: string | null;
          preview?: boolean;
          sort_order?: number;
          created_at?: string;
        };
      };
      payments: {
        Row: {
          id: string;
          user_id: string;
          course_id: string;
          amount: number;
          provider: string | null;
          provider_payment_id: string | null;
          status: "pending" | "completed" | "failed" | "refunded";
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          course_id: string;
          amount: number;
          provider?: string | null;
          provider_payment_id?: string | null;
          status?: "pending" | "completed" | "failed" | "refunded";
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          course_id?: string;
          amount?: number;
          provider?: string | null;
          provider_payment_id?: string | null;
          status?: "pending" | "completed" | "failed" | "refunded";
          created_at?: string;
        };
      };
      enrollments: {
        Row: {
          id: string;
          user_id: string;
          course_id: string;
          payment_id: string | null;
          enrolled_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          course_id: string;
          payment_id?: string | null;
          enrolled_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          course_id?: string;
          payment_id?: string | null;
          enrolled_at?: string;
        };
      };
      lesson_progress: {
        Row: {
          id: string;
          user_id: string;
          lesson_id: string;
          completed: boolean;
          completed_at: string | null;
        };
        Insert: {
          id?: string;
          user_id: string;
          lesson_id: string;
          completed?: boolean;
          completed_at?: string | null;
        };
        Update: {
          id?: string;
          user_id?: string;
          lesson_id?: string;
          completed?: boolean;
          completed_at?: string | null;
        };
      };
      testimonials: {
        Row: {
          id: string;
          quote: string;
          name: string;
          context: string | null;
          visible: boolean;
          sort_order: number;
          created_at: string;
          deleted_at: string | null;
        };
        Insert: {
          id?: string;
          quote: string;
          name: string;
          context?: string | null;
          visible?: boolean;
          sort_order?: number;
          created_at?: string;
          deleted_at?: string | null;
        };
        Update: {
          id?: string;
          quote?: string;
          name?: string;
          context?: string | null;
          visible?: boolean;
          sort_order?: number;
          created_at?: string;
          deleted_at?: string | null;
        };
      };
      site_settings: {
        Row: {
          key: string;
          value: Json;
          updated_at: string;
        };
        Insert: {
          key: string;
          value: Json;
          updated_at?: string;
        };
        Update: {
          key?: string;
          value?: Json;
          updated_at?: string;
        };
      };
    };
    Views: Record<never, never>;
    Functions: Record<never, never>;
    Enums: Record<never, never>;
  };
};

// Convenience row types
export type Profile = Database["public"]["Tables"]["profiles"]["Row"];
export type Course = Database["public"]["Tables"]["courses"]["Row"];
export type Chapter = Database["public"]["Tables"]["chapters"]["Row"];
export type Lesson = Database["public"]["Tables"]["lessons"]["Row"];
export type Payment = Database["public"]["Tables"]["payments"]["Row"];
export type Enrollment = Database["public"]["Tables"]["enrollments"]["Row"];
export type LessonProgress = Database["public"]["Tables"]["lesson_progress"]["Row"];
export type Testimonial = Database["public"]["Tables"]["testimonials"]["Row"];
export type SiteSetting = Database["public"]["Tables"]["site_settings"]["Row"];

// Extended types for joined queries
export type ChapterWithLessons = Chapter & {
  lessons: Lesson[];
};

export type CourseWithChapters = Course & {
  chapters: ChapterWithLessons[];
};
