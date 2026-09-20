import DocsViewer from "@/components/docs/docs-viewer";

export const metadata = {
  title: "API Docs | Waypoint",
  description:
    "Interactive reference for the Waypoint API — geolocated, community-verified jeepney terminal and boarding-point data for Baguio City.",
};

export default function DocsPage() {
  return (
    <main className="flex flex-1 flex-col">
      <DocsViewer />
    </main>
  );
}