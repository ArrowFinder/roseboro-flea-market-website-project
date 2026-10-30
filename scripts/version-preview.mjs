import { readFile, writeFile } from "node:fs/promises";

// Version published CSS/JS URLs with the deployment commit, avoiding stale browser caches.
// Only the deployment artifact changes; source files retain stable local paths.
const revision = process.env.GITHUB_SHA;
if (!/^[a-f0-9]{40}$/.test(revision || ""))
  throw new Error("Missing deployment commit");
const path = new URL("../dist/index.html", import.meta.url);
const html = await readFile(path, "utf8");
await writeFile(
  path,
  html.replace(
    /(href|src)="([^"?:]+\.(?:css|js))(?:\?[^" ]*)?"/g,
    (_, attribute, asset) => `${attribute}="${asset}?v=${revision}"`,
  ),
);
