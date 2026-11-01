/// <reference types="vite/client" />

// Intentionally no AI keys here: all provider credentials are server-side only.
interface ImportMetaEnv {}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
