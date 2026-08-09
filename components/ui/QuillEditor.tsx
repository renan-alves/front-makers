'use client';

import { useEffect, useRef, useState } from 'react';
import 'quill/dist/quill.snow.css';

interface QuillEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function QuillEditor({ value, onChange, placeholder }: QuillEditorProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const quillRef = useRef<any>(null);
  const [ready, setReady] = useState(false);
  const isUpdatingRef = useRef(false);
  const onChangeRef = useRef(onChange);

  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  useEffect(() => {
    if (typeof window === 'undefined' || !containerRef.current) {
      return;
    }

    let isMounted = true;

    import('quill').then((module) => {
      if (!isMounted || !containerRef.current || quillRef.current) {
        return;
      }

      const Quill = module.default;
      const editor = new Quill(containerRef.current, {
        theme: 'snow',
        placeholder,
        modules: {
          toolbar: [
            [{ header: [1, 2, 3, false] }],
            ['bold', 'italic', 'underline'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['blockquote', 'code-block'],
            ['link'],
          ],
        },
      });

      editor.root.innerHTML = value || '';

      const handleTextChange = () => {
        isUpdatingRef.current = true;
        onChangeRef.current(editor.root.innerHTML);
      };

      editor.on('text-change', handleTextChange);
      quillRef.current = editor;
      setReady(true);
    });

    return () => {
      isMounted = false;
      if (quillRef.current) {
        quillRef.current.off?.('text-change');
        if (typeof quillRef.current.destroy === 'function') {
          quillRef.current.destroy();
        }
        quillRef.current = null;
      }
      setReady(false);
    };
  }, [placeholder]);

  useEffect(() => {
    if (!quillRef.current || !ready || isUpdatingRef.current) {
      isUpdatingRef.current = false;
      return;
    }

    const current = quillRef.current.root.innerHTML;
    if (current !== value) {
      quillRef.current.clipboard.dangerouslyPasteHTML(value || '');
    }
  }, [value, ready]);

  return <div ref={containerRef} className="min-h-[240px]" />;
}
