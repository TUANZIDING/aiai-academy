import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const dir = path.dirname(fileURLToPath(import.meta.url));
const out = process.argv[2];
if (!out) {
  console.error("Usage: node build-standalone.mjs <output.html>");
  process.exit(1);
}

let html = readFileSync(path.join(dir, "index.html"), "utf8");
const css = readFileSync(path.join(dir, "assets/css/course.css"), "utf8");
html = html.replace('<link rel="stylesheet" href="assets/css/course.css">', () => `<style>\n${css}\n</style>`);

const images = [...html.matchAll(/src="(assets\/images\/[^"]+)"/g)].map((match) => match[1]);
for (const rel of images) {
  const bytes = readFileSync(path.join(dir, rel));
  const uri = `data:image/svg+xml;base64,${bytes.toString("base64")}`;
  html = html.split(`src="${rel}"`).join(`src="${uri}"`);
}

const scripts = ["assets/vendor/three.r170.js", "assets/js/rules.js", "assets/js/diagrams.js", "assets/js/course.js"];
for (const rel of scripts) {
  const code = readFileSync(path.join(dir, rel), "utf8").replace(/<\/script/gi, "<\\/script");
  const tag = `<script src="${rel}"></script>`;
  if (!html.includes(tag)) throw new Error(`Missing ${tag}`);
  html = html.replace(tag, () => `<script>\n${code}\n</script>`);
}

if (/<script[^>]+src=/.test(html)) throw new Error("Standalone still has an external script");
if (/<link[^>]+href="(?!data:)/.test(html)) throw new Error("Standalone still has an external stylesheet");
mkdirSync(path.dirname(path.resolve(out)), { recursive: true });
writeFileSync(out, html);
console.log(out, html.length);
