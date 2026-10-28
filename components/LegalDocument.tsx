import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { Icon } from '@/components/Icon';
import { legal } from '@/content/en';
import { parseLegal } from '@/lib/legal';

export async function LegalDocument({ file, title }: { file: 'privacy' | 'terms'; title: string }) {
  const source = await readFile(path.join(process.cwd(), 'content/legal', `${file}.md`), 'utf8');
  const blocks = parseLegal(source);
  const headings = blocks.flatMap((block) => (block.kind === 'heading' ? [block] : []));

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
          <div className="ws-draft">
            <Icon name="info" size={20} />
            {legal.draft.replace('{file}', `content/legal/${file}.md`)}
          </div>
          {blocks.map((block, index) => {
            if (block.kind === 'heading') {
              return (
                <h2 key={block.id} id={block.id}>
                  {block.text}
                </h2>
              );
            }
            if (block.kind === 'list') {
              return (
                <ul key={index}>
                  {block.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              );
            }
            return <p key={index}>{block.text}</p>;
          })}
        </article>
      </div>
    </main>
  );
}
