import { test } from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdtempSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const course = path.join(root, "lessons/ai-literature-searchv1.0");

test("three.js bundle is the real r170 renderer", () => {
  const source = readFileSync(path.join(course, "assets/vendor/three.r170.js"), "utf8");
  assert.match(source, /three\.js r170/);
  assert.match(source, /MIT License/);
  assert.ok(source.includes("WebGLRenderer"));
  assert.ok(source.includes("TubeGeometry"));
  assert.ok(source.length > 400000);
});

test("diagram script stays offline and caps the renderer", () => {
  const source = readFileSync(path.join(course, "assets/js/diagrams.js"), "utf8");
  assert.equal(/\bimport\s*\(/.test(source), false);
  assert.equal(source.includes("fetch("), false);
  assert.match(source, /Math\.min\(window\.devicePixelRatio \|\| 1, 1\.5\)/);
  assert.match(source, /webglcontextlost/);
  assert.match(source, /prefers-reduced-motion/);
  assert.match(source, /五个都不够/);
  assert.match(source, /不是论文互相引用/);
  assert.equal(source.includes("WebGLRenderer"), true);
});

test("standalone file embeds the library and the lesson", () => {
  const dir = mkdtempSync(path.join(tmpdir(), "lit3d-"));
  const out = path.join(dir, "standalone.html");
  const built = spawnSync(process.execPath, [path.join(course, "build-standalone.mjs"), out], { encoding: "utf8" });
  assert.equal(built.status, 0, built.stderr);
  const html = readFileSync(out, "utf8");
  assert.ok(html.length > 700000);
  assert.match(html, /three\.js r170/);
  assert.ok(html.includes("WebGLRenderer"));
  assert.ok(html.includes("搜不到，不等于不存在"));
  assert.ok(html.includes("OPENALEX_API_KEY"));
  assert.equal(/<script[^>]+src=/.test(html), false);
  assert.equal(/<link[^>]+href="(?!data:)/.test(html), false);
  assert.equal(/<img[^>]+src="https?:/.test(html), false);
  assert.equal(/\bimport\s*\(/.test(html), false);
  assert.equal(html.includes("fonts.googleapis"), false);
  assert.equal(html.includes("昨天，我在学校给研究生上的课终于结课了。"), false);
});
