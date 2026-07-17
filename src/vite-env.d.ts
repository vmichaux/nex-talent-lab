/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Optional OpenAI API key for the chatbot. Absent by default; when unset the
   *  client-side OpenAI call is skipped so no visitor can consume paid quota. */
  readonly VITE_OPENAI_API_KEY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
