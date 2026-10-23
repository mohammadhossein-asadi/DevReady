/** generate.js — assembles the DevReady Master Plan docx (3-section architecture per toc.md). */
const {
  Document, Packer, Paragraph, TextRun, Header, Footer, PageNumber,
  AlignmentType, HeadingLevel, NumberFormat, SectionType, LevelFormat,
  TableOfContents, PageBreak,
} = require("docx");
const fs = require("fs");
const path = require("path");

const { PAL, FONT, HEAD_FONT } = require("./helpers");
const { buildCoverR1 } = require("./cover");
const c1 = require("./c1-exec-vision");
const c2 = require("./c2-product");
const c3 = require("./c3-content-growth");
const c4 = require("./c4-money-roadmap");
const c5 = require("./c5-wins-moat-appendix");

const OUT = "/home/z/my-project/download/DevReady_Product_Growth_Master_Plan.docx";

// ── page geometry ────────────────────────────────────────────────────────────
const pgSize = { width: 11906, height: 16838 };
const pgMargin = { top: 1440, bottom: 1440, left: 1701, right: 1417 };

// ── headers / footers (professional elements, report scene) ─────────────────
function docHeader() {
  return new Header({
    children: [new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 0, line: 240 },
      children: [new TextRun({
        text: "DevReady \u2014 Product & Growth Master Plan",
        size: 18, color: "808080", font: FONT,
      })],
    })],
  });
}
function pageNumFooter() {
  return new Footer({
    children: [new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 0, line: 240 },
      children: [new TextRun({ children: [PageNumber.CURRENT], size: 18, color: "808080", font: FONT })],
    })],
  });
}

// ── TOC block (toc.md: title (no heading style) + field + hint + PageBreak) ─
const tocBlock = [
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { before: 480, after: 360, line: 700, lineRule: "atLeast" },
    children: [new TextRun({ text: "Table of Contents", bold: true, size: 32, font: HEAD_FONT, color: PAL.primary })],
  }),
  new TableOfContents("Table of Contents", { hyperlink: true, headingStyleRange: "1-3" }),
  new Paragraph({
    spacing: { before: 200, line: 240 },
    children: [new TextRun({
      text: "Note: This Table of Contents is generated via field codes. To ensure page number accuracy after editing, please right-click the TOC and select \u201CUpdate Field.\u201D",
      italics: true, size: 18, color: "888888", font: FONT,
    })],
  }),
  // NOTE: no trailing PageBreak here — Section 3 is SectionType.NEXT_PAGE, so the
  // section break already starts the body on a fresh page (SKILL.md blank-page rule 1).
];

// ── cover config (Recipe R1 + GO-1) ─────────────────────────────────────────
const coverConfig = {
  title: "DevReady Product & Growth Master Plan",
  subtitle: "Strategy for becoming the #1 interview-prep platform for Persian-speaking developers",
  englishLabel: "STRATEGY BLUEPRINT",
  metaLines: [
    "Prepared for: DevReady Founding Team",
    "Scope: Product \u00B7 Content \u00B7 Growth \u00B7 Monetization",
    "Horizon: October 2026 \u2013 December 2027",
    "Version 1.0 \u2014 Final",
  ],
  footerLeft: "DevReady \u00B7 Bilingual Interview-Prep Platform",
  footerRight: "October 2026",
  palette: PAL.cover,
};

// ── document ─────────────────────────────────────────────────────────────────
const doc = new Document({
  features: { updateFields: true },
  styles: {
    default: {
      document: {
        run: { font: FONT, size: 24, color: "000000" },
        paragraph: { spacing: { line: 312 } },
      },
      heading1: {
        run: { font: HEAD_FONT, size: 32, bold: true, color: PAL.primary },
        paragraph: { spacing: { before: 400, after: 180, line: 312 }, outlineLevel: 0 },
      },
      heading2: {
        run: { font: HEAD_FONT, size: 28, bold: true, color: PAL.primary },
        paragraph: { spacing: { before: 280, after: 120, line: 312 }, outlineLevel: 1 },
      },
      heading3: {
        run: { font: HEAD_FONT, size: 24, bold: true, color: PAL.primary },
        paragraph: { spacing: { before: 220, after: 100, line: 312 }, outlineLevel: 2 },
      },
    },
  },
  numbering: {
    config: ["flow-a", "flow-b", "flow-c"].map(ref => ({
      reference: ref,
      levels: [{
        level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT,
        style: { paragraph: { indent: { left: 720, hanging: 360 } } },
      }],
    })),
  },
  sections: [
    // ── Section 1: Cover — margin 0, no header/footer, no pageNumbers ──
    {
      properties: { page: { size: pgSize, margin: { top: 0, bottom: 0, left: 0, right: 0 } } },
      children: buildCoverR1(coverConfig),
    },
    // ── Section 2: Front matter (TOC) — Roman numerals ──
    {
      properties: {
        type: SectionType.NEXT_PAGE,
        page: { size: pgSize, margin: pgMargin, pageNumbers: { start: 1, formatType: NumberFormat.UPPER_ROMAN } },
      },
      headers: { default: docHeader() },
      footers: { default: pageNumFooter() },
      children: tocBlock,
    },
    // ── Section 3: Body — Arabic, restart at 1 ──
    {
      properties: {
        type: SectionType.NEXT_PAGE,
        page: { size: pgSize, margin: pgMargin, pageNumbers: { start: 1, formatType: NumberFormat.DECIMAL } },
      },
      headers: { default: docHeader() },
      footers: { default: pageNumFooter() },
      children: [...c1.children, ...c2.children, ...c3.children, ...c4.children, ...c5.children],
    },
  ],
});

Packer.toBuffer(doc).then(buf => {
  fs.mkdirSync(path.dirname(OUT), { recursive: true });
  fs.writeFileSync(OUT, buf);
  console.log("Wrote", OUT, (buf.length / 1024).toFixed(1) + " KB");
}).catch(err => { console.error(err); process.exit(1); });
