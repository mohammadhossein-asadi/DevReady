/**
 * cover.js — Recipe R1 (Pure Paragraph Left) per design-system.md, GO-1 palette.
 * Single 16838 outer wrapper, allNoBorders, calcTitleLayout (width-aware for English),
 * calcCoverSpacing. English label + meta lines + footer exactly per recipe.
 */
const {
  Paragraph, TextRun, Table, TableRow, TableCell,
  WidthType, BorderStyle, ShadingType, TableLayoutType,
} = require("docx");
const { NB, noBorders, allNoBorders } = require("./helpers");

// Width-aware estimator (design-system.md): CJK = pt*20, Latin ≈ pt*11
function estimateTextWidth(text, pt) {
  let width = 0;
  for (const ch of text) {
    const code = ch.codePointAt(0);
    const isCJK = (code >= 0x4E00 && code <= 0x9FFF) || (code >= 0x3400 && code <= 0x4DBF) ||
      (code >= 0x3000 && code <= 0x303F) || (code >= 0xFF00 && code <= 0xFFEF) ||
      (code >= 0x2E80 && code <= 0x2EFF);
    width += isCJK ? pt * 20 : pt * 11;
  }
  return width;
}

// Greedy word-wrap at spaces (semantic boundaries for English titles), no orphans.
function splitTitleLinesEN(title, maxWidthTwips, pt) {
  const words = title.split(/\s+/);
  const lines = [];
  let cur = "";
  for (const word of words) {
    const candidate = cur ? cur + " " + word : word;
    if (estimateTextWidth(candidate, pt) <= maxWidthTwips || !cur) {
      cur = candidate;
    } else {
      lines.push(cur);
      cur = word;
    }
  }
  if (cur) lines.push(cur);
  // merge tiny orphan last line
  if (lines.length > 1 && lines[lines.length - 1].length <= 4) {
    const last = lines.pop();
    lines[lines.length - 1] += " " + last;
  }
  return lines;
}

// calcTitleLayout — dynamic font size, <= 3 lines (design-system.md contract)
function calcTitleLayout(title, maxWidthTwips, preferredPt = 40, minPt = 24) {
  let titlePt = preferredPt;
  let lines;
  while (titlePt >= minPt) {
    lines = splitTitleLinesEN(title, maxWidthTwips, titlePt);
    const widest = Math.max(...lines.map(l => estimateTextWidth(l, titlePt)));
    if (lines.length <= 3 && widest <= maxWidthTwips) break;
    titlePt -= 2;
  }
  if (!lines || lines.length > 3) {
    lines = splitTitleLinesEN(title, maxWidthTwips, minPt);
    titlePt = minPt;
  }
  return { titlePt, titleLines: lines };
}

// calcCoverSpacing — verbatim logic from design-system.md
function calcCoverSpacing(params) {
  const {
    titleLineCount = 1, titlePt = 36, hasSubtitle = false,
    hasEnglishLabel = false, metaLineCount = 0,
    fixedHeight = 800, pageHeight = 16838,
    marginTop = 0, marginBottom = 0,
  } = params;
  const SAFETY = 1200;
  const usableHeight = pageHeight - marginTop - marginBottom - SAFETY;
  const titleHeight = titleLineCount * (titlePt * 23 + 200);
  const subtitleHeight = hasSubtitle ? (12 * 23 + 600) : 0;
  const englishLabelHeight = hasEnglishLabel ? (9 * 23 + 600) : 0;
  const metaHeight = metaLineCount * (10 * 23 + 100);
  const implicitParaHeight = 3 * 300;
  const contentHeight = titleHeight + subtitleHeight + englishLabelHeight +
    metaHeight + fixedHeight + implicitParaHeight;
  const remainingSpace = usableHeight - contentHeight;
  const safeRemaining = Math.max(remainingSpace, 400);
  const FOOTER_MIN = 800;
  const rawTop = Math.floor(safeRemaining * 0.45);
  const rawBottom = Math.floor(safeRemaining * 0.45);
  const bottomSpacing = Math.max(rawBottom, FOOTER_MIN);
  const topSpacing = Math.max(rawTop - Math.max(0, FOOTER_MIN - rawBottom), 400);
  const midSpacing = Math.max(safeRemaining - topSpacing - bottomSpacing, 0);
  return { topSpacing, midSpacing, bottomSpacing };
}

// ── Recipe R1 (design-system.md) ─────────────────────────────────────────────
function buildCoverR1(config) {
  const P = config.palette;
  const padL = 1200, padR = 800;

  const availableWidth = 11906 - padL - padR - 300;
  const { titlePt, titleLines } = calcTitleLayout(config.title, availableWidth, 40, 24);
  const titleSize = titlePt * 2;

  const spacing = calcCoverSpacing({
    titleLineCount: titleLines.length, titlePt,
    hasSubtitle: !!config.subtitle, hasEnglishLabel: !!config.englishLabel,
    metaLineCount: (config.metaLines || []).length,
    fixedHeight: 400,
  });

  const accentLeft = { style: BorderStyle.SINGLE, size: 8, color: P.accent, space: 12 };
  const children = [];

  // 1. Top whitespace (dynamic)
  children.push(new Paragraph({ spacing: { before: spacing.topSpacing } }));

  // 2. English label with accent bottom border
  if (config.englishLabel) {
    children.push(new Paragraph({
      indent: { left: padL, right: padR }, spacing: { after: 500 },
      border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: P.accent, space: 8 } },
      children: [new TextRun({ text: config.englishLabel.split("").join("  "),
        size: 18, color: P.accent, font: { ascii: "Calibri", eastAsia: "SimHei" }, characterSpacing: 40 })],
    }));
  }

  // 3. Main title (dynamic size + smart breaks; explicit line spacing prevents clipping)
  for (let i = 0; i < titleLines.length; i++) {
    children.push(new Paragraph({
      indent: { left: padL },
      spacing: { after: i < titleLines.length - 1 ? 100 : 300, line: Math.ceil(titlePt * 23), lineRule: "atLeast" },
      children: [new TextRun({ text: titleLines[i], size: titleSize, bold: true,
        color: P.titleColor, font: { eastAsia: "SimHei", ascii: "Arial" } })],
    }));
  }

  // 4. Subtitle
  if (config.subtitle) {
    children.push(new Paragraph({
      indent: { left: padL, right: padR }, spacing: { after: 800, line: 340, lineRule: "atLeast" },
      children: [new TextRun({ text: config.subtitle, size: 24, color: P.subtitleColor,
        font: { eastAsia: "Microsoft YaHei", ascii: "Arial" } })],
    }));
  }

  // 5. Meta info lines with left accent border
  for (const line of (config.metaLines || [])) {
    children.push(new Paragraph({
      indent: { left: padL + 200 }, spacing: { after: 80 },
      border: { left: accentLeft },
      children: [new TextRun({ text: line, size: 24, color: P.metaColor,
        font: { eastAsia: "Microsoft YaHei", ascii: "Arial" } })],
    }));
  }

  // 6. Bottom whitespace (dynamic)
  children.push(new Paragraph({ spacing: { before: spacing.bottomSpacing } }));

  // 7. Footer with top accent separator
  children.push(new Paragraph({
    indent: { left: padL, right: padR },
    border: { top: { style: BorderStyle.SINGLE, size: 2, color: P.accent, space: 8 } },
    spacing: { before: 200 },
    children: [
      new TextRun({ text: config.footerLeft || "", size: 16, color: P.footerColor, font: { ascii: "Arial" } }),
      new TextRun({ text: "                                        " }),
      new TextRun({ text: config.footerRight || "", size: 16, color: P.footerColor, font: { ascii: "Arial" } }),
    ],
  }));

  // Single 16838 wrapper — the ONLY table, allNoBorders, exact height
  return [new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    layout: TableLayoutType.FIXED,
    borders: allNoBorders,
    rows: [new TableRow({
      height: { value: 16838, rule: "exact" },
      children: [new TableCell({
        shading: { type: ShadingType.CLEAR, fill: P.bg }, borders: noBorders,
        children,
      })],
    })],
  })];
}

module.exports = { buildCoverR1, calcTitleLayout, calcCoverSpacing, estimateTextWidth };
