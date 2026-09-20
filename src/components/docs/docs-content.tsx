"use client";

import { useRef, useEffect } from "react";
import type { PageData } from "@/lib/docs-data";

interface DocsContentProps {
  page: PageData;
  onScroll?: (headingId: string | null) => void;
}

export default function DocsContent({ page, onScroll }: DocsContentProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  /* Scroll-spy: report the currently-visible heading */
  useEffect(() => {
    const container = scrollRef.current;
    if (!container || !onScroll) return;

    const handler = () => {
      const headings = container.querySelectorAll("h2[id]");
      let current: string | null = null;
      headings.forEach((h) => {
        if ((h as HTMLElement).getBoundingClientRect().top < 120) {
          current = h.id;
        }
      });
      onScroll(current);
    };

    container.addEventListener("scroll", handler, { passive: true });
    return () => container.removeEventListener("scroll", handler);
  }, [onScroll, page]);

  /* Reset scroll to top on page change */
  useEffect(() => {
    scrollRef.current?.scrollTo(0, 0);
  }, [page]);

  return (
    <div
      ref={scrollRef}
      className="docs-content-area flex-1 overflow-y-auto px-8 py-12 sm:px-14 [&_pre]:overflow-x-auto [&_pre]:rounded-lg [&_pre]:bg-zinc-900 [&_pre]:p-4 [&_pre]:font-mono [&_pre]:text-sm [&_pre]:leading-relaxed [&_pre]:text-zinc-200 dark:[&_pre]:bg-zinc-950 [&_pre]:border [&_pre]:border-zinc-800 [&_pre]:mb-6 [&_h2]:scroll-mt-5 [&_h2]:text-[22px] [&_h2]:font-extrabold [&_h2]:mt-9 [&_h2]:mb-3.5 [&_h2]:text-zinc-900 dark:[&_h2]:text-zinc-100 [&_h3]:text-[17px] [&_h3]:font-bold [&_h3]:mt-6 [&_h3]:mb-2.5 [&_h3]:text-zinc-900 dark:[&_h3]:text-zinc-100 [&_p]:text-[15px] [&_p]:leading-7 [&_p]:text-zinc-700 [&_p]:mb-4 dark:[&_p]:text-zinc-300 [&_a]:text-zinc-900 [&_a]:underline dark:[&_a]:text-zinc-100 [&_ul]:text-[15px] [&_ul]:leading-loose [&_ul]:text-zinc-700 [&_ul]:pl-5 [&_ul]:mb-4 dark:[&_ul]:text-zinc-300 [&_ol]:text-[15px] [&_ol]:leading-loose [&_ol]:text-zinc-700 [&_ol]:pl-5 [&_ol]:mb-4 dark:[&_ol]:text-zinc-300 [&_table]:w-full [&_table]:border-collapse [&_table]:mb-6 [&_table]:text-sm [&_th]:bg-zinc-50 [&_th]:text-left [&_th]:px-3 [&_th]:py-2.5 [&_th]:border-b [&_th]:border-zinc-200 [&_th]:text-xs [&_th]:font-bold [&_th]:uppercase [&_th]:tracking-wider [&_th]:text-zinc-500 dark:[&_th]:bg-zinc-900 dark:[&_th]:border-zinc-700 dark:[&_th]:text-zinc-400 [&_td]:text-left [&_td]:px-3 [&_td]:py-2.5 [&_td]:border-b [&_td]:border-zinc-200 [&_td]:text-zinc-700 dark:[&_td]:border-zinc-700 dark:[&_td]:text-zinc-300 [&_code]:bg-zinc-100 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:font-mono [&_code]:text-[13px] [&_code]:border [&_code]:border-zinc-200 dark:[&_code]:bg-zinc-800 dark:[&_code]:border-zinc-700 [&_pre_code]:bg-transparent [&_pre_code]:border-0 [&_pre_code]:p-0 [&_pre_code]:text-inherit"
    >
      <div className="max-w-[850px]">
        {/* Title */}
        <h1 className="flex items-center gap-2.5 text-[34px] font-extrabold text-zinc-900 dark:text-zinc-50">
          {page.title}
          {page.badge && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-zinc-900 px-2.5 py-1 text-[11px] font-bold tracking-wide text-white dark:bg-zinc-100 dark:text-zinc-900">
              {page.badge}
            </span>
          )}
        </h1>

        {/* Meta row */}
        <div className="mt-2.5 mb-6 flex items-center gap-4 border-b border-zinc-200 pb-5 text-[13px] text-zinc-500 dark:border-zinc-700 dark:text-zinc-400">
          <span>{page.date}</span>
          <span>·</span>
          <span>{page.read}</span>
        </div>

        {/* Page body */}
        <div
          dangerouslySetInnerHTML={{ __html: page.html }}
          className="[&_.docs-grid-2]:grid [&_.docs-grid-2]:grid-cols-1 [&_.docs-grid-2]:gap-3.5 [&_.docs-grid-2]:mb-5 sm:[&_.docs-grid-2]:grid-cols-2 [&_.docs-feature-card]:rounded-lg [&_.docs-feature-card]:border [&_.docs-feature-card]:border-zinc-200 [&_.docs-feature-card]:p-5 dark:[&_.docs-feature-card]:border-zinc-700 [&_.docs-feature-card_h4]:m-0 [&_.docs-feature-card_h4]:mb-1.5 [&_.docs-feature-card_h4]:text-[15px] [&_.docs-feature-card_h4]:font-bold [&_.docs-feature-card_h4]:text-zinc-900 dark:[&_.docs-feature-card_h4]:text-zinc-100 [&_.docs-feature-card_p]:m-0 [&_.docs-feature-card_p]:text-sm [&_.docs-feature-card_p]:text-zinc-500 dark:[&_.docs-feature-card_p]:text-zinc-400 [&_.docs-endpoint-header]:flex [&_.docs-endpoint-header]:items-center [&_.docs-endpoint-header]:gap-2.5 [&_.docs-endpoint-header]:mb-1.5 [&_.docs-badge-pill]:inline-flex [&_.docs-badge-pill]:items-center [&_.docs-badge-pill]:gap-1.5 [&_.docs-badge-pill]:rounded-full [&_.docs-badge-pill]:bg-zinc-900 [&_.docs-badge-pill]:px-2.5 [&_.docs-badge-pill]:py-1 [&_.docs-badge-pill]:text-[11px] [&_.docs-badge-pill]:font-bold [&_.docs-badge-pill]:tracking-wide [&_.docs-badge-pill]:text-white dark:[&_.docs-badge-pill]:bg-zinc-100 dark:[&_.docs-badge-pill]:text-zinc-900 [&_.docs-endpoint-url]:inline-block [&_.docs-endpoint-url]:rounded-md [&_.docs-endpoint-url]:border [&_.docs-endpoint-url]:border-zinc-200 [&_.docs-endpoint-url]:bg-zinc-50 [&_.docs-endpoint-url]:px-3.5 [&_.docs-endpoint-url]:py-2.5 [&_.docs-endpoint-url]:font-mono [&_.docs-endpoint-url]:text-sm [&_.docs-endpoint-url]:my-2.5 [&_.docs-endpoint-url]:mb-5 [&_.docs-endpoint-url]:text-zinc-800 dark:[&_.docs-endpoint-url]:bg-zinc-900 dark:[&_.docs-endpoint-url]:border-zinc-700 dark:[&_.docs-endpoint-url]:text-zinc-200 [&_.docs-code-label]:text-[11px] [&_.docs-code-label]:uppercase [&_.docs-code-label]:tracking-widest [&_.docs-code-label]:text-zinc-500 [&_.docs-code-label]:mb-1.5 [&_.docs-code-label]:font-bold dark:[&_.docs-code-label]:text-zinc-400 [&_.docs-req-yes]:text-zinc-900 [&_.docs-req-yes]:font-bold dark:[&_.docs-req-yes]:text-zinc-100 [&_.docs-req-no]:text-zinc-400 dark:[&_.docs-req-no]:text-zinc-500"
        />
      </div>
    </div>
  );
}
