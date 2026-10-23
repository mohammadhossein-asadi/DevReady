#!/usr/bin/env python3
"""Generate the two illustrative charts for the DevReady Master Plan docx.
Colors: GO-1 accent #D4875A for emphasis; Morandi low-saturation for secondary series.
"""
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
import os

OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "charts")
os.makedirs(OUT, exist_ok=True)

ACCENT = "#D4875A"
SHOULD = "#6B9DAD"
NICE = "#C49B72"
GRAY = "#9AA0A6"
DARK = "#1A2330"

plt.rcParams["axes.unicode_minus"] = False
plt.rcParams["font.size"] = 10

# ------------------------------------------------------------------
# Chart 1 — Impact vs Effort prioritization scatter (illustrative)
# ------------------------------------------------------------------
# (effort 1-5, impact 0-10, label, priority, label dx, dy, ha)
points = [
    (1.0, 8.5, "Privacy-first analytics",      "must",   0.12, 0.05, "left"),
    (1.5, 8.0, "Onboarding quiz",              "must",   0.12, -0.10, "left"),
    (2.5, 8.5, "Readiness Score v1",           "must",   0.12, 0.22, "left"),
    (2.0, 7.5, "PWA + offline shell",          "must",   0.10, -0.42, "left"),
    (3.5, 9.0, "Accounts + cloud sync",        "must",   -0.12, 0.30, "right"),
    (4.0, 9.0, "Original question bank v1",    "must",   -0.10, 0.30, "right"),
    (3.0, 7.0, "Build-time AI hints",          "should", 0.12, -0.42, "left"),
    (3.5, 7.5, "Interactive quizzes",          "should", 0.12, 0.10, "left"),
    (2.0, 6.5, "Company guides",               "should", 0.05, 0.28, "center"),
    (2.5, 6.0, "Community votes + reviews",    "should", 0.12, 0.05, "left"),
    (2.0, 6.0, "Referral loop",                "should", -0.12, -0.02, "right"),
    (5.0, 8.5, "AI mock interviews",           "nice",   -0.12, -0.42, "right"),
    (4.5, 8.0, "Adaptive plan engine",         "nice",   0.10, -0.40, "left"),
    (4.5, 6.5, "Team dashboards (B2B)",        "nice",   0.10, 0.05, "left"),
]
color_map = {"must": ACCENT, "should": SHOULD, "nice": NICE}

fig, ax = plt.subplots(figsize=(10.5, 6), constrained_layout=True)
seen = set()
for x, y, label, prio, dx, dy, ha in points:
    ax.scatter(x, y, s=170, c=color_map[prio], edgecolors="white", linewidths=1.2,
               zorder=3, label={"must": "Must do", "should": "Should do", "nice": "Nice to have"}[prio]
               if prio not in seen else None)
    seen.add(prio)
    ax.annotate(label, (x, y), xytext=(x + dx, y + dy), ha=ha, va="center",
                fontsize=8.6, color=DARK, zorder=4)

ax.axvline(3.0, color="#C9CDD2", linewidth=1.0, linestyle="--", zorder=1)
ax.axhline(7.5, color="#C9CDD2", linewidth=1.0, linestyle="--", zorder=1)
ax.text(0.35, 9.72, "QUICK WINS", fontsize=9, color="#8A9096", fontweight="bold")
ax.text(4.62, 9.72, "BIG BETS", fontsize=9, color="#8A9096", fontweight="bold")
ax.text(0.35, 5.35, "FILL-INS", fontsize=9, color="#8A9096", fontweight="bold")
ax.text(4.62, 5.35, "LATER", fontsize=9, color="#8A9096", fontweight="bold")

ax.set_xlim(0.2, 5.5)
ax.set_ylim(5.0, 10.0)
ax.set_xlabel("Effort (1 = days, 5 = a full quarter for a small team)", fontsize=10, color=DARK)
ax.set_ylabel("Expected retention / growth impact (0\u201310)", fontsize=10, color=DARK)
ax.set_title("Impact vs. effort \u2014 candidate feature backlog (illustrative assessment)",
             fontsize=11.5, color=DARK, fontweight="bold", pad=10)
ax.grid(True, alpha=0.3)
for spine in ["top", "right"]:
    ax.spines[spine].set_visible(False)
ax.legend(loc="lower right", framealpha=0.95, fontsize=9)
fig.savefig(os.path.join(OUT, "impact_effort.png"), dpi=200)
plt.close(fig)

# ------------------------------------------------------------------
# Chart 2 — Retention target curve (illustrative)
# ------------------------------------------------------------------
days = [1, 3, 7, 14, 30]
baseline = [22, 12, 8, 5.5, 3.5]
target = [32, 24, 20, 16, 12]

fig, ax = plt.subplots(figsize=(10.5, 5.5), constrained_layout=True)
ax.plot(days, baseline, linestyle="--", marker="o", color=GRAY, linewidth=2,
        markersize=6, label="Typical baseline: unpersonalized content tool")
ax.plot(days, target, linestyle="-", marker="o", color=ACCENT, linewidth=2.6,
        markersize=7, label="DevReady 12-month target (daily-loop product)")

for d, v in zip(days, baseline):
    ax.annotate(f"{v:g}%", (d, v), xytext=(0, -16), textcoords="offset points",
                ha="center", fontsize=8.5, color="#6E747A")
for d, v in zip(days, target):
    ax.annotate(f"{v:g}%", (d, v), xytext=(0, 10), textcoords="offset points",
                ha="center", fontsize=8.8, color=ACCENT, fontweight="bold")

ax.set_xticks(days)
ax.set_xticklabels(["Day 1", "Day 3", "Day 7", "Day 14", "Day 30"])
ax.set_ylim(0, 38)
ax.set_xlabel("Days since first session", fontsize=10, color=DARK)
ax.set_ylabel("Share of new users returning (%)", fontsize=10, color=DARK)
ax.set_title("Retention curve \u2014 12-month targets vs. typical baseline (illustrative, to be re-based after analytics ship)",
             fontsize=11, color=DARK, fontweight="bold", pad=10)
ax.grid(True, alpha=0.3)
for spine in ["top", "right"]:
    ax.spines[spine].set_visible(False)
ax.legend(loc="center left", bbox_to_anchor=(1.02, 0.5), fontsize=9, frameon=False)
fig.savefig(os.path.join(OUT, "retention_targets.png"), dpi=200)
plt.close(fig)

print("Charts written to", OUT)
