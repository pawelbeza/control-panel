/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

type EnvVar = string | undefined;

interface ImportMetaEnv {
  readonly VITE_ENVIRONMENT: EnvVar;
  readonly VITE_APP_VERSION: EnvVar;
  readonly VITE_API_URL: EnvVar;
  readonly VITE_PAGE_CONTEXT_BASE_URL: EnvVar;
  readonly VITE_IDENFY_SERVICE_BASE_URL: EnvVar;
  readonly VITE_RECAPTCHA_CLIENT_KEY: EnvVar;
  readonly VITE_SEGMENT_WRITE_KEY: EnvVar;
  readonly VITE_POSTHOG_KEY: EnvVar;
  readonly VITE_STRIPE_PUBLIC_KEY: EnvVar;
  readonly VITE_MAPBOX_TOKEN: EnvVar;
  readonly VITE_DISABLE_POLLING: EnvVar;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
