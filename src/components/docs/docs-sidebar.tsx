"use client";

import { useState, useMemo } from "react";
import { navGroups, type NavGroup } from "@/lib/docs-data";

/* ------------------------------------------------------------------ */
/*  Method tag color map                                               */
/* ------------------------------------------------------------------ */

const methodColors: Record<string, string> = {
  GET: "bg-zinc-900 dark:bg-zinc-100 dark:text-zinc-900",
  POST: "bg-zinc-700 dark:bg-zinc-300 dark:text-zinc-900",
  PUT: "bg-zinc-600 dark:bg-zinc-400 dark:text-zinc-900",
  PATCH: "bg-zinc-500 dark:bg-zinc-500 dark:text-zinc-100",
  DELETE: "bg-zinc-400 text-zinc-900 dark:bg-zinc-600 dark:text-zinc-100",
};

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

interface DocsSidebarProps {
  activePage: string;
  onSelectPage: (page: string) => void;
}

export default function DocsSidebar({ activePage, onSelectPage }: DocsSidebarProps) {
  const [filter, setFilter] = useState("");
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});
  const [openSubs, setOpenSubs] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    for (const g of navGroups) {
      for (const s of g.subGroups) {
        if (s.defaultOpen) initial[s.key] = true;
      }
    }
    return initial;
  });

  const q = filter.toLowerCase();

  /* Filter logic --------------------------------------------------- */
  const filteredGroups = useMemo(() => {
    if (!q) return navGroups;

    return navGroups
      .map((group) => {
        const matchedLinks = group.links.filter((l) =>
          l.label.toLowerCase().includes(q)
        );
        const matchedSubs = group.subGroups
          .map((sub) => ({
            ...sub,
            endpoints: sub.endpoints.filter((ep) =>
              ep.label.toLowerCase().includes(q)
            ),
          }))
          .filter((sub) => sub.endpoints.length > 0);

        if (matchedLinks.length === 0 && matchedSubs.length === 0) return null;
        return { ...group, links: matchedLinks, subGroups: matchedSubs };
      })
      .filter(Boolean) as NavGroup[];
  }, [q]);

  const toggleGroup = (key: string) => {
    setCollapsed((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleSub = (key: string) => {
    setOpenSubs((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <aside className="flex w-[270px] min-w-[270px] flex-col border-r border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 max-md:hidden">
      {/* Filter input */}
      <div className="border-b border-zinc-200 p-4 dark:border-zinc-800">
        <input
          type="text"
          placeholder="Filter by name"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-900 focus:outline-none dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:border-zinc-300"
        />
      </div>

      {/* Scrollable nav */}
      <nav className="flex-1 overflow-y-auto py-2 pb-6">
        {filteredGroups.map((group) => {
          const isCollapsed = collapsed[group.key] && !q;

          return (
            <div key={group.key} className="px-2">
              {/* Group title */}
              <button
                type="button"
                onClick={() => toggleGroup(group.key)}
                className="flex w-full items-center gap-1.5 px-3 py-2.5 pb-1.5 text-left text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 select-none"
              >
                <span
                  className={`text-[10px] text-zinc-400 transition-transform duration-150 dark:text-zinc-500 ${
                    isCollapsed ? "-rotate-90" : ""
                  }`}
                >
                  ▾
                </span>
                {group.title}
              </button>

              {/* Group items */}
              {!isCollapsed && (
                <div className="pl-1">
                  {/* Links before subgroups */}
                  {group.links
                    .filter((l) => {
                      // Show links that come before the first subGroup
                      const allSubPages = group.subGroups.flatMap((s) =>
                        s.endpoints.map((e) => e.page)
                      );
                      return !allSubPages.includes(l.page);
                    })
                    .map((link) => (
                      <button
                        key={link.page}
                        type="button"
                        onClick={() => onSelectPage(link.page)}
                        className={`block w-full border-l-2 px-4 py-2 text-left text-sm ${
                          activePage === link.page
                            ? "border-zinc-900 bg-zinc-100 font-semibold text-zinc-900 dark:border-zinc-300 dark:bg-zinc-800 dark:text-zinc-100"
                            : "border-transparent text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800/50"
                        }`}
                      >
                        {link.label}
                      </button>
                    ))}

                  {/* Sub-groups (endpoints) */}
                  {group.subGroups.map((sub) => {
                    const isOpen = q ? true : openSubs[sub.key] ?? false;

                    return (
                      <div key={sub.key} className="pl-3.5">
                        <button
                          type="button"
                          onClick={() => toggleSub(sub.key)}
                          className="flex w-full items-center justify-between px-4 py-2 text-left text-sm text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800/50 select-none"
                        >
                          <span>{sub.title}</span>
                          <span
                            className={`text-[10px] text-zinc-400 transition-transform duration-150 dark:text-zinc-500 ${
                              isOpen ? "rotate-90" : ""
                            }`}
                          >
                            ›
                          </span>
                        </button>

                        {isOpen && (
                          <div className="pl-3.5">
                            {sub.endpoints.map((ep) => (
                              <button
                                key={ep.page}
                                type="button"
                                onClick={() => onSelectPage(ep.page)}
                                className={`flex w-full items-center gap-2 border-l-2 px-3 py-1.5 text-left text-[13px] ${
                                  activePage === ep.page
                                    ? "border-zinc-900 bg-zinc-100 font-semibold text-zinc-900 dark:border-zinc-300 dark:bg-zinc-800 dark:text-zinc-100"
                                    : "border-transparent text-zinc-500 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800/50"
                                }`}
                              >
                                <span
                                  className={`inline-flex min-w-[38px] items-center justify-center rounded px-1.5 py-0.5 text-[10px] font-bold tracking-wide text-white ${
                                    methodColors[ep.method] ?? "bg-zinc-500"
                                  }`}
                                >
                                  {ep.method}
                                </span>
                                {ep.label}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}

                  {/* Links after subgroups (e.g. "Rate limits" under System) */}
                  {group.links
                    .filter((l) => {
                      // Show links that aren't part of a subgroup, positioned after them
                      const introLinks = group.links.filter((link) => {
                        const allSubPages = group.subGroups.flatMap((s) =>
                          s.endpoints.map((e) => e.page)
                        );
                        return !allSubPages.includes(link.page);
                      });
                      // Links that appear after the first subgroup insertion point
                      const beforeSubIndex = introLinks.indexOf(l);
                      // If there are subgroups, show links after the "intro" ones
                      if (group.subGroups.length === 0) return false;
                      return beforeSubIndex > 0;
                    })
                    .map((link) => (
                      <button
                        key={`after-${link.page}`}
                        type="button"
                        onClick={() => onSelectPage(link.page)}
                        className={`block w-full border-l-2 px-4 py-2 text-left text-sm ${
                          activePage === link.page
                            ? "border-zinc-900 bg-zinc-100 font-semibold text-zinc-900 dark:border-zinc-300 dark:bg-zinc-800 dark:text-zinc-100"
                            : "border-transparent text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800/50"
                        }`}
                      >
                        {link.label}
                      </button>
                    ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </aside>
  );
}
