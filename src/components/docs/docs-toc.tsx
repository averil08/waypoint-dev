"use client";

import type { TocEntry } from "@/lib/docs-data";

interface DocsTocProps {
  entries: TocEntry[];
  activeHeading: string | null;
  onClickEntry: (id: string) => void;
}

export default function DocsToc({ entries, activeHeading, onClickEntry }: DocsTocProps) {
  if (entries.length === 0) return null;

  return (
    <aside className="w-[230px] min-w-[230px] overflow-y-auto border-l border-zinc-200 px-6 py-8 dark:border-zinc-800 max-lg:hidden">
      <div className="mb-3.5 text-xs font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
        Jump to
      </div>

      <div>
        {entries.map((entry) => (
          <button
            key={entry.id}
            type="button"
            onClick={() => onClickEntry(entry.id)}
            className={`block w-full border-l-2 py-1.5 pl-3 text-left text-[13.5px] transition-colors ${
              activeHeading === entry.id
                ? "border-zinc-900 font-bold text-zinc-900 dark:border-zinc-300 dark:text-zinc-100"
                : "border-zinc-200 text-zinc-500 hover:border-zinc-400 hover:text-zinc-700 dark:border-zinc-700 dark:text-zinc-400 dark:hover:border-zinc-500 dark:hover:text-zinc-300"
            }`}
          >
            {entry.label}
          </button>
        ))}
      </div>
    </aside>
  );
}
