import {
  mergeLibrary,
  mergeDaily,
  mergeSrs,
  mergeContribs,
  mergeVotes,
  mergeAll,
} from "../src/lib/sync-merge.ts";

let failures = 0;
function check(name: string, cond: boolean, extra?: unknown) {
  if (!cond) {
    failures++;
    console.error(`FAIL ${name}`, extra ?? "");
  } else {
    console.log(`ok   ${name}`);
  }
}

// library: union bookmarks (server first), done>doing, notes LWW
const ml = mergeLibrary(
  {
    v: 1,
    bookmarks: ["b2", "b3"],
    status: { a: "done", b: "doing" },
    notes: { n1: { text: "local newer", updatedAt: 200 }, n2: { text: "local", updatedAt: 100 } },
  },
  {
    v: 1,
    bookmarks: ["b1", "b2"],
    status: { a: "doing", c: "done" },
    notes: { n1: { text: "remote older", updatedAt: 100 }, n2: { text: "remote newer", updatedAt: 300 } },
  }
);
check("bookmarks union order", JSON.stringify(ml.bookmarks) === '["b1","b2","b3"]', ml.bookmarks);
check("status done beats doing", ml.status.a === "done", ml.status);
check("status keep both sides", ml.status.b === "doing" && ml.status.c === "done", ml.status);
check("notes LWW local newer", ml.notes.n1.text === "local newer", ml.notes.n1);
check("notes LWW remote newer", ml.notes.n2.text === "remote newer", ml.notes.n2);

// daily union
const md = mergeDaily({ v: 1, completedDates: ["2026-10-24", "2026-10-20"] }, { v: 1, completedDates: ["2026-10-22", "2026-10-24"] });
check("daily union sorted", JSON.stringify(md.completedDates) === '["2026-10-20","2026-10-22","2026-10-24"]', md.completedDates);

// srs: newest lastReviewedAt wins; log max
const ms = mergeSrs(
  { v: 1, cards: { c1: { key: "c1", ease: 2.5, interval: 3, due: "2026-10-27", reps: 2, lapses: 0, addedAt: "2026-10-20", lastReviewedAt: "2026-10-24" } }, log: { "2026-10-24": { reviews: 4, again: 1 } } },
  { v: 1, cards: { c1: { key: "c1", ease: 2.3, interval: 1, due: "2026-10-25", reps: 1, lapses: 1, addedAt: "2026-10-20", lastReviewedAt: "2026-10-23" } }, log: { "2026-10-24": { reviews: 2, again: 0 }, "2026-10-23": { reviews: 1, again: 0 } } }
);
check("srs card newest wins", ms.cards.c1.interval === 3, ms.cards.c1);
check("srs log max reviews", ms.log["2026-10-24"].reviews === 4, ms.log);
check("srs log union days", ms.log["2026-10-23"].reviews === 1, ms.log);

// contribs: shaped {v, submissions}, union by id, newer wins
const mc = mergeContribs(
  { v: 1, submissions: [{ id: "x", title: "local", createdAt: 200, status: "queued" }] },
  { v: 1, submissions: [{ id: "x", title: "remote", createdAt: 100, status: "queued" }, { id: "y", title: "remote-only", createdAt: 50, status: "queued" }] }
);
check("contribs keeps v1 wrapper", mc.v === 1 && Array.isArray(mc.submissions), mc);
check("contribs newer wins", mc.submissions.length === 2 && mc.submissions.find((s: { id: string }) => s.id === "x").title === "local", mc.submissions);

// votes LWW
const mv = mergeVotes(
  { v: 1, votes: { k1: { level: "easy", updatedAt: 300 } } },
  { v: 1, votes: { k1: { level: "hard", updatedAt: 400 }, k2: { level: "medium", updatedAt: 1 } } }
);
check("votes remote newer wins", mv.votes.k1.level === "hard", mv.votes);
check("votes union keys", mv.votes.k2.level === "medium", mv.votes);

// malformed remote must not clobber local
const mm = mergeAll(
  { library: { v: 1, bookmarks: ["keep"], status: {}, notes: {} }, daily: { v: 1, completedDates: ["2026-10-24"] }, srs: { v: 1, cards: {}, log: {} }, contribs: { v: 1, submissions: [] }, votes: { v: 1, votes: {} } },
  { library: "garbage", daily: 42, srs: null, contribs: [], votes: { weird: true } }
);
check("malformed remote tolerated", JSON.stringify(mm.library.bookmarks) === '["keep"]' && JSON.stringify(mm.daily.completedDates) === '["2026-10-24"]', mm);

console.log(failures === 0 ? "\nALL MERGE TESTS PASSED" : `\n${failures} FAILURES`);
process.exit(failures === 0 ? 0 : 1);
