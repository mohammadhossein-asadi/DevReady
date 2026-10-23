// Quick catalog sanity check (run via node with ts stripped by bun)
import { categories, totalResources, totalPersian } from "/home/z/my-project/src/lib/data/resources.ts";
const ids = new Set();
const dups = [];
for (const c of categories) { if (ids.has(c.id)) dups.push(c.id); ids.add(c.id); }
console.log("categories:", categories.length);
console.log("total resources:", totalResources);
console.log("persian resources:", totalPersian);
console.log("duplicate ids:", dups.length ? dups : "none");
for (const c of categories) {
  console.log(`  ${c.id.padEnd(22)} ${String(c.resources.length).padStart(3)}  ${c.icon.padEnd(14)} ${c.hue}`);
}
