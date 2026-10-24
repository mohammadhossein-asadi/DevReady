"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

type Submission = { id: string; title: string; url: string; categoryId: string; language: string; kind: string; desc: string; status: string; createdAt: string };

export default function CommunityView() {
  const [items, setItems] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    try {
      const res = await fetch("/api/submissions?take=50");
      const data = await res.json();
      setItems(data.submissions ?? []);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  return (
    <div className="container mx-auto p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Community Submissions</h1>
        <Button onClick={load} variant="outline" size="sm">Refresh</Button>
      </div>
      {loading ? <p>Loading…</p> : (
        <ul className="space-y-3">
          {items.map((s) => (
            <li key={s.id} className="rounded-lg border p-4">
              <div className="flex items-start justify-between gap-2">
                <a href={s.url} target="_blank" rel="noopener noreferrer" className="font-semibold hover:underline">{s.title}</a>
                <span className="text-xs rounded-full bg-muted px-2 py-0.5">{s.status}</span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">{s.desc}</p>
              <div className="text-xs text-muted-foreground mt-2">{s.categoryId} · {s.kind} · {s.language}</div>
            </li>
          ))}
          {items.length === 0 && <p className="text-muted-foreground">No submissions yet.</p>}
        </ul>
      )}
    </div>
  );
}