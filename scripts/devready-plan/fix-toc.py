#!/usr/bin/env python3
"""fix-toc.py — repair the skill script's duplicated first TOC entry.
The add_toc_placeholders script embeds the first entry (hyperlink + empty PAGEREF)
inside the TOC field paragraph AND injects it again as a plain-text entry.
Fix: (1) split the merged PAGEREF field run and cache page number '1' as its result,
     (2) delete the immediately following duplicate plain-text paragraph.
"""
import re
import shutil
import sys
import zipfile
from pathlib import Path

SRC = Path(sys.argv[1])
TMP = SRC.with_suffix(".tmp2.docx")

with zipfile.ZipFile(SRC) as z:
    names = z.namelist()
    files = {n: z.read(n) for n in names}

doc = files["word/document.xml"].decode("utf-8")

# ── locate the TOC field paragraph: contains instrText starting with 'TOC' ──
m_field = re.search(
    r"<w:p\b(?:(?!</w:p>).)*?TOC \\h(?:(?!</w:p>).)*?</w:p>", doc, flags=re.S)
if not m_field:
    print("ERROR: TOC field paragraph not found"); sys.exit(1)
field_para = m_field.group(0)
assert "PAGEREF _Toc" in field_para, "first entry not embedded in field paragraph?"

# (1) split the merged PAGEREF single-run field and cache result '1'
#     before: <w:r>[begin][instrText PAGEREF _TocN \h][separate][end]</w:r>  (one run)
#     after:  <w:r>[begin][instrText][separate]</w:r><w:r>1</w:r><w:r>[end]</w:r>
RESULT_RUN = ('</w:r><w:r><w:rPr><w:noProof/></w:rPr><w:t>1</w:t></w:r>'
              '<w:r><w:fldChar w:fldCharType="end"/></w:r>')
patched_para, n = re.subn(
    r'(PAGEREF _Toc\d+ \\h</w:instrText><w:fldChar w:fldCharType="separate"/>)(<w:fldChar w:fldCharType="end"/></w:r>)',
    r'\1' + RESULT_RUN,
    field_para, count=1)
if n != 1:
    print("ERROR: merged PAGEREF field run not found"); sys.exit(1)

start, end = m_field.span()
doc = doc[:start] + patched_para + doc[end:]
end = start + len(patched_para)  # paragraph grew: recompute the boundary

# (2) remove the duplicate plain-text entry immediately after the field paragraph
m_dup = re.match(r"\s*<w:p\b(?:(?!</w:p>).)*?<w:t>1\. Executive Summary</w:t>(?:(?!</w:p>).)*?</w:p>", doc[end:], flags=re.S)
if not m_dup:
    print("ERROR: duplicate plain entry not found"); sys.exit(1)
dup = m_dup.group(0)
assert "hyperlink" not in dup and "PAGEREF" not in dup, "unexpected structure in duplicate"
doc = doc[:end] + doc[end + len(dup):]

# sanity: TOC field end fldChar still present after the entries
assert '<w:fldChar w:fldCharType="end"/>' in doc[end:end + 40000], "TOC field end lost"

files["word/document.xml"] = doc.encode("utf-8")
with zipfile.ZipFile(TMP, "w", zipfile.ZIP_DEFLATED) as z:
    for n2 in names:
        z.writestr(n2, files[n2])
shutil.move(TMP, SRC)
print("OK: PAGEREF split + cached '1'; duplicate first TOC entry removed")
