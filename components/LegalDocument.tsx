import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { Icon } from '@/components/Icon';
import { legal } from '@/content/en';
import { parseLegal } from '@/lib/legal';

function Rich({ text }: { text: string }) {
  const chunks = text.split(/(\*\*[^*]+\*\*|\n)/).filter((chunk) => chunk.length > 0);
  return chunks.map((chunk, index) => {
    if (chunk === '\n') return <br key={index} />;
    if (chunk.startsWith('**') && chunk.endsWith('**')) return <strong key={index}>{chunk.slice(2, -2)}</strong>;
    return <span key={index}>{chunk}</span>;
  });
}

export async function LegalDocument({
  file,
  title,
  draft = true,
}: {
  file: 'privacy' | 'terms';
  title: string;
  draft?: boolean;
}) {
  const source = await readFile(path.join(process.cwd(), 'content/legal', `${file}.md`), 'utf8');
  const blocks = parseLegal(source);
  const headings = blocks.flatMap((block) => (block.kind === 'heading' && block.level === 2 ? [block] : []));

  return (
    <main>
      <div className="ws-wrap ws-legal">
        <nav className="ws-toc" aria-label={legal.onThisPage}>
          {headings.map((heading) => (
            <a key={heading.id} href={`#${heading.id}`}>
              {heading.text}
            </a>
          ))}
        </nav>
        <article className="ws-prose">
          <p className="ws-label">{legal.label}</p>
          <h1 className="ws-h2">{title}</h1>
          <p className="ws-small">{legal.updated.replace('{date}', '28 October 2026')}</p>
          {draft ? (
            <div className="ws-draft">
              <Icon name="info" size={20} />
              {legal.draft.replace('{file}', `content/legal/${file}.md`)}
            </div>
          ) : null}
          {blocks.map((block, index) => {
            if (block.kind === 'heading') {
              const Tag = block.level === 3 ? 'h3' : 'h2';
              return (
                <Tag key={block.id} id={block.id}>
                  {block.text}
                </Tag>
              );
            }
            if (block.kind === 'list') {
              return (
                <ul key={index}>
                  {block.items.map((item) => (
                    <li key={item}>
                      <Rich text={item} />
                    </li>
                  ))}
                </ul>
              );
            }
            if (block.kind === 'table') {
              return (
                <div key={index} className="ws-table">
                  <table>
                    <thead>
                      <tr>
                        {block.headers.map((header) => (
                          <th key={header} scope="col">
                            <Rich text={header} />
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {block.rows.map((row) => (
                        <tr key={row[0]}>
                          {row.map((cell, cellIndex) => (
                            <td key={`${row[0]}-${cellIndex}`} data-label={block.headers[cellIndex]}>
                              <Rich text={cell} />
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              );
            }
            return (
              <p key={index}>
                <Rich text={block.text} />
              </p>
            );
          })}
        </article>
      </div>
    </main>
  );
}
