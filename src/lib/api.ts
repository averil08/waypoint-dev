export interface OpenApiDoc {
  openapi: string;
  info: {
    title: string;
    version: string;
    description?: string;
  };
  servers?: Array<{ url: string; description?: string }>;
  tags?: Array<{ name: string; description?: string }>;
  paths: Record<string, Record<string, unknown>>;
  components?: {
    schemas?: Record<string, unknown>;
  };
}

export function getApiBaseUrl(): string {
  return (process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000").replace(/\/+$/, "");
}

export async function fetchOpenApiSpec(): Promise<OpenApiDoc> {
  const res = await fetch(`${getApiBaseUrl()}/openapi.json`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Failed to load OpenAPI spec: ${res.status} ${res.statusText}`);
  }

  const spec: OpenApiDoc = await res.json();

  if (!spec || typeof spec !== "object" || !spec.paths) {
    throw new Error("OpenAPI spec is missing required fields");
  }

  return spec;
}