/**
 * helpers.js — shared builders for the DevReady Master Plan docx.
 * Follows docx skill: Profile A formal (English -> Times New Roman), GO-1 palette,
 * Horizontal-Only tables, R1 cover recipe, line 312 (1.3x) everywhere.
 */
const {
  Paragraph, TextRun, Table, TableRow, TableCell, ImageRun,
  WidthType, BorderStyle, ShadingType, AlignmentType, HeadingLevel,
  TableLayoutType, PageBreak,
} = require("docx");
const fs = require("fs");
const path = require("path");
const _imgSize = require("image-size");
const sizeOf = _imgSize.imageSize || _imgSize.default || _imgSize;

// ── GO-1 Graphite Orange palette (design-system.md) ─────────────────────────
const PAL = {
  primary: "1A2330",       // headings
  body: "000000",          // Profile A report body = pure black
  secondary: "5A6572",     // captions, footnotes
  accent: "D4875A",
  table: { headerBg: "D4875A", headerText: "FFFFFF", accentLine: "D4875A", innerLine: "DDD0C8", surface: "F8F0EB" },
  cover: { bg: "1A2330", titleColor: "FFFFFF", subtitleColor: "B0B8C0", metaColor: "90989F", accent: "D4875A", footerColor: "687078" },
};

// English formal profile
const FONT = { ascii: "Times New Roman", hAnsi: "Times New Roman", eastAsia: "SimSun", cs: "Arial" };
const HEAD_FONT = { ascii: "Times New Roman", hAnsi: "Times New Roman", eastAsia: "SimHei", cs: "Arial" };
// Arial covers Arabic/Persian script via cs
const FA_FONT = { ascii: "Arial", hAnsi: "Arial", cs: "Arial", eastAsia: "Arial" };

const NB = { style: BorderStyle.NONE, size: 0, color: "FFFFFF" };
const noBorders = { top: NB, bottom: NB, left: NB, right: NB };
const allNoBorders = { top: NB, bottom: NB, left: NB, right: NB, insideHorizontal: NB, insideVertical: NB };

// ── safe text guard (common-rules.md) ───────────────────────────────────────
function safeText(v, ph) {
  if (v === undefined || v === null || v === "" || String(v) === "NaN" || String(v) === "undefined") {
    return ph || "[missing]";
  }
  return String(v);
}

// ── runs builder: accepts string OR array of {t, b (bold), i (italics), accent, fa} ──
function runs(spec, base) {
  const b = base || {};
  if (typeof spec === "string") {
    return [new TextRun({ text: safeText(spec), size: b.size || 24, bold: !!b.bold, italics: !!b.italics,
      color: b.color || PAL.body, font: b.font || FONT })];
  }
  return spec.map(r => new TextRun({
    text: safeText(r.t),
    size: r.size || b.size || 24,
    bold: !!r.b,
    italics: !!r.i,
    color: r.accent ? PAL.accent : (r.color || b.color || PAL.body),
    font: r.fa ? FA_FONT : (b.font || FONT),
  }));
}

// ── headings (Heading styles are mandatory for TOC) ─────────────────────────
function h1(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_1,
    spacing: { before: 400, after: 180, line: 312 },
    children: [new TextRun({ text: safeText(text), bold: true, size: 32, color: PAL.primary, font: HEAD_FONT })],
  });
}
function h2(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 280, after: 120, line: 312 },
    children: [new TextRun({ text: safeText(text), bold: true, size: 28, color: PAL.primary, font: HEAD_FONT })],
  });
}
function h3(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_3,
    spacing: { before: 220, after: 100, line: 312 },
    children: [new TextRun({ text: safeText(text), bold: true, size: 24, color: PAL.primary, font: HEAD_FONT })],
  });
}

// ── body paragraph — English: LEFT aligned, no first-line indent ────────────
function p(spec, opts) {
  const o = opts || {};
  return new Paragraph({
    alignment: AlignmentType.LEFT,
    spacing: { after: o.after !== undefined ? o.after : 140, line: 312 },
    keepNext: !!o.keepNext,
    children: runs(spec, { size: o.size, color: o.color, italics: o.italics }),
  });
}

// bullet item (used sparingly, always with surrounding narrative)
function bullet(spec) {
  return new Paragraph({
    bullet: { level: 0 },
    alignment: AlignmentType.LEFT,
    spacing: { after: 80, line: 312 },
    children: runs(spec),
  });
}

// numbered item — reference must be a unique numbering reference
function numbered(ref, spec) {
  return new Paragraph({
    numbering: { reference: ref, level: 0 },
    alignment: AlignmentType.LEFT,
    spacing: { after: 80, line: 312 },
    children: runs(spec),
  });
}

// ── tables — Horizontal-Only business style (design-system.md §3) ───────────
// cellSpec: string | {t, b, fa, accent, center}
function cellPara(cellSpec, isHeader) {
  const s = typeof cellSpec === "string" ? { t: cellSpec } : cellSpec;
  return new Paragraph({
    alignment: s.center ? AlignmentType.CENTER : AlignmentType.LEFT,
    spacing: { line: 312, before: 20, after: 20 },
    children: [new TextRun({
      text: safeText(s.t),
      size: isHeader ? 21 : 20,
      bold: isHeader ? true : !!s.b,
      color: isHeader ? PAL.table.headerText : (s.accent ? PAL.accent : PAL.body),
      font: s.fa ? FA_FONT : FONT,
    })],
  });
}

function bizTable(headers, rows, widths) {
  const n = headers.length;
  const w = widths || headers.map(() => Math.floor(100 / n));
  const headerRow = new TableRow({
    tableHeader: true,
    cantSplit: true,
    children: headers.map((htext, i) => new TableCell({
      children: [cellPara(htext, true)],
      shading: { type: ShadingType.CLEAR, fill: PAL.table.headerBg },
      margins: { top: 70, bottom: 70, left: 110, right: 110 },
      width: { size: w[i], type: WidthType.PERCENTAGE },
    })),
  });
  const dataRows = rows.map(r => new TableRow({
    cantSplit: true,
    children: r.map((cell, i) => new TableCell({
      children: [cellPara(cell, false)],
      margins: { top: 60, bottom: 60, left: 110, right: 110 },
      width: { size: w[i], type: WidthType.PERCENTAGE },
    })),
  }));
  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    layout: TableLayoutType.FIXED,
    borders: {
      top: { style: BorderStyle.SINGLE, size: 4, color: PAL.table.accentLine },
      bottom: { style: BorderStyle.SINGLE, size: 4, color: PAL.table.accentLine },
      left: NB, right: NB,
      insideHorizontal: { style: BorderStyle.SINGLE, size: 2, color: PAL.table.innerLine },
      insideVertical: NB,
    },
    rows: [headerRow, ...dataRows],
  });
}

// caption before a table (keepNext keeps it glued to the table)
let tableCounter = 0;
function tableCaption(text) {
  tableCounter += 1;
  return new Paragraph({
    keepNext: true,
    alignment: AlignmentType.LEFT,
    spacing: { before: 200, after: 100, line: 312 },
    children: [
      new TextRun({ text: "Table " + tableCounter + ".  ", bold: true, size: 21, color: PAL.primary, font: FONT }),
      new TextRun({ text: safeText(text), size: 21, color: PAL.secondary, font: FONT }),
    ],
  });
}

// ── figures ──────────────────────────────────────────────────────────────────
let figCounter = 0;
function fig(imgPath, caption, displayWidthPx) {
  figCounter += 1;
  const buf = fs.readFileSync(imgPath);
  const dims = sizeOf(buf);
  const w = displayWidthPx || 560;
  const h = Math.round(w * (dims.height / dims.width));
  return [
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { before: 160, after: 80, line: 312 },
      keepNext: true,
      children: [new ImageRun({ data: buf, transformation: { width: w, height: h }, type: "png" })],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 220, line: 312 },
      children: [
        new TextRun({ text: "Figure " + figCounter + ".  ", bold: true, size: 18, color: PAL.primary, font: FONT }),
        new TextRun({ text: safeText(caption), size: 18, color: PAL.secondary, font: FONT }),
      ],
    }),
  ];
}

// callout box — single-cell table with surface tint + left accent (paragraph border style)
function callout(title, bodySpec) {
  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    layout: TableLayoutType.FIXED,
    borders: {
      top: NB, bottom: NB, right: NB, insideHorizontal: NB, insideVertical: NB,
      left: { style: BorderStyle.SINGLE, size: 18, color: PAL.accent },
    },
    rows: [new TableRow({
      cantSplit: true,
      children: [new TableCell({
        shading: { type: ShadingType.CLEAR, fill: PAL.table.surface },
        margins: { top: 110, bottom: 110, left: 160, right: 160 },
        width: { size: 100, type: WidthType.PERCENTAGE },
        children: [
          new Paragraph({
            spacing: { after: 60, line: 312 },
            children: [new TextRun({ text: safeText(title), bold: true, size: 22, color: PAL.primary, font: FONT })],
          }),
          new Paragraph({
            spacing: { after: 0, line: 312 },
            children: runs(bodySpec, { size: 21 }),
          }),
        ],
      })],
    })],
  });
}

module.exports = {
  PAL, FONT, HEAD_FONT, FA_FONT, NB, noBorders, allNoBorders,
  safeText, runs, h1, h2, h3, p, bullet, numbered, bizTable, tableCaption, fig, callout,
};
