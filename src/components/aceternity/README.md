# Aceternity UI integration points

This folder hosts the "delightful layer" recommended by the DevReady spec —
components inspired by [Aceternity UI](https://ui.aceternity.com), kept clearly
separate from the core shadcn/ui primitives in `components/ui/`.

## What ships in Phase 1

| Component | File | Use case | Notes |
| --- | --- | --- | --- |
| Background Beams | `background-beams.tsx` | Hero section ambience | Pure CSS keyframes, grid mask + drifting beams |
| Text Generate | `text-generate.tsx` | Hero headline reveal | Staggered word fade; runs once |
| Spotlight Card | `spotlight-card.tsx` | Category & resource cards | Pointer-tracked radial glow via CSS variables |
| Moving Border | `moving-border.tsx` | Primary call-to-action button | Rotating conic-gradient border (@property) |
| Infinite Moving Cards | `infinite-moving-cards.tsx` | "Community favorites" marquee | CSS marquee, pauses on hover |

All of them:

- use only CSS animations (no framer-motion dependency needed yet);
- honor `prefers-reduced-motion` (animations collapse to static states);
- work in both light and dark themes;
- are tested for RTL — logical properties (`start/end/ms/me/ps/pe`) are used
  throughout so the layout mirrors correctly in Persian.

## Adding more Aceternity components later

1. `bun add framer-motion` (some official components depend on it).
2. Copy the component source into `src/components/aceternity/`.
3. Keep the base design tokens (colors, radii, spacing) driven by shadcn/ui +
   Tailwind — do not hard-code ad-hoc palettes.
4. Test in light + dark mode and with `prefers-reduced-motion` enabled.
5. Verify RTL alignment in Persian before merging.
