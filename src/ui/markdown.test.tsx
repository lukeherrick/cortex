import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { loadBundle } from '@/content';
import Markdown from '@/ui/markdown';

afterEach(cleanup);

describe('Markdown — blocks', () => {
  it('renders a paragraph, joining wrapped lines', () => {
    render(<Markdown source={'one line\nand its wrap'} />);
    expect(screen.getByText('one line and its wrap')).toBeDefined();
  });

  it('separates paragraphs on a blank line', () => {
    const { container } = render(<Markdown source={'first\n\nsecond'} />);
    expect(container.querySelectorAll('p')).toHaveLength(2);
  });

  it('renders headings', () => {
    const { container } = render(<Markdown source={'## Big\n\n### Small'} />);
    expect(container.querySelector('h3')?.textContent).toBe('Big');
    expect(container.querySelector('h4')?.textContent).toBe('Small');
  });

  it('renders a bullet list', () => {
    const { container } = render(<Markdown source={'- one\n- two\n- three'} />);
    expect(container.querySelectorAll('ul li')).toHaveLength(3);
  });

  it('joins an indented continuation into its list item', () => {
    const { container } = render(
      <Markdown source={'- first part\n  second part\n- next'} />,
    );
    const items = container.querySelectorAll('ul li');
    expect(items).toHaveLength(2);
    expect(items[0].textContent).toBe('first part second part');
  });

  it('renders a numbered list', () => {
    const { container } = render(<Markdown source={'1. one\n2. two'} />);
    expect(container.querySelectorAll('ol li')).toHaveLength(2);
  });

  it('renders a blockquote, joining its lines', () => {
    const { container } = render(<Markdown source={'> first\n> second'} />);
    expect(container.querySelector('blockquote')?.textContent).toBe(
      'first second',
    );
  });

  it('renders a horizontal rule', () => {
    const { container } = render(<Markdown source={'above\n\n---\n\nbelow'} />);
    expect(container.querySelectorAll('hr')).toHaveLength(1);
  });

  it('renders a table with header and body', () => {
    const { container } = render(
      <Markdown source={'| a | b |\n|---|---|\n| 1 | 2 |\n| 3 | 4 |'} />,
    );
    expect(container.querySelectorAll('thead th')).toHaveLength(2);
    expect(container.querySelectorAll('tbody tr')).toHaveLength(2);
    expect(container.querySelectorAll('tbody td')[3].textContent).toBe('4');
  });

  it('does not treat a lone pipe line as a table', () => {
    const { container } = render(<Markdown source={'| not a table'} />);
    expect(container.querySelector('table')).toBeNull();
  });
});

describe('Markdown — inline', () => {
  it('renders bold', () => {
    const { container } = render(<Markdown source={'a **bold** word'} />);
    expect(container.querySelector('strong')?.textContent).toBe('bold');
  });

  it('renders italic', () => {
    const { container } = render(<Markdown source={'an *italic* word'} />);
    expect(container.querySelector('em')?.textContent).toBe('italic');
  });

  it('renders inline code', () => {
    const { container } = render(<Markdown source={'use `psi` here'} />);
    expect(container.querySelector('code')?.textContent).toBe('psi');
  });

  it('renders a link that opens safely', () => {
    const { container } = render(
      <Markdown source={'see [docs](https://example.com)'} />,
    );
    const a = container.querySelector('a');
    expect(a?.getAttribute('href')).toBe('https://example.com');
    expect(a?.getAttribute('rel')).toBe('noreferrer');
  });

  it('leaves unmatched asterisks as plain text', () => {
    render(<Markdown source={'2 * 3 = 6'} />);
    expect(screen.getByText('2 * 3 = 6')).toBeDefined();
  });

  it('never produces raw markup from content', () => {
    const { container } = render(
      <Markdown source={'<script>alert(1)</script> and <b>bold</b>'} />,
    );
    expect(container.querySelector('script')).toBeNull();
    expect(container.querySelector('b')).toBeNull();
    expect(container.textContent).toContain('<script>alert(1)</script>');
  });
});

describe('Markdown — real content', () => {
  const bundle = loadBundle();

  it.each(bundle.topics.map((t) => [t.id, t.concept] as const))(
    'renders %s notes without crashing and with visible text',
    (_id, concept) => {
      const { container } = render(<Markdown source={concept} />);
      expect(container.textContent?.length ?? 0).toBeGreaterThan(100);
      // Nothing should leak through as an unrendered marker.
      expect(container.textContent).not.toMatch(/\*\*/);
    },
  );

  it('renders the tables that real topics use', () => {
    const respiration = bundle.topics.find(
      (t) => t.id === 'bio.energy.respiration',
    )!;
    const { container } = render(<Markdown source={respiration.concept} />);
    expect(container.querySelectorAll('table').length).toBeGreaterThan(0);
  });
});
