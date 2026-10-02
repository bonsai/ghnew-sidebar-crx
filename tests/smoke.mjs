import { readFileSync } from "node:fs";
import assert from "node:assert/strict";

const manifest = JSON.parse(readFileSync("manifest.json", "utf8"));
const html = readFileSync("index.html", "utf8");
const app = readFileSync("app.js", "utf8");

assert.equal(manifest.manifest_version, 3);
assert.equal(manifest.side_panel.default_path, "index.html");
assert.ok(manifest.permissions.includes("sidePanel"));
assert.ok(manifest.permissions.includes("storage"));
assert.ok(manifest.permissions.includes("tabs"));
assert.ok(manifest.host_permissions.includes("https://api.github.com/*"));
assert.ok(manifest.host_permissions.includes("https://github.com/*"));

for (const id of ["search","search-button","new-form","repo-name","description","private","status","create"]) {
  assert.match(html, new RegExp(`id=["']${id}["']`), `missing #${id}`);
}

for (const pattern of [
  'chrome.tabs.query',
  'chrome.tabs.update',
  'chrome.storage.local',
  'https://api.github.com/repos/',
  'https://api.github.com/user/repos',
]) {
  assert.ok(app.includes(pattern), `missing app behavior: ${pattern}`);
}
assert.match(html, /type="submit"/);

assert.match(app, /encodeURIComponent\(q\)/);
assert.match(app, /r\.status===404/);
assert.match(app, /private:privateInput\.checked/);
console.log("✓ ghnew-sidebar-crx smoke tests passed");
