export type LegalBlock =
  | { kind: 'heading'; id: string; level: 2 | 3; text: string }
  | { kind: 'paragraph'; text: string }
  | { kind: 'list'; items: string[] }
  | { kind: 'table'; headers: string[]; rows: string[][] };

function slug(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function cells(line: string) {
  return line
    .replace(/^\|/, '')
    .replace(/\|$/, '')
    .split('|')
    .map((cell) => cell.trim());
}

function isRule(line: string) {
  return cells(line).every((cell) => /^:?-{3,}:?$/.test(cell));
}

export function parseLegal(source: string): LegalBlock[] {
  const blocks: LegalBlock[] = [];
  const paragraph: string[] = [];
  let list: string[] | null = null;
  let table: string[] | null = null;

  const flushParagraph = () => {
    if (paragraph.length === 0) return;
    blocks.push({ kind: 'paragraph', text: paragraph.join('\n') });
    paragraph.length = 0;
  };

  const flushList = () => {
    if (!list) return;
    blocks.push({ kind: 'list', items: list });
    list = null;
  };

  const flushTable = () => {
    if (!table) return;
    const rows = table.filter((line) => !isRule(line)).map(cells);
    table = null;
    const [headers, ...body] = rows;
    if (!headers || body.length === 0) return;
    blocks.push({ kind: 'table', headers, rows: body });
  };

  const flush = () => {
    flushParagraph();
    flushList();
    flushTable();
  };

  for (const raw of source.replace(/\r\n/g, '\n').split('\n')) {
    const line = raw.trim();
    if (line.startsWith('<!--')) continue;
    if (!line) {
      flush();
      continue;
    }
    if (line.startsWith('# ')) continue;
    if (line.startsWith('|')) {
      flushParagraph();
      flushList();
      table ??= [];
      table.push(line);
      continue;
    }
    if (line.startsWith('### ')) {
      flush();
      const text = line.slice(4).trim();
      blocks.push({ kind: 'heading', id: slug(text), level: 3, text });
      continue;
    }
    if (line.startsWith('## ')) {
      flush();
      const text = line.slice(3).trim();
      blocks.push({ kind: 'heading', id: slug(text), level: 2, text });
      continue;
    }
    if (line.startsWith('- ')) {
      flushParagraph();
      flushTable();
      list ??= [];
      list.push(line.slice(2).trim());
      continue;
    }
    flushList();
    flushTable();
    paragraph.push(line);
  }

  flush();
  return blocks;
}
