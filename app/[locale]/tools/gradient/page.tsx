'use client';

import { useState } from 'react';
import Link from 'next/link';
import AdBanner from '@/components/ads/AdBanner';

/**
 * Gradient Generator Tool
 * Ferramenta para gerar gradientes CSS com preview em tempo real
 */
export default function GradientTool() {
  const [color1, setColor1] = useState('#2563EB');
  const [color2, setColor2] = useState('#7C3AED');
  const [direction, setDirection] = useState('to right');
  const [copied, setCopied] = useState(false);

  const directions = [
    { value: 'to right', label: '→ Horizontal' },
    { value: 'to left', label: '← Reverso' },
    { value: 'to bottom', label: '↓ Vertical' },
    { value: 'to top', label: '↑ Vertical Reverso' },
    { value: 'to bottom right', label: '↘ Diagonal' },
    { value: 'to bottom left', label: '↙ Diagonal Esquerda' },
    { value: 'to top right', label: '↗ Diagonal Superior' },
    { value: 'to top left', label: '↖ Diagonal Superior Esquerda' },
  ];

  // Gera o código CSS
  const generateCSS = () => {
    return `background: linear-gradient(${direction}, ${color1}, ${color2});`;
  };

  // Copia para clipboard
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generateCSS());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Erro ao copiar:', err);
    }
  };

  const cssCode = generateCSS();

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
              <li className="text-primary font-semibold">Gradient Generator</li>
            </ol>
          </nav>

          <div className="max-w-3xl">
            <div className="text-4xl mb-4">🌈</div>
            <h1 className="mb-4">Gradient Generator</h1>
            <p className="text-xl text-secondary">
              Crie gradientes CSS lindos escolhendo cores e direção.
              Visualize em tempo real e copie o código pronto.
            </p>
          </div>
        </div>
      </section>

      {/* Tool */}
      <section className="container-grid py-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Controls */}
            <div className="card space-y-6">
              <h2 className="text-2xl font-bold">Controles</h2>

              {/* Color 1 */}
              <div>
                <label className="label">Cor Inicial</label>
                <div className="flex gap-4">
                  <input
                    type="color"
                    value={color1}
                    onChange={(e) => setColor1(e.target.value)}
                    className="w-20 h-12 rounded-lg cursor-pointer"
                  />
                  <input
                    type="text"
                    value={color1}
                    onChange={(e) => setColor1(e.target.value)}
                    className="input flex-1 font-mono"
                    placeholder="#2563EB"
                  />
                </div>
              </div>

              {/* Color 2 */}
              <div>
                <label className="label">Cor Final</label>
                <div className="flex gap-4">
                  <input
                    type="color"
                    value={color2}
                    onChange={(e) => setColor2(e.target.value)}
                    className="w-20 h-12 rounded-lg cursor-pointer"
                  />
                  <input
                    type="text"
                    value={color2}
                    onChange={(e) => setColor2(e.target.value)}
                    className="input flex-1 font-mono"
                    placeholder="#7C3AED"
                  />
                </div>
              </div>

              {/* Direction */}
              <div>
                <label className="label">Direção</label>
                <div className="grid grid-cols-2 gap-3">
                  {directions.map((dir) => (
                    <button
                      key={dir.value}
                      onClick={() => setDirection(dir.value)}
                      className={`px-4 py-3 rounded-lg border-2 transition-all text-left ${
                        direction === dir.value
                          ? 'border-[var(--color-primary)] bg-[var(--color-primary)] bg-opacity-5 text-[var(--color-primary)] font-semibold'
                          : 'border-light hover:border-[var(--color-primary)]'
                      }`}
                    >
                      {dir.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Presets */}
              <div>
                <label className="label">Combinações Populares</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => {
                      setColor1('#667EEA');
                      setColor2('#764BA2');
                    }}
                    className="h-12 rounded-lg"
                    style={{
                      background: 'linear-gradient(to right, #667EEA, #764BA2)',
                    }}
                  />
                  <button
                    onClick={() => {
                      setColor1('#F093FB');
                      setColor2('#F5576C');
                    }}
                    className="h-12 rounded-lg"
                    style={{
                      background: 'linear-gradient(to right, #F093FB, #F5576C)',
                    }}
                  />
                  <button
                    onClick={() => {
                      setColor1('#4FACFE');
                      setColor2('#00F2FE');
                    }}
                    className="h-12 rounded-lg"
                    style={{
                      background: 'linear-gradient(to right, #4FACFE, #00F2FE)',
                    }}
                  />
                  <button
                    onClick={() => {
                      setColor1('#43E97B');
                      setColor2('#38F9D7');
                    }}
                    className="h-12 rounded-lg"
                    style={{
                      background: 'linear-gradient(to right, #43E97B, #38F9D7)',
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Preview */}
            <div className="space-y-6">
              <div className="card">
                <h2 className="text-2xl font-bold mb-6">Preview</h2>
                <div
                  className="rounded-xl min-h-[400px] w-full"
                  style={{
                    background: `linear-gradient(${direction}, ${color1}, ${color2})`,
                  }}
                />
              </div>

              {/* Code Output */}
              <div className="card">
                <h2 className="text-2xl font-bold mb-4">Código CSS</h2>
                <div className="bg-neutral-900 text-neutral-50 p-6 rounded-lg font-mono text-sm overflow-x-auto">
                  <code>{cssCode}</code>
                </div>
                <button
                  onClick={copyToClipboard}
                  className="btn-primary w-full mt-4"
                >
                  {copied ? '✓ Copiado!' : 'Copiar Código'}
                </button>
              </div>
            </div>
          </div>

          {/* Tips */}
          <div className="mt-12 card bg-neutral-50 border-2 border-[var(--color-border)]">
            <h3 className="text-xl font-bold mb-4">💡 Dicas de Uso</h3>
            <ul className="space-y-2 text-secondary">
              <li>
                • <strong>Contraste:</strong> Use cores com contraste adequado
                para garantir legibilidade
              </li>
              <li>
                • <strong>Mais cores:</strong> Adicione mais cores no CSS
                separando por vírgula
              </li>
              <li>
                • <strong>Radial:</strong> Use radial-gradient para gradientes
                circulares
              </li>
              <li>
                • <strong>Posições:</strong> Adicione percentuais para
                controlar onde as cores começam
              </li>
              <li>
                • <strong>Exemplo:</strong> linear-gradient(to right, #fff 0%,
                #000 50%, #fff 100%)
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
