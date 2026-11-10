"""The manual's own words (lib/manual/text.ts) as Markdown for translators, and back.

    py -3.13 scripts/manual-text.py export OUT.md     # every text: en and ko filled, ja / zh-CN as translated so far
    py -3.13 scripts/manual-text.py import IN.md      # ja and zh-CN into lib/manual/text-i18n.json

The Markdown is the same shape as WHIK Studio's translation files: an id line, then en / ko / ja /
zh-CN lines. Markup inside the texts (**bold**, `code`, [[Key]], [label](/link), {n}) stays as it is.
"""

from __future__ import annotations

import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
TEXT = ROOT / "lib" / "manual" / "text.ts"
OUT = ROOT / "lib" / "manual" / "text-i18n.json"

HEADER = """# WHIK Studio 매뉴얼 페이지 번역 / マニュアルページ / 手册页面

- `<!-- id: ... -->` 줄과 `- en:`, `- ko:` 줄은 바꾸지 마세요. `ja:`, `zh-CN:` 뒤만 채우면 됩니다.
- `**굵게**`, `` `코드` ``, `[[키]]`, `[글자](/주소)`, `{n}` 같은 표시는 그대로 두고, 그 안의 글만 번역하세요. (링크 주소와 `{n}`은 그대로)
- 노드 이름(Read, Grade, Write 등), 단축키, 확장자는 그대로 둡니다.
- 비워 두면 그 언어에서는 영어로 나옵니다.

"""


def esc(s: str) -> str:
    return s.replace("\\", "\\\\").replace("\n", "\\n")


def unesc(s: str) -> str:
    return re.sub(r"\\(.)", lambda m: "\n" if m.group(1) == "n" else m.group(1), s)


def read_texts() -> dict[str, dict[str, str]]:
    """The entries of TEXT in text.ts: key -> {ko, en}."""
    src = TEXT.read_text(encoding="utf-8")
    body = src[src.index("export const TEXT = {"):src.index("} satisfies")]
    out: dict[str, dict[str, str]] = {}
    for m in re.finditer(r'"([^"]+)":\s*\{(.*?)\}\s*,', body, re.S):
        key, inner = m.group(1), m.group(2)
        entry = {}
        for lang in ("ko", "en"):
            mm = re.search(lang + r':\s*"((?:[^"\\]|\\.)*)"', inner, re.S)
            if mm:
                entry[lang] = json.loads('"' + mm.group(1) + '"')
        if "en" in entry:
            out[key] = entry
    return out


def export(path: Path) -> None:
    texts = read_texts()
    have = json.loads(OUT.read_text(encoding="utf-8")) if OUT.exists() else {}
    lines = [HEADER]
    section = None
    for key, t in texts.items():
        top = key.split(".")[0]
        if top != section:
            section = top
            lines.append(f"## {top}\n")
        h = have.get(key, {})
        lines.append(f"<!-- id: {key} -->\n- en: {esc(t['en'])}\n- ko: {esc(t.get('ko', ''))}\n- ja: {esc(h.get('ja', ''))}\n- zh-CN: {esc(h.get('zh', ''))}\n")
    path.write_text("\n".join(lines), encoding="utf-8")
    print(f"{len(texts)} texts -> {path}")


ENTRY = re.compile(r"<!-- id: (?P<id>[^>]+?) -->\s*\n- en: (?P<en>.*)\n- ko: ?(?P<ko>.*)\n- ja: ?(?P<ja>.*)\n- zh-CN: ?(?P<zh>.*)")


def do_import(path: Path) -> None:
    texts = read_texts()
    have = json.loads(OUT.read_text(encoding="utf-8")) if OUT.exists() else {}
    n = 0
    bad = []
    for m in ENTRY.finditer(path.read_text(encoding="utf-8").replace("\r\n", "\n")):
        key = m.group("id").strip()
        if key not in texts:
            continue
        en = texts[key]["en"]
        for lang in ("ja", "zh"):
            v = unesc(m.group(lang).strip())
            if not v:
                continue
            # the placeholders and links must survive
            for token in re.findall(r"\{\w+\}|\]\([^)]+\)", en):
                if token not in v:
                    bad.append(f"{key} ({lang}): {token} missing")
            have.setdefault(key, {})[lang] = v
            n += 1
    OUT.write_text(json.dumps(have, ensure_ascii=False, indent=1, sort_keys=True), encoding="utf-8")
    print(f"{n} translations in -> {OUT}")
    for b in bad:
        print("check:", b)


if __name__ == "__main__":
    cmd, arg = sys.argv[1], Path(sys.argv[2])
    export(arg) if cmd == "export" else do_import(arg)
