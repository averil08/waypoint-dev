"use client";

import { useState, useCallback } from "react";
import { pages } from "@/lib/docs-data";
import DocsSidebar from "./docs-sidebar";
import DocsContent from "./docs-content";
import DocsToc from "./docs-toc";

export default function DocsViewer() {
  const [activePage, setActivePage] = useState("overview");
  const [activeHeading, setActiveHeading] = useState<string | null>(null);

  const page = pages[activePage] ?? pages.overview;

  const handleSelectPage = useCallback((pageId: string) => {
    setActivePage(pageId);
    setActiveHeading(null);
  }, []);

  const handleScroll = useCallback(
    (headingId: string | null) => {
      setActiveHeading(headingId);
    },
    []
  );

  const handleTocClick = useCallback((id: string) => {
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <div className="flex h-[calc(100vh-3.5rem)] overflow-hidden">
      <DocsSidebar activePage={activePage} onSelectPage={handleSelectPage} />

      <div className="flex flex-1 overflow-hidden">
        <DocsContent page={page} onScroll={handleScroll} />
        <DocsToc
          entries={page.toc}
          activeHeading={activeHeading}
          onClickEntry={handleTocClick}
        />
      </div>
    </div>
  );
}