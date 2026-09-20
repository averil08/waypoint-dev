export interface TocEntry {
  id: string;
  label: string;
}

export interface PageData {
  title: string;
  badge?: string;
  date: string;
  read: string;
  toc: TocEntry[];
  html: string;
}

export interface NavEndpoint {
  page: string;
  method: string;
  label: string;
}

export interface NavSubGroup {
  key: string;
  title: string;
  endpoints: NavEndpoint[];
  defaultOpen?: boolean;
}

export interface NavLink {
  page: string;
  label: string;
}

export interface NavGroup {
  key: string;
  title: string;
  links: NavLink[];
  subGroups: NavSubGroup[];
}

/* ------------------------------------------------------------------ */
/*  Environment                                                        */
/* ------------------------------------------------------------------ */

export const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

/* ------------------------------------------------------------------ */
/*  Navigation structure                                               */
/* ------------------------------------------------------------------ */

export const navGroups: NavGroup[] = [
  {
    key: "overview",
    title: "Overview",
    links: [
      { page: "overview", label: "Introduction" },
      { page: "getting-started", label: "Getting started" },
      { page: "errors", label: "Errors & status codes" },
    ],
    subGroups: [],
  },
  {
    key: "route",
    title: "Route",
    links: [{ page: "route-intro", label: "Introduction" }],
    subGroups: [
      {
        key: "route-endpoints",
        title: "Endpoints",
        defaultOpen: true,
        endpoints: [
          { page: "route-list", method: "GET", label: "List routes" },
          { page: "route-with-stops", method: "GET", label: "Get route with stops" },
          { page: "route-get", method: "GET", label: "Get a route" },
          { page: "route-create", method: "POST", label: "Create a route" },
          { page: "route-update", method: "PUT", label: "Update a route" },
          { page: "route-delete", method: "DELETE", label: "Delete a route" },
        ],
      },
    ],
  },
  {
    key: "stop",
    title: "Stop",
    links: [{ page: "stop-intro", label: "Introduction" }],
    subGroups: [
      {
        key: "stop-endpoints",
        title: "Endpoints",
        endpoints: [
          { page: "stop-list", method: "GET", label: "List stops" },
          { page: "stop-by-route", method: "GET", label: "Stops on a route" },
          { page: "stop-with-routes", method: "GET", label: "Get stop with routes" },
          { page: "stop-get", method: "GET", label: "Get a stop" },
          { page: "stop-create", method: "POST", label: "Create a stop" },
          { page: "stop-update", method: "PUT", label: "Update a stop" },
          { page: "stop-delete", method: "DELETE", label: "Delete a stop" },
        ],
      },
    ],
  },
  {
    key: "routestop",
    title: "RouteStop",
    links: [{ page: "routestop-intro", label: "Introduction" }],
    subGroups: [
      {
        key: "routestop-endpoints",
        title: "Endpoints",
        endpoints: [
          { page: "routestop-create", method: "POST", label: "Add stop to route" },
          { page: "routestop-update", method: "PUT", label: "Update assignment" },
          { page: "routestop-delete", method: "DELETE", label: "Remove stop from route" },
        ],
      },
    ],
  },
  {
    key: "system",
    title: "System",
    links: [
      { page: "system-health", label: "Health check" },
      { page: "system-openapi", label: "OpenAPI specification" },
    ],
    subGroups: [],
  },
];

/* ------------------------------------------------------------------ */
/*  Page content                                                       */
/* ------------------------------------------------------------------ */

export const pages: Record<string, PageData> = {
  /* OVERVIEW */
  overview: {
    title: "Overview",
    date: "Published on Sep 16, 2026",
    read: "3 minute(s) read",
    toc: [
      { id: "what-is", label: "What is the Waypoint API" },
      { id: "what-it-offers", label: "What it offers" },
      { id: "core-resources", label: "Core resources" },
      { id: "who-its-for", label: "Who it's for" },
      { id: "getting-started", label: "Getting started" },
    ],
    html: `
      <h2 id="what-is">What is the Waypoint API</h2>
      <p>The Waypoint API is an open, developer-first REST API that provides geolocated, community-verified jeepney terminal and boarding-point (<em>paradahan</em>) data for Baguio City. It lets developers manage and query three things: the <strong>routes</strong> jeepneys run, the <strong>stops</strong> (terminals and boarding points) they serve, and the <strong>sequence</strong> in which a route visits each stop. It's built for commuter apps, terminal management systems, and city transit dashboards that need accurate, structured local route information.</p>
      <p><strong>Read-only (v1).</strong> The current release is public and read-only — <code>GET</code> requests only. Write operations (<code>POST</code>/<code>PUT</code>/<code>DELETE</code>) return <code>405 Method Not Allowed</code> and will be enabled in <strong>v2</strong> for developers with API keys.</p>

      <h2 id="what-it-offers">What it offers</h2>
      <p>The API gives you programmatic access to Baguio's jeepney route network so you don't have to hardcode routes or scrape signage. With it you can:</p>
      <div class="docs-grid-2">
        <div class="docs-feature-card">
          <h4>Query routes</h4>
          <p>List every registered jeepney route with its number, name, vehicle type, and operational status.</p>
        </div>
        <div class="docs-feature-card">
          <h4>Manage stops</h4>
          <p>Browse a directory of geolocated terminals and boarding points, each with a name and coordinates. Writes arrive in v2.</p>
        </div>
        <div class="docs-feature-card">
          <h4>Sequence stops per route</h4>
          <p>Read the ordered path a jeepney takes — which stops are <code>TERMINAL</code> and which are <code>INTERMEDIATE</code>.</p>
        </div>
        <div class="docs-feature-card">
          <h4>Monitor the system</h4>
          <p>Check API health and pull the live OpenAPI specification.</p>
        </div>
      </div>

      <h2 id="core-resources">Core resources</h2>
      <p>The API is organized around four main resources, each covered in its own section of this documentation:</p>
      <table>
        <tr><th>Resource</th><th>Description</th></tr>
        <tr><td><code>Route</code></td><td>A named jeepney line, e.g. "Diego Silang St. (PNR Terminal) - PNR", with a unique route number, vehicle type, and status.</td></tr>
        <tr><td><code>Stop</code></td><td>A physical location a jeepney can pick up or drop off passengers, identified by name and coordinates.</td></tr>
        <tr><td><code>RouteStop</code></td><td>The join record that orders a <code>Stop</code> along a <code>Route</code>, defining the travel sequence and stop type.</td></tr>
        <tr><td><code>System</code></td><td>Utility endpoints for health checks and OpenAPI metadata.</td></tr>
      </table>

      <h2 id="who-its-for">Who it's for</h2>
      <p>This API is intended for developers building commuter-facing apps, local government transit tools, terminal operators digitizing their route boards, and researchers studying urban public transport patterns in Baguio City.</p>

      <h2 id="getting-started">Getting started</h2>
      <p>Head to <strong>Getting started</strong> for the base URL and your first request, or jump straight to the <strong>Route</strong> section to start listing jeepney routes. The API is open and requires no authentication.</p>
    `,
  },

  "getting-started": {
    title: "Getting started",
    badge: "Quickstart",
    date: "Published on Sep 16, 2026",
    read: "1 minute(s) read",
    toc: [
      { id: "api-format", label: "API format" },
      { id: "base-url", label: "Base URL" },
      { id: "first-request", label: "Making your first request" },
    ],
    html: `
      <h2 id="api-format">API format</h2>
      <p>The Waypoint API is organized around REST. It has predictable, resource-oriented URLs, uses standard HTTP verbs and response codes, and returns JSON for every response, including errors. It is fully open — no API keys, tokens, or authentication are required.</p>
      <p><strong>Public, read-only v1.</strong> All <code>GET</code> endpoints are freely accessible. <code>POST</code>/<code>PUT</code>/<code>DELETE</code> requests currently return <code>405 Method Not Allowed</code> — write access will be available in <strong>v2</strong> for developers with API keys.</p>

      <h2 id="base-url">Base URL</h2>
      <p>All endpoints are served from a single base URL:</p>
      <div class="docs-endpoint-url">${BASE_URL}</div>
      <p>Every resource path in this documentation is relative to this base URL (for example, the full routes URL is <code>${BASE_URL}/api/routes</code>).</p>

      <h2 id="first-request">Making your first request</h2>
      <p>List every registered jeepney route with a single <code>GET</code> request:</p>
      <div class="docs-code-label">Request</div>
      <pre>curl ${BASE_URL}/api/routes</pre>
      <p>The response is a JSON array of route objects ordered by route number (see <strong>List routes</strong>).</p>
    `,
  },

  errors: {
    title: "Errors & status codes",
    date: "Published on Sep 16, 2026",
    read: "2 minute(s) read",
    toc: [
      { id: "status-codes", label: "Status codes" },
      { id: "error-shape", label: "Error response shape" },
      { id: "error-codes", label: "Error codes" },
    ],
    html: `
      <h2 id="status-codes">Status codes</h2>
      <table>
        <tr><th>Code</th><th>Meaning</th></tr>
        <tr><td><code>200</code></td><td>OK — request succeeded</td></tr>
        <tr><td><code>201</code></td><td>Created — resource created successfully</td></tr>
        <tr><td><code>204</code></td><td>No Content — deletion succeeded</td></tr>
        <tr><td><code>404</code></td><td>Not found — route, stop, or route-stop does not exist</td></tr>
        <tr><td><code>405</code></td><td>Method Not Allowed — write operations are disabled in the read-only v1</td></tr>
        <tr><td><code>409</code></td><td>Conflict — violates a business rule (see below)</td></tr>
        <tr><td><code>500</code></td><td>Internal server error</td></tr>
      </table>

      <h2 id="error-shape">Error response shape</h2>
      <p>Every error returns a JSON object with a machine-readable <code>error</code> code and a human-readable <code>message</code>:</p>
      <pre>{
  "error": "STOP_NOT_FOUND",
  "message": "Stop not found"
}</pre>

      <h2 id="error-codes">Error codes</h2>
      <table>
        <tr><th>Code</th><th>Status</th><th>Meaning</th></tr>
        <tr><td><code>METHOD_NOT_ALLOWED</code></td><td>405</td><td>Write operations (POST/PUT/DELETE) are blocked in the read-only v1.</td></tr>
        <tr><td><code>ROUTE_NOT_FOUND</code></td><td>404</td><td>The referenced route does not exist.</td></tr>
        <tr><td><code>STOP_NOT_FOUND</code></td><td>404</td><td>The referenced stop does not exist.</td></tr>
        <tr><td><code>ROUTE_STOP_NOT_FOUND</code></td><td>404</td><td>The stop is not assigned to the route.</td></tr>
        <tr><td><code>DUPLICATE_ROUTE_STOP</code></td><td>409</td><td>The stop is already assigned to the route.</td></tr>
        <tr><td><code>MAX_TERMINALS_EXCEEDED</code></td><td>409</td><td>A route already has 2 TERMINAL stops.</td></tr>
        <tr><td><code>INVALID_SEQUENCE</code></td><td>409</td><td>The requested sequence is out of range.</td></tr>
        <tr><td><code>INTERNAL_ERROR</code></td><td>500</td><td>An unexpected error occurred.</td></tr>
      </table>
    `,
  },

  /* ROUTE */
  "route-intro": {
    title: "Route",
    badge: "Resource",
    date: "Published on Sep 16, 2026",
    read: "2 minute(s) read",
    toc: [
      { id: "about", label: "About Route" },
      { id: "object", label: "The Route object" },
      { id: "example", label: "Example" },
    ],
    html: `
      <h2 id="about">About Route</h2>
      <p>A <strong>Route</strong> represents a single jeepney line operating in Baguio City — for example, "Diego Silang St. (PNR Terminal) - PNR" or "PMA - Kias Line". Each route stores a unique route number, a human-readable name, the vehicle type that serves it, and its operational status. The actual path a jeepney takes is defined separately by assigning ordered <strong>RouteStop</strong> records, with a TERMINAL at each end.</p>

      <h2 id="object">The Route object</h2>
      <table>
        <tr><th>Field</th><th>Type</th><th>Description</th></tr>
        <tr><td><code>id</code></td><td>string (uuid)</td><td>Unique route identifier.</td></tr>
        <tr><td><code>routeNumber</code></td><td>integer</td><td>Route number. Unique across all routes.</td></tr>
        <tr><td><code>routeName</code></td><td>string</td><td>Display name of the route.</td></tr>
        <tr><td><code>vehicleType</code></td><td>string</td><td><code>JEEPNEY</code>, <code>MODERNJEEP</code>, or <code>TAXI</code>.</td></tr>
        <tr><td><code>status</code></td><td>string</td><td><code>ACTIVE</code>, <code>INACTIVE</code>, or <code>UNKNOWN</code>.</td></tr>
        <tr><td><code>createdAt</code></td><td>string</td><td>ISO 8601 timestamp.</td></tr>
        <tr><td><code>updatedAt</code></td><td>string</td><td>ISO 8601 timestamp.</td></tr>
      </table>

      <h2 id="example">Example</h2>
      <pre>{
  "id": "0dcb2d6c-ad02-4434-b4b3-d8bc17750167",
  "routeNumber": 1,
  "routeName": "Diego Silang St. (PNR Terminal) - PNR",
  "vehicleType": "JEEPNEY",
  "status": "ACTIVE"
}</pre>
    `,
  },
  "route-list": {
    title: "List routes",
    badge: "GET",
    date: "Published on Sep 16, 2026",
    read: "1 minute(s) read",
    toc: [
      { id: "response", label: "Response" },
    ],
    html: `
      <div class="docs-endpoint-header"><span class="docs-badge-pill">GET</span></div>
      <div class="docs-endpoint-url">/api/routes</div>
      <p>Returns all routes ordered by route number ascending. There are no query parameters and no pagination — the response is a plain JSON array.</p>

      <h2 id="response">Response</h2>
      <div class="docs-code-label">200 OK</div>
      <pre>[
  {
    "id": "0dcb2d6c-ad02-4434-b4b3-d8bc17750167",
    "routeNumber": 1,
    "routeName": "Diego Silang St. (PNR Terminal) - PNR",
    "vehicleType": "JEEPNEY",
    "status": "ACTIVE",
    "createdAt": "2026-08-01T03:12:00.000Z",
    "updatedAt": "2026-08-01T03:12:00.000Z"
  },
  {
    "id": "9f3a7c21-6b2e-4d5a-9c1b-2e8f0a1b3c4d",
    "routeNumber": 7,
    "routeName": "PMA - Kias Line",
    "vehicleType": "JEEPNEY",
    "status": "ACTIVE",
    "createdAt": "2026-08-03T09:30:00.000Z",
    "updatedAt": "2026-08-03T09:30:00.000Z"
  }
]</pre>
    `,
  },
  "route-with-stops": {
    title: "Get route with stops",
    badge: "GET",
    date: "Published on Sep 16, 2026",
    read: "1 minute(s) read",
    toc: [
      { id: "path", label: "Path parameters" },
      { id: "response", label: "Response" },
    ],
    html: `
      <div class="docs-endpoint-header"><span class="docs-badge-pill">GET</span></div>
      <div class="docs-endpoint-url">/api/routes/{id}/with-stops</div>
      <p>Returns a single route plus every stop assigned to it, in sequence order. Each entry includes the nested <code>stop</code> object.</p>

      <h2 id="path">Path parameters</h2>
      <table>
        <tr><th>Parameter</th><th>Type</th><th>Required</th><th>Description</th></tr>
        <tr><td><code>id</code></td><td>string (uuid)</td><td class="docs-req-yes">Yes</td><td>The route to retrieve.</td></tr>
      </table>

      <h2 id="response">Response</h2>
      <div class="docs-code-label">200 OK</div>
      <pre>{
  "id": "9f3a7c21-6b2e-4d5a-9c1b-2e8f0a1b3c4d",
  "routeNumber": 7,
  "routeName": "PMA - Kias Line",
  "vehicleType": "JEEPNEY",
  "status": "ACTIVE",
  "routeStops": [
    {
      "routeId": "9f3a7c21-6b2e-4d5a-9c1b-2e8f0a1b3c4d",
      "stopId": "b1a0c2d3-4e5f-6a7b-8c9d-0e1f2a3b4c5d",
      "sequence": 1,
      "stopType": "TERMINAL",
      "stop": { "id": "b1a0c2d3-4e5f-6a7b-8c9d-0e1f2a3b4c5d", "name": "Burnham Park", "latitude": 16.375797, "longitude": 120.589286 }
    },
    {
      "routeId": "9f3a7c21-6b2e-4d5a-9c1b-2e8f0a1b3c4d",
      "stopId": "73020a21-147f-4211-9ca2-fd2ae5ed913b",
      "sequence": 2,
      "stopType": "INTERMEDIATE",
      "stop": { "id": "73020a21-147f-4211-9ca2-fd2ae5ed913b", "name": "Hillside", "latitude": 16.3976943, "longitude": 120.6042911 }
    }
  ]
}</pre>
      <p>Returns <code>404</code> with <code>ROUTE_NOT_FOUND</code> if the route does not exist.</p>
    `,
  },
  "route-get": {
    title: "Get a route by ID",
    badge: "GET",
    date: "Published on Sep 16, 2026",
    read: "1 minute(s) read",
    toc: [
      { id: "path", label: "Path parameters" },
      { id: "response", label: "Response" },
    ],
    html: `
      <div class="docs-endpoint-header"><span class="docs-badge-pill">GET</span></div>
      <div class="docs-endpoint-url">/api/routes/{id}</div>
      <p>Retrieves the details of a single route by its ID.</p>

      <h2 id="path">Path parameters</h2>
      <table>
        <tr><th>Parameter</th><th>Type</th><th>Required</th><th>Description</th></tr>
        <tr><td><code>id</code></td><td>string (uuid)</td><td class="docs-req-yes">Yes</td><td>The route to retrieve.</td></tr>
      </table>

      <h2 id="response">Response</h2>
      <div class="docs-code-label">200 OK</div>
      <pre>{
  "id": "0dcb2d6c-ad02-4434-b4b3-d8bc17750167",
  "routeNumber": 1,
  "routeName": "Diego Silang St. (PNR Terminal) - PNR",
  "vehicleType": "JEEPNEY",
  "status": "ACTIVE",
  "createdAt": "2026-08-01T03:12:00.000Z",
  "updatedAt": "2026-08-01T03:12:00.000Z"
}</pre>
      <p>Returns <code>404</code> with <code>ROUTE_NOT_FOUND</code> if the route does not exist.</p>
    `,
  },
  "route-create": {
    title: "Create a route",
    badge: "POST",
    date: "Published on Sep 16, 2026",
    read: "1 minute(s) read",
    toc: [
      { id: "body", label: "Request body" },
      { id: "response", label: "Response" },
    ],
    html: `
      <div class="docs-endpoint-header"><span class="docs-badge-pill">POST</span></div>
      <div class="docs-endpoint-url">/api/routes</div>
      <p>Creates a new route record. The <code>routeNumber</code> must be unique.</p>
      <p><strong>Read-only in v1.</strong> This endpoint returns <code>405 Method Not Allowed</code> for now and will be available in <strong>v2</strong> with API-key authentication.</p>

      <h2 id="body">Request body</h2>
      <table>
        <tr><th>Field</th><th>Type</th><th>Required</th><th>Description</th></tr>
        <tr><td><code>routeNumber</code></td><td>integer</td><td class="docs-req-yes">Yes</td><td>Unique route number.</td></tr>
        <tr><td><code>routeName</code></td><td>string</td><td class="docs-req-yes">Yes</td><td>Display name of the route.</td></tr>
        <tr><td><code>vehicleType</code></td><td>string</td><td class="docs-req-yes">Yes</td><td><code>JEEPNEY</code>, <code>MODERNJEEP</code>, or <code>TAXI</code>.</td></tr>
        <tr><td><code>status</code></td><td>string</td><td class="docs-req-no">No</td><td>Defaults to <code>ACTIVE</code>. Also accepts <code>INACTIVE</code> / <code>UNKNOWN</code>.</td></tr>
      </table>

      <h2 id="response">Response</h2>
      <div class="docs-code-label">201 Created</div>
      <pre>{
  "id": "5e1f9a2b-3c4d-5e6f-7a8b-9c0d1e2f3a4b",
  "routeNumber": 22,
  "routeName": "Dangwa - La Trinidad",
  "vehicleType": "MODERNJEEP",
  "status": "ACTIVE",
  "createdAt": "2026-09-16T08:00:00.000Z",
  "updatedAt": "2026-09-16T08:00:00.000Z"
}</pre>
      <p>Returns <code>409</code> if the <code>routeNumber</code> is already in use.</p>
    `,
  },
  "route-update": {
    title: "Update a route",
    badge: "PUT",
    date: "Published on Sep 16, 2026",
    read: "1 minute(s) read",
    toc: [
      { id: "path", label: "Path parameters" },
      { id: "body", label: "Request body" },
      { id: "response", label: "Response" },
    ],
    html: `
      <div class="docs-endpoint-header"><span class="docs-badge-pill">PUT</span></div>
      <div class="docs-endpoint-url">/api/routes/{id}</div>
      <p>Updates an existing route's fields. The <code>routeNumber</code> is not editable — only <code>routeName</code>, <code>vehicleType</code>, and <code>status</code> can be changed.</p>
      <p><strong>Read-only in v1.</strong> This endpoint returns <code>405 Method Not Allowed</code> for now and will be available in <strong>v2</strong> with API-key authentication.</p>

      <h2 id="path">Path parameters</h2>
      <table>
        <tr><th>Parameter</th><th>Type</th><th>Required</th><th>Description</th></tr>
        <tr><td><code>id</code></td><td>string (uuid)</td><td class="docs-req-yes">Yes</td><td>The route to update.</td></tr>
      </table>

      <h2 id="body">Request body</h2>
      <table>
        <tr><th>Field</th><th>Type</th><th>Required</th><th>Description</th></tr>
        <tr><td><code>routeName</code></td><td>string</td><td class="docs-req-no">No</td><td>New display name.</td></tr>
        <tr><td><code>vehicleType</code></td><td>string</td><td class="docs-req-no">No</td><td>New vehicle type.</td></tr>
        <tr><td><code>status</code></td><td>string</td><td class="docs-req-no">No</td><td>New operational status.</td></tr>
      </table>

      <h2 id="response">Response</h2>
      <div class="docs-code-label">200 OK</div>
      <pre>{
  "id": "0dcb2d6c-ad02-4434-b4b3-d8bc17750167",
  "routeNumber": 1,
  "routeName": "Diego Silang St. (PNR Terminal) - PNR",
  "vehicleType": "JEEPNEY",
  "status": "INACTIVE",
  "updatedAt": "2026-09-16T09:00:00.000Z"
}</pre>
      <p>Returns <code>404</code> with <code>ROUTE_NOT_FOUND</code> if the route does not exist.</p>
    `,
  },
  "route-delete": {
    title: "Delete a route",
    badge: "DELETE",
    date: "Published on Sep 16, 2026",
    read: "1 minute(s) read",
    toc: [
      { id: "path", label: "Path parameters" },
      { id: "response", label: "Response" },
    ],
    html: `
      <div class="docs-endpoint-header"><span class="docs-badge-pill">DELETE</span></div>
      <div class="docs-endpoint-url">/api/routes/{id}</div>
      <p>Permanently deletes a route. This also removes all associated <code>RouteStop</code> assignments.</p>
      <p><strong>Read-only in v1.</strong> This endpoint returns <code>405 Method Not Allowed</code> for now and will be available in <strong>v2</strong> with API-key authentication.</p>

      <h2 id="path">Path parameters</h2>
      <table>
        <tr><th>Parameter</th><th>Type</th><th>Required</th><th>Description</th></tr>
        <tr><td><code>id</code></td><td>string (uuid)</td><td class="docs-req-yes">Yes</td><td>The route to delete.</td></tr>
      </table>

      <h2 id="response">Response</h2>
      <div class="docs-code-label">204 No Content</div>
      <pre>(empty body)</pre>
      <p>Returns <code>404</code> with <code>ROUTE_NOT_FOUND</code> if the route does not exist.</p>
    `,
  },

  /* STOP */
  "stop-intro": {
    title: "Stop",
    badge: "Resource",
    date: "Published on Sep 16, 2026",
    read: "2 minute(s) read",
    toc: [
      { id: "about", label: "About Stop" },
      { id: "object", label: "The Stop object" },
      { id: "example", label: "Example" },
    ],
    html: `
      <h2 id="about">About Stop</h2>
      <p>A <strong>Stop</strong> is a physical pickup or drop-off point — ranging from a formal terminal to a roadside boarding point (<em>paradahan</em>). Each stop is identified by a name and its geographic coordinates; there is no address or zone field, the coordinate pair is the source of truth. Stops are shared resources: the same stop can appear in multiple routes via <strong>RouteStop</strong>.</p>

      <h2 id="object">The Stop object</h2>
      <table>
        <tr><th>Field</th><th>Type</th><th>Description</th></tr>
        <tr><td><code>id</code></td><td>string (uuid)</td><td>Unique stop identifier.</td></tr>
        <tr><td><code>name</code></td><td>string</td><td>Display name of the stop.</td></tr>
        <tr><td><code>latitude</code></td><td>number (double)</td><td>Latitude in decimal degrees.</td></tr>
        <tr><td><code>longitude</code></td><td>number (double)</td><td>Longitude in decimal degrees.</td></tr>
        <tr><td><code>createdAt</code></td><td>string</td><td>ISO 8601 timestamp.</td></tr>
        <tr><td><code>updatedAt</code></td><td>string</td><td>ISO 8601 timestamp.</td></tr>
      </table>

      <h2 id="example">Example</h2>
      <pre>{
  "id": "73020a21-147f-4211-9ca2-fd2ae5ed913b",
  "name": "Hillside",
  "latitude": 16.3976943,
  "longitude": 120.6042911
}</pre>
    `,
  },
  "stop-list": {
    title: "List stops",
    badge: "GET",
    date: "Published on Sep 16, 2026",
    read: "1 minute(s) read",
    toc: [
      { id: "response", label: "Response" },
    ],
    html: `
      <div class="docs-endpoint-header"><span class="docs-badge-pill">GET</span></div>
      <div class="docs-endpoint-url">/api/stops</div>
      <p>Returns all stops ordered by name ascending. There are no query parameters and no pagination — the response is a plain JSON array.</p>

      <h2 id="response">Response</h2>
      <div class="docs-code-label">200 OK</div>
      <pre>[
  {
    "id": "b1a0c2d3-4e5f-6a7b-8c9d-0e1f2a3b4c5d",
    "name": "Burnham Park",
    "latitude": 16.375797,
    "longitude": 120.589286,
    "createdAt": "2026-08-03T09:30:00.000Z",
    "updatedAt": "2026-08-03T09:30:00.000Z"
  },
  {
    "id": "73020a21-147f-4211-9ca2-fd2ae5ed913b",
    "name": "Hillside",
    "latitude": 16.3976943,
    "longitude": 120.6042911,
    "createdAt": "2026-08-03T09:30:00.000Z",
    "updatedAt": "2026-08-03T09:30:00.000Z"
  }
]</pre>
    `,
  },
  "stop-by-route": {
    title: "Stops on a route",
    badge: "GET",
    date: "Published on Sep 16, 2026",
    read: "1 minute(s) read",
    toc: [
      { id: "path", label: "Path parameters" },
      { id: "response", label: "Response" },
    ],
    html: `
      <div class="docs-endpoint-header"><span class="docs-badge-pill">GET</span></div>
      <div class="docs-endpoint-url">/api/stops/by-route/{routeId}</div>
      <p>Returns the route-stop join records for a route with the nested <code>stop</code> object, ordered by sequence ascending.</p>

      <h2 id="path">Path parameters</h2>
      <table>
        <tr><th>Parameter</th><th>Type</th><th>Required</th><th>Description</th></tr>
        <tr><td><code>routeId</code></td><td>string (uuid)</td><td class="docs-req-yes">Yes</td><td>The route to list stops for.</td></tr>
      </table>

      <h2 id="response">Response</h2>
      <div class="docs-code-label">200 OK</div>
      <pre>[
  {
    "routeId": "9f3a7c21-6b2e-4d5a-9c1b-2e8f0a1b3c4d",
    "stopId": "b1a0c2d3-4e5f-6a7b-8c9d-0e1f2a3b4c5d",
    "sequence": 1,
    "stopType": "TERMINAL",
    "stop": { "id": "b1a0c2d3-4e5f-6a7b-8c9d-0e1f2a3b4c5d", "name": "Burnham Park", "latitude": 16.375797, "longitude": 120.589286 }
  },
  {
    "routeId": "9f3a7c21-6b2e-4d5a-9c1b-2e8f0a1b3c4d",
    "stopId": "73020a21-147f-4211-9ca2-fd2ae5ed913b",
    "sequence": 2,
    "stopType": "INTERMEDIATE",
    "stop": { "id": "73020a21-147f-4211-9ca2-fd2ae5ed913b", "name": "Hillside", "latitude": 16.3976943, "longitude": 120.6042911 }
  }
]</pre>
      <p>Returns <code>404</code> with <code>ROUTE_NOT_FOUND</code> if the route does not exist.</p>
    `,
  },
  "stop-with-routes": {
    title: "Get stop with routes",
    badge: "GET",
    date: "Published on Sep 16, 2026",
    read: "1 minute(s) read",
    toc: [
      { id: "path", label: "Path parameters" },
      { id: "response", label: "Response" },
    ],
    html: `
      <div class="docs-endpoint-header"><span class="docs-badge-pill">GET</span></div>
      <div class="docs-endpoint-url">/api/stops/{id}/with-routes</div>
      <p>Returns a single stop plus every route that serves it, in sequence order (the sequence position of the stop on each route). Each entry includes the nested <code>route</code> object.</p>

      <h2 id="path">Path parameters</h2>
      <table>
        <tr><th>Parameter</th><th>Type</th><th>Required</th><th>Description</th></tr>
        <tr><td><code>id</code></td><td>string (uuid)</td><td class="docs-req-yes">Yes</td><td>The stop to retrieve.</td></tr>
      </table>

      <h2 id="response">Response</h2>
      <div class="docs-code-label">200 OK</div>
      <pre>{
  "id": "73020a21-147f-4211-9ca2-fd2ae5ed913b",
  "name": "Hillside",
  "latitude": 16.3976943,
  "longitude": 120.6042911,
  "routeStops": [
    {
      "routeId": "9f3a7c21-6b2e-4d5a-9c1b-2e8f0a1b3c4d",
      "stopId": "73020a21-147f-4211-9ca2-fd2ae5ed913b",
      "sequence": 2,
      "stopType": "INTERMEDIATE",
      "route": { "id": "9f3a7c21-6b2e-4d5a-9c1b-2e8f0a1b3c4d", "routeNumber": 7, "routeName": "PMA - Kias Line", "vehicleType": "JEEPNEY", "status": "ACTIVE" }
    }
  ]
}</pre>
      <p>Returns <code>404</code> with <code>STOP_NOT_FOUND</code> if the stop does not exist.</p>
    `,
  },
  "stop-get": {
    title: "Get a stop by ID",
    badge: "GET",
    date: "Published on Sep 16, 2026",
    read: "1 minute(s) read",
    toc: [
      { id: "path", label: "Path parameters" },
      { id: "response", label: "Response" },
    ],
    html: `
      <div class="docs-endpoint-header"><span class="docs-badge-pill">GET</span></div>
      <div class="docs-endpoint-url">/api/stops/{id}</div>
      <p>Retrieves details for a single stop.</p>

      <h2 id="path">Path parameters</h2>
      <table>
        <tr><th>Parameter</th><th>Type</th><th>Required</th><th>Description</th></tr>
        <tr><td><code>id</code></td><td>string (uuid)</td><td class="docs-req-yes">Yes</td><td>The stop to retrieve.</td></tr>
      </table>

      <h2 id="response">Response</h2>
      <div class="docs-code-label">200 OK</div>
      <pre>{
  "id": "73020a21-147f-4211-9ca2-fd2ae5ed913b",
  "name": "Hillside",
  "latitude": 16.3976943,
  "longitude": 120.6042911,
  "createdAt": "2026-08-03T09:30:00.000Z",
  "updatedAt": "2026-08-03T09:30:00.000Z"
}</pre>
      <p>Returns <code>404</code> with <code>STOP_NOT_FOUND</code> if the stop does not exist.</p>
    `,
  },
  "stop-create": {
    title: "Create a stop",
    badge: "POST",
    date: "Published on Sep 16, 2026",
    read: "1 minute(s) read",
    toc: [
      { id: "body", label: "Request body" },
      { id: "response", label: "Response" },
    ],
    html: `
      <div class="docs-endpoint-header"><span class="docs-badge-pill">POST</span></div>
      <div class="docs-endpoint-url">/api/stops</div>
      <p>Creates a new stop with a name and geographic coordinates.</p>
      <p><strong>Read-only in v1.</strong> This endpoint returns <code>405 Method Not Allowed</code> for now and will be available in <strong>v2</strong> with API-key authentication.</p>

      <h2 id="body">Request body</h2>
      <table>
        <tr><th>Field</th><th>Type</th><th>Required</th><th>Description</th></tr>
        <tr><td><code>name</code></td><td>string</td><td class="docs-req-yes">Yes</td><td>Display name of the stop.</td></tr>
        <tr><td><code>latitude</code></td><td>number</td><td class="docs-req-yes">Yes</td><td>Latitude in decimal degrees.</td></tr>
        <tr><td><code>longitude</code></td><td>number</td><td class="docs-req-yes">Yes</td><td>Longitude in decimal degrees.</td></tr>
      </table>

      <h2 id="response">Response</h2>
      <div class="docs-code-label">201 Created</div>
      <pre>{
  "id": "c2b1d3e4-5f6a-7b8c-9d0e-1f2a3b4c5d6e",
  "name": "Public Market",
  "latitude": 16.4011,
  "longitude": 120.5981,
  "createdAt": "2026-09-16T08:15:00.000Z",
  "updatedAt": "2026-09-16T08:15:00.000Z"
}</pre>
    `,
  },
  "stop-update": {
    title: "Update a stop",
    badge: "PUT",
    date: "Published on Sep 16, 2026",
    read: "1 minute(s) read",
    toc: [
      { id: "path", label: "Path parameters" },
      { id: "body", label: "Request body" },
      { id: "response", label: "Response" },
    ],
    html: `
      <div class="docs-endpoint-header"><span class="docs-badge-pill">PUT</span></div>
      <div class="docs-endpoint-url">/api/stops/{id}</div>
      <p>Updates an existing stop's name and/or coordinates.</p>
      <p><strong>Read-only in v1.</strong> This endpoint returns <code>405 Method Not Allowed</code> for now and will be available in <strong>v2</strong> with API-key authentication.</p>

      <h2 id="path">Path parameters</h2>
      <table>
        <tr><th>Parameter</th><th>Type</th><th>Required</th><th>Description</th></tr>
        <tr><td><code>id</code></td><td>string (uuid)</td><td class="docs-req-yes">Yes</td><td>The stop to update.</td></tr>
      </table>

      <h2 id="body">Request body</h2>
      <table>
        <tr><th>Field</th><th>Type</th><th>Required</th><th>Description</th></tr>
        <tr><td><code>name</code></td><td>string</td><td class="docs-req-no">No</td><td>New display name.</td></tr>
        <tr><td><code>latitude</code></td><td>number</td><td class="docs-req-no">No</td><td>New latitude.</td></tr>
        <tr><td><code>longitude</code></td><td>number</td><td class="docs-req-no">No</td><td>New longitude.</td></tr>
      </table>

      <h2 id="response">Response</h2>
      <div class="docs-code-label">200 OK</div>
      <pre>{
  "id": "73020a21-147f-4211-9ca2-fd2ae5ed913b",
  "name": "Hillside (East Bay)",
  "latitude": 16.3976943,
  "longitude": 120.6042911,
  "updatedAt": "2026-09-16T09:10:00.000Z"
}</pre>
      <p>Returns <code>404</code> with <code>STOP_NOT_FOUND</code> if the stop does not exist.</p>
    `,
  },
  "stop-delete": {
    title: "Delete a stop",
    badge: "DELETE",
    date: "Published on Sep 16, 2026",
    read: "1 minute(s) read",
    toc: [
      { id: "path", label: "Path parameters" },
      { id: "response", label: "Response" },
    ],
    html: `
      <div class="docs-endpoint-header"><span class="docs-badge-pill">DELETE</span></div>
      <div class="docs-endpoint-url">/api/stops/{id}</div>
      <p>Permanently deletes a stop and its associated <code>RouteStop</code> assignments.</p>
      <p><strong>Read-only in v1.</strong> This endpoint returns <code>405 Method Not Allowed</code> for now and will be available in <strong>v2</strong> with API-key authentication.</p>

      <h2 id="path">Path parameters</h2>
      <table>
        <tr><th>Parameter</th><th>Type</th><th>Required</th><th>Description</th></tr>
        <tr><td><code>id</code></td><td>string (uuid)</td><td class="docs-req-yes">Yes</td><td>The stop to delete.</td></tr>
      </table>

      <h2 id="response">Response</h2>
      <div class="docs-code-label">204 No Content</div>
      <pre>(empty body)</pre>
      <p>Returns <code>404</code> with <code>STOP_NOT_FOUND</code> if the stop does not exist.</p>
    `,
  },

  /* ROUTESTOP */
  "routestop-intro": {
    title: "RouteStop",
    badge: "Resource",
    date: "Published on Sep 16, 2026",
    read: "3 minute(s) read",
    toc: [
      { id: "about", label: "About RouteStop" },
      { id: "object", label: "The RouteStop object" },
      { id: "rules", label: "Sequence & stop type rules" },
    ],
    html: `
      <h2 id="about">About RouteStop</h2>
      <p>A <strong>RouteStop</strong> links a <code>Stop</code> to a <code>Route</code> at a specific position in the travel sequence. This is how the API represents the ordered path a jeepney follows — first stop, second stop, and so on until the terminus. The composite key <code>(routeId, stopId)</code> guarantees a stop can appear on a route only once.</p>

      <h2 id="object">The RouteStop object</h2>
      <table>
        <tr><th>Field</th><th>Type</th><th>Description</th></tr>
        <tr><td><code>routeId</code></td><td>string (uuid)</td><td>The route this entry belongs to.</td></tr>
        <tr><td><code>stopId</code></td><td>string (uuid)</td><td>The stop referenced.</td></tr>
        <tr><td><code>sequence</code></td><td>integer</td><td>Position of the stop on the route, starting at 1 and always contiguous (1, 2, 3, ...).</td></tr>
        <tr><td><code>stopType</code></td><td>string</td><td><code>TERMINAL</code> (official start/end point, max 2 per route) or <code>INTERMEDIATE</code> (regular boarding/drop-off point).</td></tr>
      </table>

      <h2 id="rules">Sequence &amp; stop type rules</h2>
      <ul>
        <li><strong>Contiguous sequence.</strong> Sequences always stay packed: 1, 2, 3, … with no gaps.</li>
        <li><strong>Auto-assign.</strong> If <code>sequence</code> is omitted when adding a stop, it's appended as the current max sequence + 1.</li>
        <li><strong>Auto-reorder.</strong> Moving a stop to an occupied position shifts the other stops so the sequence stays contiguous. Deleting a stop re-sequences the rest.</li>
        <li><strong>Two-terminal limit.</strong> A route may have at most 2 <code>TERMINAL</code> stops.</li>
        <li><strong>No duplicates.</strong> Adding a stop that is already on the route returns <code>409</code> with <code>DUPLICATE_ROUTE_STOP</code>.</li>
      </ul>
      <p>Example — Route 7 (PMA - Kias Line): Burnham Park <code>TERMINAL</code> → PMA <code>INTERMEDIATE</code> → Kias <code>INTERMEDIATE</code> → Acacia Philex <code>TERMINAL</code>.</p>
    `,
  },
  "routestop-create": {
    title: "Add stop to route",
    badge: "POST",
    date: "Published on Sep 16, 2026",
    read: "1 minute(s) read",
    toc: [
      { id: "body", label: "Request body" },
      { id: "response", label: "Response" },
    ],
    html: `
      <div class="docs-endpoint-header"><span class="docs-badge-pill">POST</span></div>
      <div class="docs-endpoint-url">/api/route-stops</div>
      <p>Assigns a stop to a route. If <code>sequence</code> is omitted it is auto-assigned as the current max sequence + 1 (appended to the end). A route may have at most 2 TERMINAL stops, and a stop can be added to a route only once.</p>
      <p><strong>Read-only in v1.</strong> This endpoint returns <code>405 Method Not Allowed</code> for now and will be available in <strong>v2</strong> with API-key authentication.</p>

      <h2 id="body">Request body</h2>
      <table>
        <tr><th>Field</th><th>Type</th><th>Required</th><th>Description</th></tr>
        <tr><td><code>routeId</code></td><td>string (uuid)</td><td class="docs-req-yes">Yes</td><td>The route to attach to.</td></tr>
        <tr><td><code>stopId</code></td><td>string (uuid)</td><td class="docs-req-yes">Yes</td><td>The stop being added.</td></tr>
        <tr><td><code>stopType</code></td><td>string</td><td class="docs-req-yes">Yes</td><td><code>TERMINAL</code> or <code>INTERMEDIATE</code>.</td></tr>
        <tr><td><code>sequence</code></td><td>integer</td><td class="docs-req-no">No</td><td>Position on the route. Omitted = append as max + 1.</td></tr>
      </table>

      <h2 id="response">Response</h2>
      <div class="docs-code-label">201 Created</div>
      <pre>{
  "routeId": "9f3a7c21-6b2e-4d5a-9c1b-2e8f0a1b3c4d",
  "stopId": "c2b1d3e4-5f6a-7b8c-9d0e-1f2a3b4c5d6e",
  "sequence": 4,
  "stopType": "INTERMEDIATE"
}</pre>
      <p>Returns <code>404</code> (<code>ROUTE_NOT_FOUND</code> / <code>STOP_NOT_FOUND</code>) if either resource is missing, and <code>409</code> for a duplicate assignment, an exceed 2-terminal limit, or an invalid sequence.</p>
    `,
  },
  "routestop-update": {
    title: "Update assignment",
    badge: "PUT",
    date: "Published on Sep 16, 2026",
    read: "1 minute(s) read",
    toc: [
      { id: "path", label: "Path parameters" },
      { id: "body", label: "Request body" },
      { id: "response", label: "Response" },
    ],
    html: `
      <div class="docs-endpoint-header"><span class="docs-badge-pill">PUT</span></div>
      <div class="docs-endpoint-url">/api/route-stops/{routeId}/{stopId}</div>
      <p>Updates the sequence and/or stop type of an existing route-stop record. Moving a stop to an occupied sequence position shifts the other stops automatically so sequences stay contiguous.</p>
      <p><strong>Read-only in v1.</strong> This endpoint returns <code>405 Method Not Allowed</code> for now and will be available in <strong>v2</strong> with API-key authentication.</p>

      <h2 id="path">Path parameters</h2>
      <table>
        <tr><th>Parameter</th><th>Type</th><th>Required</th><th>Description</th></tr>
        <tr><td><code>routeId</code></td><td>string (uuid)</td><td class="docs-req-yes">Yes</td><td>The route of the assignment.</td></tr>
        <tr><td><code>stopId</code></td><td>string (uuid)</td><td class="docs-req-yes">Yes</td><td>The stop of the assignment.</td></tr>
      </table>

      <h2 id="body">Request body</h2>
      <table>
        <tr><th>Field</th><th>Type</th><th>Required</th><th>Description</th></tr>
        <tr><td><code>sequence</code></td><td>integer</td><td class="docs-req-no">No</td><td>New position. Neighboring stops auto-reorder.</td></tr>
        <tr><td><code>stopType</code></td><td>string</td><td class="docs-req-no">No</td><td>New stop type. Changing to <code>TERMINAL</code> is limited to 2 per route.</td></tr>
      </table>

      <h2 id="response">Response</h2>
      <div class="docs-code-label">200 OK</div>
      <pre>{
  "routeId": "9f3a7c21-6b2e-4d5a-9c1b-2e8f0a1b3c4d",
  "stopId": "73020a21-147f-4211-9ca2-fd2ae5ed913b",
  "sequence": 1,
  "stopType": "TERMINAL"
}</pre>
      <p>Returns <code>404</code> with <code>ROUTE_STOP_NOT_FOUND</code> if the assignment does not exist, and <code>409</code> for invalid sequences or exceeding the 2-terminal limit.</p>
    `,
  },
  "routestop-delete": {
    title: "Remove stop from route",
    badge: "DELETE",
    date: "Published on Sep 16, 2026",
    read: "1 minute(s) read",
    toc: [
      { id: "path", label: "Path parameters" },
      { id: "response", label: "Response" },
    ],
    html: `
      <div class="docs-endpoint-header"><span class="docs-badge-pill">DELETE</span></div>
      <div class="docs-endpoint-url">/api/route-stops/{routeId}/{stopId}</div>
      <p>Removes the assignment. The remaining stops are automatically re-sequenced so the order stays contiguous.</p>
      <p><strong>Read-only in v1.</strong> This endpoint returns <code>405 Method Not Allowed</code> for now and will be available in <strong>v2</strong> with API-key authentication.</p>

      <h2 id="path">Path parameters</h2>
      <table>
        <tr><th>Parameter</th><th>Type</th><th>Required</th><th>Description</th></tr>
        <tr><td><code>routeId</code></td><td>string (uuid)</td><td class="docs-req-yes">Yes</td><td>The route of the assignment.</td></tr>
        <tr><td><code>stopId</code></td><td>string (uuid)</td><td class="docs-req-yes">Yes</td><td>The stop of the assignment.</td></tr>
      </table>

      <h2 id="response">Response</h2>
      <div class="docs-code-label">204 No Content</div>
      <pre>(empty body)</pre>
      <p>Returns <code>404</code> with <code>ROUTE_STOP_NOT_FOUND</code> if the assignment does not exist.</p>
    `,
  },

  /* SYSTEM */
  "system-health": {
    title: "Health check",
    badge: "GET",
    date: "Published on Sep 16, 2026",
    read: "1 minute(s) read",
    toc: [
      { id: "response", label: "Response" },
    ],
    html: `
      <div class="docs-endpoint-header"><span class="docs-badge-pill">GET</span></div>
      <div class="docs-endpoint-url">/health</div>
      <p>Returns the current operational status of the API. Does not require authentication.</p>

      <h2 id="response">Response</h2>
      <div class="docs-code-label">200 OK</div>
      <pre>{ "status": "ok" }</pre>
    `,
  },
  "system-openapi": {
    title: "OpenAPI specification",
    badge: "GET",
    date: "Published on Sep 16, 2026",
    read: "1 minute(s) read",
    toc: [
      { id: "response", label: "Response" },
      { id: "using", label: "Using the specification" },
    ],
    html: `
      <div class="docs-endpoint-header"><span class="docs-badge-pill">GET</span></div>
      <div class="docs-endpoint-url">/openapi.json</div>
      <p>Returns the full OpenAPI 3.0 specification for the Waypoint API — every path, operation, parameter, and schema described in machine-readable form.</p>

      <h2 id="response">Response</h2>
      <div class="docs-code-label">200 OK</div>
      <pre>{
  "openapi": "3.0.0",
  "info": {
    "title": "Waypoint API",
    "version": "1.0.0"
  },
  "paths": { ... }
}</pre>

      <h2 id="using">Using the specification</h2>
      <p>This document is served fresh at <code>${BASE_URL}/openapi.json</code> and is what this documentation site and other tooling consume. Use it to generate strongly-typed clients or SDKs for <code>curl</code>, TypeScript, OpenAPI Generator, and similar tools.</p>
    `,
  },
};