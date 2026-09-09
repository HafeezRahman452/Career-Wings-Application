import fs from "fs";
import path from "path";

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const full = path.join(dir, file);
    const stat = fs.statSync(full);
    if (stat && stat.isDirectory()) {
      if (!full.includes("node_modules") && !full.includes("dist") && !full.includes(".git")) {
        results = results.concat(walk(full));
      }
    } else if (/\.(ts|tsx|json|html)$/.test(file)) {
      results.push(full);
    }
  }
  return results;
}

const files = walk("./src");
const allUrls = new Map();

for (const file of files) {
  const code = fs.readFileSync(file, "utf8");
  const matches = code.match(/https:\/\/[^\s"'`)\><}]+/g) || [];
  for (const m of matches) {
    const clean = m.replace(/[,;>]+$/, "");
    if (clean.includes("unsplash.com") || clean.includes("wikimedia.org") || clean.includes("images") || clean.includes("ui-avatars")) {
      if (!allUrls.has(clean)) {
        allUrls.set(clean, [file]);
      } else {
        allUrls.get(clean).push(file);
      }
    }
  }
}

console.log(`Found ${allUrls.size} unique image URLs across codebase.`);

async function testUrls() {
  const bad = [];
  for (const [url, fileList] of allUrls.entries()) {
    try {
      const res = await fetch(url, { method: "HEAD" });
      if (!res.ok) {
        bad.push({ url, status: res.status, files: fileList });
      }
    } catch (e) {
      bad.push({ url, error: e.message, files: fileList });
    }
  }

  console.log(`Test complete. Broken URLs found: ${bad.length}`);
  if (bad.length > 0) {
    console.log(JSON.stringify(bad, null, 2));
  }
}

testUrls();
