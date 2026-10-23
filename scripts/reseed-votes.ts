import { db } from "../src/lib/db.ts";

const PHANTOM = "javascript·MDN — JavaScript·https://developer.mozilla.org/en-US/docs/Web/JavaScript";
const REAL = "javascript·MDN — JavaScript Reference·https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference";

const emails = ["tester@devready.app", "learner1@devready.app", "learner2@devready.app", "learner3@devready.app"];
await db.vote.deleteMany({ where: { key: PHANTOM } });
for (const email of emails) {
  const account = await db.account.findUnique({ where: { email } });
  if (!account) continue;
  await db.vote.upsert({
    where: { accountId_key: { accountId: account.id, key: REAL } },
    update: { level: "medium" },
    create: { accountId: account.id, key: REAL, level: "medium" },
  });
}
console.log("aggregate:", JSON.stringify(await db.vote.groupBy({ by: ["key", "level"], _count: { _all: true } })));
process.exit(0);
