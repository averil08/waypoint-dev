import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import ThemeToggle from "@/components/theme-toggle";
import { getApiBaseUrl } from "@/lib/api";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Waypoint Docs",
    template: "%s | Waypoint",
  },
  description:
    "Developer documentation for the Waypoint API — geolocated, community-verified jeepney terminal and boarding-point data for Baguio City.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const apiUrl = getApiBaseUrl();

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <Script id="theme-init" strategy="beforeInteractive">
          {`(function () {
            try {
              var t = localStorage.getItem("waypoint-theme");
              if (t !== "dark" && t !== "light") {
                t = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
              }
              var d = document.documentElement;
              if (t === "dark") {
                d.classList.add("dark");
                d.style.colorScheme = "dark";
              } else {
                d.style.colorScheme = "light";
              }
            } catch (e) {}
          })();`}
        </Script>
      </head>
      <body className="min-h-full flex flex-col">
        <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white/80 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/80">
          <div className="mx-auto flex h-14 w-full max-w-full items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
            <Link href="/" className="flex items-center gap-2 font-semibold text-zinc-900 dark:text-zinc-50">
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-emerald-600 font-mono text-sm font-bold text-white">
                W
              </span>
              <span>
                Waypoint <span className="hidden text-zinc-500 dark:text-zinc-400 sm:inline">Docs</span>
              </span>
            </Link>
            <nav className="flex items-center gap-1 sm:gap-2">
              <Link
                href="/"
                className="rounded-md px-3 py-2 text-sm font-medium text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-zinc-50"
              >
                Home
              </Link>
              <Link
                href="/docs"
                className="rounded-md px-3 py-2 text-sm font-medium text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-zinc-50"
              >
                API Docs
              </Link>
              <a
                href={`${apiUrl}/openapi.json`}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden rounded-md px-3 py-2 font-mono text-sm font-medium text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-50 sm:inline"
              >
                openapi.json
              </a>
              <ThemeToggle />
            </nav>
          </div>
        </header>
        {children}
        <footer className="border-t border-zinc-200 py-8 dark:border-zinc-800">
          <div className="mx-auto flex w-full max-w-full flex-col items-center justify-between gap-3 px-4 text-sm text-zinc-500 dark:text-zinc-400 sm:flex-row sm:px-6 lg:px-8">
            <p>
              Waypoint API docs &middot; Baguio jeepney terminal &amp; paradahan data
            </p>
            <p className="font-mono text-xs">{apiUrl}/openapi.json</p>
          </div>
        </footer>
      </body>
    </html>
  );
}