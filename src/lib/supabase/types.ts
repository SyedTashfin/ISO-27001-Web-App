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
      lesson_modules: {
        Row: {
          id: string;
          slug: string;
          title_en: string;
          title_fr: string;
          summary_en: string;
          summary_fr: string;
          level: string;
          duration_minutes: number;
          module_order: number;
          content: Json;
          created_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          title_en: string;
          title_fr: string;
          summary_en: string;
          summary_fr: string;
          level: string;
          duration_minutes: number;
          module_order: number;
          content?: Json;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["lesson_modules"]["Insert"]>;
        Relationships: [];
      };
      clause_summaries: {
        Row: {
          id: string;
          clause: string;
          title_en: string;
          title_fr: string;
          payload: Json;
          created_at: string;
        };
        Insert: {
          id?: string;
          clause: string;
          title_en: string;
          title_fr: string;
          payload?: Json;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["clause_summaries"]["Insert"]>;
        Relationships: [];
      };
      annex_controls: {
        Row: {
          code: string;
          category: string;
          title_en: string;
          title_fr: string;
          focus_en: string;
          focus_fr: string;
          payload: Json;
          created_at: string;
        };
        Insert: {
          code: string;
          category: string;
          title_en: string;
          title_fr: string;
          focus_en: string;
          focus_fr: string;
          payload?: Json;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["annex_controls"]["Insert"]>;
        Relationships: [];
      };
      glossary_terms: {
        Row: {
          slug: string;
          term_en: string;
          term_fr: string;
          definition_en: string;
          definition_fr: string;
          payload: Json;
          created_at: string;
        };
        Insert: {
          slug: string;
          term_en: string;
          term_fr: string;
          definition_en: string;
          definition_fr: string;
          payload?: Json;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["glossary_terms"]["Insert"]>;
        Relationships: [];
      };
      scenario_templates: {
        Row: {
          id: string;
          slug: string;
          title_en: string;
          title_fr: string;
          context_en: string;
          context_fr: string;
          payload: Json;
          created_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          title_en: string;
          title_fr: string;
          context_en: string;
          context_fr: string;
          payload?: Json;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["scenario_templates"]["Insert"]>;
        Relationships: [];
      };
      quiz_sets: {
        Row: {
          id: string;
          slug: string;
          title_en: string;
          title_fr: string;
          payload: Json;
          created_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          title_en: string;
          title_fr: string;
          payload?: Json;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["quiz_sets"]["Insert"]>;
        Relationships: [];
      };
      framework_comparisons: {
        Row: {
          id: string;
          name: string;
          title_en: string;
          title_fr: string;
          comparison_type_en: string;
          comparison_type_fr: string;
          purpose_en: string;
          purpose_fr: string;
          who_uses_it_en: string;
          who_uses_it_fr: string;
          legal_status_en: string;
          legal_status_fr: string;
          business_relevance_en: string;
          business_relevance_fr: string;
          payload: Json;
          created_at: string;
        };
        Insert: {
          id: string;
          name: string;
          title_en: string;
          title_fr: string;
          comparison_type_en: string;
          comparison_type_fr: string;
          purpose_en: string;
          purpose_fr: string;
          who_uses_it_en: string;
          who_uses_it_fr: string;
          legal_status_en: string;
          legal_status_fr: string;
          business_relevance_en: string;
          business_relevance_fr: string;
          payload?: Json;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["framework_comparisons"]["Insert"]>;
        Relationships: [];
      };
      nonconformity_cases: {
        Row: {
          id: string;
          title_en: string;
          title_fr: string;
          context_en: string;
          context_fr: string;
          classification: string;
          related_clause: string;
          payload: Json;
          created_at: string;
        };
        Insert: {
          id: string;
          title_en: string;
          title_fr: string;
          context_en: string;
          context_fr: string;
          classification: string;
          related_clause: string;
          payload?: Json;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["nonconformity_cases"]["Insert"]>;
        Relationships: [];
      };
      module_progress: {
        Row: {
          user_id: string;
          module_slug: string;
          progress_percent: number;
          completed: boolean;
          last_activity_at: string;
          source: string;
        };
        Insert: {
          user_id: string;
          module_slug: string;
          progress_percent?: number;
          completed?: boolean;
          last_activity_at?: string;
          source?: string;
        };
        Update: Partial<Database["public"]["Tables"]["module_progress"]["Insert"]>;
        Relationships: [];
      };
      quiz_attempts: {
        Row: {
          id: string;
          user_id: string;
          module_slug: string;
          score: number;
          max_score: number;
          answers: Json;
          attempted_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          module_slug: string;
          score: number;
          max_score: number;
          answers?: Json;
          attempted_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["quiz_attempts"]["Insert"]>;
        Relationships: [];
      };
      simulation_states: {
        Row: {
          id: string;
          user_id: string;
          simulation_type: string;
          simulation_key: string;
          payload: Json;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          simulation_type: string;
          simulation_key: string;
          payload?: Json;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["simulation_states"]["Insert"]>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
