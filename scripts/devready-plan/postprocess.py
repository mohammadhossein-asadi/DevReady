#!/usr/bin/env python3
"""postprocess.py — WPS/Word compatibility patches per toc.md:
1. Remove empty <w:pgNumType/> emitted for the cover section.
2. Patch footer PAGE fields with explicit format switches:
   - section fmt=upperRoman -> 'PAGE \\* ROMAN \\* MERGEFORMAT'
   - section fmt=decimal    -> 'PAGE \\* arabic \\* MERGEFORMAT'
Footer files are resolved per-section via footerReference r:id -> document.xml.rels.
"""
import re
import shutil
import sys
import zipfile
from pathlib import Path

SRC = Path(sys.argv[1])
TMP = SRC.with_suffix(".tmp.docx")


def main() -> int:
    with zipfile.ZipFile(SRC) as z:
        names = z.namelist()
        files = {n: z.read(n) for n in names}

    doc = files["word/document.xml"].decode("utf-8")

    # 1. strip empty pgNumType (confuses WPS on the cover section)
    doc, n_removed = re.subn(r"<w:pgNumType/>", "", doc)

    # 2. map each sectPr's page-number format to its footer file
    rels = files["word/_rels/document.xml.rels"].decode("utf-8")
    rid_to_target = dict(re.findall(r'<Relationship[^>]*Id="([^"]+)"[^>]*Target="([^"]+)"', rels))

    patched = []  # (footer file, fmt)
    for sect in re.findall(r"<w:sectPr[^>]*>.*?</w:sectPr>", doc, flags=re.S):
        m_fmt = re.search(r'<w:pgNumType[^>]*w:fmt="([^"]+)"', sect)
        if not m_fmt:
            continue
        fmt = m_fmt.group(1)
        for rid in re.findall(r'<w:footerReference[^>]*r:id="([^"]+)"', sect):
            target = rid_to_target.get(rid, "")
            fname = "word/" + target.lstrip("/")
            if fname in files and fname.endswith(".xml"):
                patched.append((fname, fmt))

    def patch_footer(xml: str, fmt: str) -> str:
        switch = "ROMAN" if "oman" in fmt.lower() or fmt == "upperRoman" else "arabic"
        return re.sub(
            r"(<w:instrText[^>]*>)\s*PAGE\s*(</w:instrText>)",
            lambda m: m.group(1) + " PAGE \\* " + switch + " \\* MERGEFORMAT " + m.group(2),
            xml,
        )

    seen = {}
    for fname, fmt in patched:
        seen[fname] = fmt  # last fmt wins if a footer is shared (should not happen)
    for fname, fmt in seen.items():
        files[fname] = patch_footer(files[fname].decode("utf-8"), fmt).encode("utf-8")
        print(f"patched {fname} -> {fmt}")

    files["word/document.xml"] = doc.encode("utf-8")

    with zipfile.ZipFile(TMP, "w", zipfile.ZIP_DEFLATED) as z:
        for n in names:
            z.writestr(n, files[n])
    shutil.move(TMP, SRC)
    print(f"OK: removed {n_removed} empty pgNumType; patched {len(seen)} footer(s); rewrote {SRC.name}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
