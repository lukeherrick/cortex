import type { ReactNode } from 'react';

/**
 * A small Markdown renderer for authored topic notes.
 *
 * Deliberately not a dependency and deliberately not `dangerouslySetInnerHTML`:
 * it builds React elements directly, so nothing in the content can ever become
 * markup. It supports exactly the subset the content actually uses — headings,
 * paragraphs, bold, italic, inline code, links, bullet and numbered lists,
 * blockquotes, tables and rules. Anything else renders as plain text rather
 * than breaking.
 */

const INLINE =
  /(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g;

/** Parse bold, italic, code and links inside a single line of text. */
export function inline(text: string): ReactNode[] {
  const out: ReactNode[] = [];
  const parts = text.split(INLINE);

  parts.forEach((part, i) => {
    if (part === '') return;

    if (part.startsWith('**') && part.endsWith('**')) {
      out.push(<strong key={i}>{part.slice(2, -2)}</strong>);
      return;
    }
    if (part.startsWith('`') && part.endsWith('`')) {
      out.push(<code key={i}>{part.slice(1, -1)}</code>);
      return;
    }
    if (part.startsWith('*') && part.endsWith('*')) {
      out.push(<em key={i}>{part.slice(1, -1)}</em>);
      return;
    }
    const link = /^\[([^\]]+)\]\(([^)]+)\)$/.exec(part);
    if (link) {
      out.push(
        <a key={i} href={link[2]} target="_blank" rel="noreferrer">
          {link[1]}
        </a>,
      );
      return;
    }
    out.push(part);
  });

  return out;
}

function tableRow(line: string): string[] {
  return line
    .replace(/^\s*\|/, '')
    .replace(/\|\s*$/, '')
    .split('|')
    .map((c) => c.trim());
}

const isTableDivider = (line: string): boolean =>
  /^\s*\|?[\s:-]*-[\s|:-]*$/.test(line) && line.includes('-');

/** Turn an authored topic body into React elements. */
export function renderMarkdown(source: string): ReactNode[] {
  const lines = source.replace(/\r\n/g, '\n').split('\n');
  const out: ReactNode[] = [];
  let i = 0;
  let key = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (line.trim() === '') {
      i += 1;
      continue;
    }

    // horizontal rule
    if (/^\s*(-{3,}|_{3,}|\*{3,})\s*$/.test(line)) {
      out.push(<hr key={key++} />);
      i += 1;
      continue;
    }

    // heading
    const heading = /^(#{1,4})\s+(.*)$/.exec(line);
    if (heading) {
      const text = inline(heading[2]);
      const level = heading[1].length;
      if (level <= 2) out.push(<h3 key={key++}>{text}</h3>);
      else if (level === 3) out.push(<h4 key={key++}>{text}</h4>);
      else out.push(<h5 key={key++}>{text}</h5>);
      i += 1;
      continue;
    }

    // table
    if (line.trim().startsWith('|') && isTableDivider(lines[i + 1] ?? '')) {
      const header = tableRow(line);
      i += 2;
      const rows: string[][] = [];
      while (i < lines.length && lines[i].trim().startsWith('|')) {
        rows.push(tableRow(lines[i]));
        i += 1;
      }
      out.push(
        <div className="table-wrap" key={key++}>
          <table>
            <thead>
              <tr>
                {header.map((cell, c) => (
                  <th key={c}>{inline(cell)}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, r) => (
                <tr key={r}>
                  {row.map((cell, c) => (
                    <td key={c}>{inline(cell)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>,
      );
      continue;
    }

    // blockquote — consecutive "> " lines join into one
    if (/^\s*>\s?/.test(line)) {
      const buf: string[] = [];
      while (i < lines.length && /^\s*>\s?/.test(lines[i])) {
        buf.push(lines[i].replace(/^\s*>\s?/, '').trim());
        i += 1;
      }
      out.push(<blockquote key={key++}>{inline(buf.join(' '))}</blockquote>);
      continue;
    }

    // lists — a following indented line continues the current item
    const bullet = /^\s*[-*]\s+(.*)$/.exec(line);
    const numbered = /^\s*\d+\.\s+(.*)$/.exec(line);
    if (bullet || numbered) {
      const ordered = numbered !== null;
      const pattern = ordered ? /^\s*\d+\.\s+(.*)$/ : /^\s*[-*]\s+(.*)$/;
      const items: string[] = [];

      while (i < lines.length) {
        const match = pattern.exec(lines[i]);
        if (match) {
          items.push(match[1]);
          i += 1;
          continue;
        }
        // continuation of the previous item
        if (/^\s{2,}\S/.test(lines[i]) && items.length > 0) {
          items[items.length - 1] += ` ${lines[i].trim()}`;
          i += 1;
          continue;
        }
        break;
      }

      const children = items.map((item, n) => <li key={n}>{inline(item)}</li>);
      out.push(
        ordered ? <ol key={key++}>{children}</ol> : <ul key={key++}>{children}</ul>,
      );
      continue;
    }

    // paragraph — consecutive plain lines join
    const buf: string[] = [];
    while (
      i < lines.length &&
      lines[i].trim() !== '' &&
      !/^\s*(>|[-*]\s|\d+\.\s|#{1,4}\s|\|)/.test(lines[i]) &&
      !/^\s*(-{3,}|_{3,}|\*{3,})\s*$/.test(lines[i])
    ) {
      buf.push(lines[i].trim());
      i += 1;
    }
    if (buf.length > 0) {
      out.push(<p key={key++}>{inline(buf.join(' '))}</p>);
      continue;
    }

    i += 1;
  }

  return out;
}

export default function Markdown({ source }: { source: string }) {
  return <div className="prose">{renderMarkdown(source)}</div>;
}
