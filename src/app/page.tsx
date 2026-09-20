import Link from "next/link";
import { fetchOpenApiSpec, getApiBaseUrl } from "@/lib/api";

export const dynamic = "force-dynamic";

export default async function Home() {
  const apiUrl = getApiBaseUrl();
  let stats: { paths: number; operations: number; schemas: number; tags: number } | null = null;
  let specTitle = "Waypoint API";

  try {
    const spec = await fetchOpenApiSpec();
    specTitle = spec.info.title;
    const operations = Object.values(spec.paths).reduce((sum, pathItem) => {
      return sum + Object.keys(pathItem).filter((method) => ["get", "post", "put", "patch", "delete", "head", "options", "trace"].includes(method)).length;
    }, 0);
    stats = {
      paths: Object.keys(spec.paths).length,
      operations,
      schemas: Object.keys(spec.components?.schemas ?? {}).length,
      tags: (spec.tags ?? []).length,
    };
  } catch {
    stats = null;
  }

  return (
    <main className="flex flex-1 flex-col items-center px-6">
      <section className="flex w-full max-w-3xl flex-col items-center py-24 text-center">
        <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-600/30 bg-emerald-600/10 px-3 py-1 text-xs font-medium text-emerald-700 dark:text-emerald-300">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          Open &amp; community-verified
        </span>
        <h1 className="text-4xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl">
          {specTitle}
        </h1>
        <p className="mt-5 max-w-xl text-lg leading-8 text-zinc-600 dark:text-zinc-400">
          Geolocated jeepney terminal and boarding-point (<em>paradahan</em>) data for Baguio City.
          Explore the routes, terminals, and stops through an interactive, live OpenAPI reference.
        </p>
        <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row">
          <Link
            href="/docs"
            className="inline-flex h-12 items-center justify-center rounded-full bg-zinc-900 px-6 text-sm font-medium text-white transition-colors hover:bg-zinc-700 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
          >
            Open API docs
          </Link>
          <a
            href={`${apiUrl}/openapi.json`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-12 items-center justify-center rounded-full border border-zinc-300 px-6 font-mono text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
          >
            openapi.json
          </a>
        </div>
      </section>

      {stats ? (
        <section className="grid w-full max-w-3xl grid-cols-2 gap-4 pb-24 sm:grid-cols-4">
          {[
            { label: "Paths", value: stats.paths },
            { label: "Operations", value: stats.operations },
            { label: "Schemas", value: stats.schemas },
            { label: "Tags", value: stats.tags },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl border border-zinc-200 bg-white p-5 text-center dark:border-zinc-800 dark:bg-zinc-900"
            >
              <p className="text-3xl font-semibold text-zinc-900 dark:text-zinc-50">{stat.value}</p>
              <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">{stat.label}</p>
            </div>
          ))}
        </section>
      ) : (
        <p className="pb-24 text-sm text-zinc-500 dark:text-zinc-400">
          Live stats unavailable &mdash; the API at{" "}
          <span className="font-mono">{apiUrl}/openapi.json</span> is not reachable.
        </p>
      )}
    </main>
  );
}