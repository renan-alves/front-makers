// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, waitFor } from '@testing-library/react';
import { QuillEditor } from './QuillEditor';

vi.mock('quill/dist/quill.snow.css', () => ({}));

class MockQuill {
  root: HTMLElement;
  private handlers: Record<string, () => void> = {};
  clipboard = {
    dangerouslyPasteHTML: (html: string) => {
      this.root.innerHTML = html;
    },
  };

  constructor(container: HTMLElement) {
    this.root = document.createElement('div');
    container.appendChild(this.root);
    mockInstances.push(this);
  }

  on(event: string, handler: () => void) {
    this.handlers[event] = handler;
  }

  off(event: string) {
    delete this.handlers[event];
  }

  destroy() {}

  emitTextChange(html: string) {
    this.root.innerHTML = html;
    this.handlers['text-change']?.();
  }
}

let mockInstances: MockQuill[] = [];

vi.mock('quill', () => ({ default: MockQuill }));

beforeEach(() => {
  mockInstances = [];
});

describe('QuillEditor', () => {
  it('renders a container div and instantiates Quill once mounted', async () => {
    const { container } = render(<QuillEditor value="<p>Hello</p>" onChange={vi.fn()} />);

    expect(container.querySelector('div')).toBeInTheDocument();
    await waitFor(() => expect(mockInstances).toHaveLength(1));
    expect(mockInstances[0].root.innerHTML).toBe('<p>Hello</p>');
  });

  it('calls onChange with the editor HTML when a text-change event fires', async () => {
    const onChange = vi.fn();
    render(<QuillEditor value="" onChange={onChange} />);

    await waitFor(() => expect(mockInstances).toHaveLength(1));
    mockInstances[0].emitTextChange('<p>Updated</p>');

    expect(onChange).toHaveBeenCalledWith('<p>Updated</p>');
  });

  it('syncs external value changes into the editor after it is ready', async () => {
    const { rerender } = render(<QuillEditor value="<p>A</p>" onChange={vi.fn()} />);

    await waitFor(() => expect(mockInstances).toHaveLength(1));

    rerender(<QuillEditor value="<p>B</p>" onChange={vi.fn()} />);

    await waitFor(() => expect(mockInstances[0].root.innerHTML).toBe('<p>B</p>'));
  });
});
