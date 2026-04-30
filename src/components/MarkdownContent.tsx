import Link from '@/components/Link';
import type { ReactNode } from 'react';

function renderInline(text: string, keyPrefix: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  const pattern = /(\[([^\]]+)\]\(([^)]+)\)|`([^`]+)`|\*\*([^*]+)\*\*|\*([^*]+)\*)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }

    const key = `${keyPrefix}-${match.index}`;
    if (match[2] && match[3]) {
      const href = match[3];
      nodes.push(
        href.startsWith('/') ? (
          <Link key={key} href={href}>
            {match[2]}
          </Link>
        ) : (
          <a key={key} href={href} target="_blank" rel="noopener noreferrer">
            {match[2]}
          </a>
        ),
      );
    } else if (match[4]) {
      nodes.push(<code key={key}>{match[4]}</code>);
    } else if (match[5]) {
      nodes.push(<strong key={key}>{match[5]}</strong>);
    } else if (match[6]) {
      nodes.push(<em key={key}>{match[6]}</em>);
    }

    lastIndex = pattern.lastIndex;
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }

  return nodes;
}

function normalizedText(block: string) {
  return block
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .join(' ');
}

export default function MarkdownContent({ content }: { content: string }) {
  const blocks = content
    .replace(/\r\n/g, '\n')
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .filter(Boolean);

  return (
    <>
      {blocks.map((block, index) => {
        if (/^-{3,}$/.test(block)) {
          return <hr key={index} />;
        }

        if (block.startsWith('### ')) {
          return <h3 key={index}>{renderInline(block.slice(4).trim(), `h3-${index}`)}</h3>;
        }

        if (block.startsWith('## ')) {
          return <h2 key={index}>{renderInline(block.slice(3).trim(), `h2-${index}`)}</h2>;
        }

        if (block.startsWith('# ')) {
          return <h1 key={index}>{renderInline(block.slice(2).trim(), `h1-${index}`)}</h1>;
        }

        if (/^>\s?/m.test(block)) {
          const quote = block
            .split('\n')
            .map((line) => line.replace(/^>\s?/, '').trim())
            .filter(Boolean)
            .join(' ');

          return <blockquote key={index}>{renderInline(quote, `blockquote-${index}`)}</blockquote>;
        }

        if (/^[-*]\s+/m.test(block)) {
          const items = block
            .split('\n')
            .map((line) => line.replace(/^[-*]\s+/, '').trim())
            .filter(Boolean);

          return (
            <ul key={index}>
              {items.map((item, itemIndex) => (
                <li key={itemIndex}>{renderInline(item, `ul-${index}-${itemIndex}`)}</li>
              ))}
            </ul>
          );
        }

        if (/^\d+\.\s+/m.test(block)) {
          const items = block
            .split('\n')
            .map((line) => line.replace(/^\d+\.\s+/, '').trim())
            .filter(Boolean);

          return (
            <ol key={index}>
              {items.map((item, itemIndex) => (
                <li key={itemIndex}>{renderInline(item, `ol-${index}-${itemIndex}`)}</li>
              ))}
            </ol>
          );
        }

        return <p key={index}>{renderInline(normalizedText(block), `p-${index}`)}</p>;
      })}
    </>
  );
}
