'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import AdBanner from '@/components/ads/AdBanner';

/**
 * PX to REM Converter Tool
 * Ferramenta para converter pixels para REM
 */
export default function PxRemTool() {
  const [px, setPx] = useState<string>('16');
  const [base, setBase] = useState<string>('16');
  const [rem, setRem] = useState<string>('1');
  const [copied, setCopied] = useState(false);

  // Calcula REM
  useEffect(() => {
    const pxValue = parseFloat(px);
    const baseValue = parseFloat(base);

    if (!isNaN(pxValue) && !isNaN(baseValue) && baseValue > 0) {
      const remValue = pxValue / baseValue;
      setRem(remValue.toFixed(4));
    } else {
      setRem('0');
    }
  }, [px, base]);

  // Copia para clipboard
  const copyToClipboard = async (value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Erro ao copiar:', err);
    }
  };

  // Common values
  const commonSizes = [
    { px: 8, label: 'Extra Small' },
    { px: 12, label: 'Small' },
    { px: 14, label: 'Body' },
    { px: 16, label: 'Base' },
    { px: 18, label: 'Large' },
    { px: 20, label: 'XL' },
    { px: 24, label: 'Heading' },
    { px: 32, label: '2XL' },
    { px: 48, label: '3XL' },
  ];

  return (
    <div className="min-h-screen bg-secondary">
      {/* Header */}
      <section className="bg-primary border-b border-light py-12">
        <div className="container-grid">
          <nav className="mb-6">
            <ol className="flex items-center gap-2 text-sm text-secondary">
              <li>
                <Link
                  href="/"
                  className="hover:text-[var(--color-primary)] transition-colors"
                >
                  Início
                </Link>
              </li>
              <li>→</li>
              <li>
                <Link
                  href="/tools"
                  className="hover:text-[var(--color-primary)] transition-colors"
                >
                  Ferramentas
                </Link>
              </li>
              <li>→</li>
              <li className="text-primary font-semibold">Conversor PX → REM</li>
            </ol>
          </nav>

          <div className="max-w-3xl">
            <div className="text-4xl mb-4">📏</div>
            <h1 className="mb-4">Conversor PX → REM</h1>
            <p className="text-xl text-secondary">
              Converta pixels para REM facilmente. Configure a base customizada
              e crie designs responsivos e acessíveis.
            </p>
          </div>
        </div>
      </section>

      {/* Tool */}
      <section className="container-grid py-12">
        <div className="max-w-4xl mx-auto">
          {/* Converter */}
          <div className="card mb-8">
            <h2 className="text-2xl font-bold mb-6">Conversor</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {/* PX Input */}
              <div>
                <label className="label">Pixels (px)</label>
                <div className="relative">
                  <input
                    type="number"
                    value={px}
                    onChange={(e) => setPx(e.target.value)}
                    className="input pr-12 text-2xl font-mono"
                    placeholder="16"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-secondary font-mono">
                    px
                  </span>
                </div>
              </div>

              {/* Base Input */}
              <div>
                <label className="label">Base (px)</label>
                <div className="relative">
                  <input
                    type="number"
                    value={base}
                    onChange={(e) => setBase(e.target.value)}
                    className="input pr-12 text-2xl font-mono"
                    placeholder="16"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-secondary font-mono">
                    px
                  </span>
                </div>
              </div>

              {/* REM Output */}
              <div>
                <label className="label">Resultado (rem)</label>
                <div className="relative">
                  <input
                    type="text"
                    value={rem}
                    readOnly
                    className="input pr-12 text-2xl font-mono bg-neutral-50 text-[var(--color-primary)] font-bold border-2 border-[var(--color-primary)]"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--color-primary)] font-mono font-bold">
                    rem
                  </span>
                </div>
              </div>
            </div>

            {/* Copy Buttons */}
            <div className="flex gap-4">
              <button
                onClick={() => copyToClipboard(rem)}
                className="btn-primary flex-1"
              >
                {copied ? '✓ Copiado!' : `Copiar "${rem}rem"`}
              </button>
              <button
                onClick={() => copyToClipboard(`${rem}rem`)}
                className="btn-secondary flex-1"
              >
                Copiar com unidade
              </button>
            </div>
          </div>

          {/* Common Sizes */}
          <div className="card mb-8">
            <h2 className="text-2xl font-bold mb-6">Tamanhos Comuns</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-light">
                    <th className="text-left py-3 px-4 text-secondary font-medium">
                      Uso
                    </th>
                    <th className="text-left py-3 px-4 text-secondary font-medium">
                      Pixels
                    </th>
                    <th className="text-left py-3 px-4 text-secondary font-medium">
                      REM (base {base}px)
                    </th>
                    <th className="text-right py-3 px-4 text-secondary font-medium">
                      Ação
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {commonSizes.map((size) => {
                    const remValue = (
                      size.px / parseFloat(base || '16')
                    ).toFixed(4);
                    return (
                      <tr
                        key={size.px}
                        className="border-b border-light hover:bg-neutral-50 transition-colors"
                      >
                        <td className="py-3 px-4 text-secondary">
                          {size.label}
                        </td>
                        <td className="py-3 px-4 font-mono">{size.px}px</td>
                        <td className="py-3 px-4 font-mono text-[var(--color-primary)] font-semibold">
                          {remValue}rem
                        </td>
                        <td className="py-3 px-4 text-right">
                          <button
                            onClick={() => {
                              setPx(size.px.toString());
                            }}
                            className="text-[var(--color-primary)] hover:text-[var(--color-primary-dark)] text-sm font-semibold"
                          >
                            Usar →
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Why REM */}
            <div className="card bg-neutral-50 border-2 border-[var(--color-border)]">
              <h3 className="text-xl font-bold mb-3">Por que usar REM?</h3>
              <ul className="space-y-2 text-secondary text-sm">
                <li>✓ Respeita preferências de tamanho de fonte do usuário</li>
                <li>✓ Melhor acessibilidade</li>
                <li>✓ Escalabilidade consistente</li>
                <li>✓ Design responsivo mais fácil</li>
              </ul>
            </div>

            {/* Formula */}
            <div className="card bg-neutral-50">
              <h3 className="text-xl font-bold mb-3">Fórmula</h3>
              <div className="font-mono text-sm bg-primary p-4 rounded-lg mb-3">
                rem = px ÷ base
              </div>
              <p className="text-secondary text-sm">
                A base padrão dos navegadores é geralmente 16px. Usuários podem
                ajustar isso nas configurações do navegador.
              </p>
            </div>
          </div>

          {/* Tips */}
          <div className="card bg-neutral-50 border-2 border-[var(--color-border)]">
            <h3 className="text-xl font-bold mb-4">💡 Melhores Práticas</h3>
            <ul className="space-y-2 text-secondary">
              <li>
                • <strong>Tipografia:</strong> Use REM para tamanhos de fonte,
                line-height e espaçamentos
              </li>
              <li>
                • <strong>Media queries:</strong> Use EM para breakpoints (1em
                = 16px default)
              </li>
              <li>
                • <strong>Bordas:</strong> Use PX para bordas finas (1px, 2px)
              </li>
              <li>
                • <strong>Não redefina html base:</strong> Evite html
                {'{'}font-size: 62.5%{'}'} - dificulta acessibilidade
              </li>
              <li>
                • <strong>Consistência:</strong> Defina uma escala de tamanhos
                e use em todo projeto
              </li>
            </ul>
          </div>

          {/* Ad Banner */}
          <div className="mt-12">
            <AdBanner slot="tool-end" />
          </div>
        </div>
      </section>
    </div>
  );
}
