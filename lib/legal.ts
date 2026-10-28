export type LegalBlock =
  | { kind: 'heading'; id: string; text: string }
  | { kind: 'paragraph'; text: string }
  | { kind: 'list'; items: string[] };

function slug(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

export function parseLegal(source: string): LegalBlock[] {
  const blocks: LegalBlock[] = [];
  const paragraph: string[] = [];
  let list: string[] | null = null;

  const flushParagraph = () => {
    if (paragraph.length === 0) return;
    blocks.push({ kind: 'paragraph', text: paragraph.join(' ') });
    paragraph.length = 0;
  };

  const flushList = () => {
    if (!list) return;
    blocks.push({ kind: 'list', items: list });
    list = null;
  };

  for (const raw of source.replace(/\r\n/g, '\n').split('\n')) {
    const line = raw.trim();
    if (line.startsWith('<!--')) continue;
    if (!line) {
      flushParagraph();
      flushList();
      continue;
    }
    if (line.startsWith('# ')) continue;
    if (line.startsWith('## ')) {
      flushParagraph();
      flushList();
      const text = line.slice(3).trim();
      blocks.push({ kind: 'heading', id: slug(text), text });
      continue;
    }
    if (line.startsWith('- ')) {
      flushParagraph();
      list ??= [];
      list.push(line.slice(2).trim());
      continue;
    }
    flushList();
    paragraph.push(line);
  }

  flushParagraph();
  flushList();
  return blocks;
}
