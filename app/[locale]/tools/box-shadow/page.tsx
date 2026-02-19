'use client';

import { useState } from 'react';
import Link from 'next/link';
import AdBanner from '@/components/ads/AdBanner';

/**
 * Box Shadow Generator Tool
 * Ferramenta para gerar box-shadow CSS com preview em tempo real
 */
export default function BoxShadowTool() {
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(10);
  const [blur, setBlur] = useState(20);
  const [spread, setSpread] = useState(0);
  const [color, setColor] = useState('#000000');
  const [opacity, setOpacity] = useState(0.3);
  const [copied, setCopied] = useState(false);

  // Gera o código CSS
  const generateCSS = () => {
    const rgbaColor = hexToRgba(color, opacity);
    return `box-shadow: ${offsetX}px ${offsetY}px ${blur}px ${spread}px ${rgbaColor};`;
  };

  // Converte hex para rgba
  const hexToRgba = (hex: string, alpha: number) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
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
              <li className="text-primary font-semibold">Box Shadow Generator</li>
            </ol>
          </nav>

          <div className="max-w-3xl">
            <div className="text-4xl mb-4">🎨</div>
            <h1 className="mb-4">Box Shadow Generator</h1>
            <p className="text-xl text-secondary">
              Crie sombras CSS perfeitas com preview em tempo real. Ajuste os
              valores e copie o código pronto para usar.
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

              {/* Offset X */}
              <div>
                <label className="label">
                  Offset X: <span className="font-mono">{offsetX}px</span>
                </label>
                <input
                  type="range"
                  min="-100"
                  max="100"
                  value={offsetX}
                  onChange={(e) => setOffsetX(Number(e.target.value))}
                  className="w-full"
                />
              </div>

              {/* Offset Y */}
              <div>
                <label className="label">
                  Offset Y: <span className="font-mono">{offsetY}px</span>
                </label>
                <input
                  type="range"
                  min="-100"
                  max="100"
                  value={offsetY}
                  onChange={(e) => setOffsetY(Number(e.target.value))}
                  className="w-full"
                />
              </div>

              {/* Blur */}
              <div>
                <label className="label">
                  Blur: <span className="font-mono">{blur}px</span>
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={blur}
                  onChange={(e) => setBlur(Number(e.target.value))}
                  className="w-full"
                />
              </div>

              {/* Spread */}
              <div>
                <label className="label">
                  Spread: <span className="font-mono">{spread}px</span>
                </label>
                <input
                  type="range"
                  min="-50"
                  max="50"
                  value={spread}
                  onChange={(e) => setSpread(Number(e.target.value))}
                  className="w-full"
                />
              </div>

              {/* Color */}
              <div>
                <label className="label">Cor da Sombra</label>
                <div className="flex gap-4">
                  <input
                    type="color"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    className="w-20 h-12 rounded-lg cursor-pointer"
                  />
                  <input
                    type="text"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    className="input flex-1 font-mono"
                    placeholder="#000000"
                  />
                </div>
              </div>

              {/* Opacity */}
              <div>
                <label className="label">
                  Opacidade: <span className="font-mono">{opacity}</span>
                </label>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={opacity}
                  onChange={(e) => setOpacity(Number(e.target.value))}
                  className="w-full"
                />
              </div>
            </div>

            {/* Preview */}
            <div className="space-y-6">
              <div className="card">
                <h2 className="text-2xl font-bold mb-6">Preview</h2>
                <div className="bg-neutral-50 rounded-xl p-12 flex items-center justify-center min-h-[400px]">
                  <div
                    className="w-48 h-48 bg-primary rounded-xl"
                    style={{
                      boxShadow: `${offsetX}px ${offsetY}px ${blur}px ${spread}px ${hexToRgba(color, opacity)}`,
                    }}
                  />
                </div>
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
                • <strong>Offset X/Y:</strong> Controla a posição da sombra
              </li>
              <li>
                • <strong>Blur:</strong> Quanto maior, mais suave a sombra
              </li>
              <li>
                • <strong>Spread:</strong> Expande ou contrai a sombra
              </li>
              <li>
                • <strong>Opacidade:</strong> Use valores mais baixos para
                sombras sutis
              </li>
              <li>
                • <strong>Múltiplas sombras:</strong> No CSS, separe várias
                sombras com vírgula
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
