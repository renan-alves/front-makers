'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';

/**
 * Submit Article Page
 * 
 * Allows community members to submit articles for review
 */
export default function SubmitPage() {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    authorName: '',
    authorEmail: '',
    category: '',
    tags: '',
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    try {
      const response = await fetch('/api/submissions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit article');
      }

      setStatus('success');
      setFormData({
        title: '',
        content: '',
        authorName: '',
        authorEmail: '',
        category: '',
        tags: '',
      });
    } catch (error) {
      setStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'An error occurred');
    }
  };

  if (status === 'success') {
    return (
      <div className="min-h-screen bg-secondary flex items-center justify-center py-20">
        <div className="container-grid">
          <div className="max-w-2xl mx-auto bg-primary p-12 rounded-2xl border-2 border-[var(--color-border)] text-center">
            <div className="text-6xl mb-6">✅</div>
            <h1 className="text-3xl font-bold mb-4">Article Submitted Successfully!</h1>
            <p className="text-lg text-secondary mb-8">
              Thank you for your submission. Our team will review your article and get back to you
              via email within 3-5 business days.
            </p>
            <div className="flex gap-4 justify-center">
              <Link href="/en" className="btn-primary">
                Go to Homepage
              </Link>
              <button
                onClick={() => setStatus('idle')}
                className="btn-secondary"
              >
                Submit Another Article
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary">
      {/* Header */}
      <section className="bg-primary border-b border-light py-16">
        <div className="container-grid">
          <div className="max-w-3xl mx-auto">
            {/* Breadcrumb */}
            <nav className="mb-6">
              <ol className="flex items-center gap-2 text-sm text-secondary">
                <li>
                  <Link
                    href="/en"
                    className="hover:text-[var(--color-primary)] transition-colors"
                  >
                    Home
                  </Link>
                </li>
                <li>→</li>
                <li className="text-primary font-semibold">Submit Article</li>
              </ol>
            </nav>

            <h1 className="mb-4">Submit Your Article</h1>
            <p className="text-xl text-secondary">
              Share your knowledge with the Frontmakers community. Submit your article for review
              and help developers learn new skills.
            </p>
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="container-grid py-12">
        <div className="max-w-3xl mx-auto">
          <form onSubmit={handleSubmit} className="card space-y-6">
            {/* Error Message */}
            {status === 'error' && (
              <div className="p-4 bg-red-50 border-2 border-red-200 rounded-lg">
                <p className="text-red-700 font-medium">{errorMessage}</p>
              </div>
            )}

            {/* Info Box */}
            <div className="p-6 bg-neutral-50 border-2 border-[var(--color-border)] rounded-xl">
              <h3 className="font-bold text-lg mb-2">Submission Guidelines</h3>
              <ul className="text-secondary space-y-2 text-sm">
                <li>• Articles should be at least 500 words</li>
                <li>• Content must be original and not published elsewhere</li>
                <li>• Use Markdown formatting for better readability</li>
                <li>• Include code examples when relevant</li>
                <li>• Review time is typically 3-5 business days</li>
              </ul>
            </div>

            {/* Author Info */}
            <div>
              <h2 className="text-xl font-bold mb-4">Author Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="authorName" className="block text-sm font-semibold mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    id="authorName"
                    name="authorName"
                    value={formData.authorName}
                    onChange={handleChange}
                    required
                    className="input w-full"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label htmlFor="authorEmail" className="block text-sm font-semibold mb-2">
                    Your Email *
                  </label>
                  <input
                    type="email"
                    id="authorEmail"
                    name="authorEmail"
                    value={formData.authorEmail}
                    onChange={handleChange}
                    required
                    className="input w-full"
                    placeholder="john@example.com"
                  />
                </div>
              </div>
            </div>

            {/* Article Info */}
            <div>
              <h2 className="text-xl font-bold mb-4">Article Details</h2>
              <div className="space-y-4">
                <div>
                  <label htmlFor="title" className="block text-sm font-semibold mb-2">
                    Article Title *
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    className="input w-full"
                    placeholder="e.g., Advanced CSS Grid Techniques for 2026"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="category" className="block text-sm font-semibold mb-2">
                      Category
                    </label>
                    <select
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="input w-full"
                    >
                      <option value="">Select a category</option>
                      <option value="CSS">CSS</option>
                      <option value="JavaScript">JavaScript</option>
                      <option value="TypeScript">TypeScript</option>
                      <option value="React">React</option>
                      <option value="Next.js">Next.js</option>
                      <option value="Performance">Performance</option>
                      <option value="Design">Design</option>
                      <option value="Tools">Tools</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="tags" className="block text-sm font-semibold mb-2">
                      Tags (comma-separated)
                    </label>
                    <input
                      type="text"
                      id="tags"
                      name="tags"
                      value={formData.tags}
                      onChange={handleChange}
                      className="input w-full"
                      placeholder="css, grid, layout"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="content" className="block text-sm font-semibold mb-2">
                    Article Content (Markdown) *
                  </label>
                  <textarea
                    id="content"
                    name="content"
                    value={formData.content}
                    onChange={handleChange}
                    required
                    rows={20}
                    className="input w-full font-mono text-sm"
                    placeholder={`# Introduction

Your article content here using Markdown formatting...

## Code Example

\`\`\`css
.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}
\`\`\`

## Conclusion

Wrap up your article...`}
                  />
                  <p className="text-sm text-secondary mt-2">
                    Minimum 100 characters. Use Markdown for formatting.
                  </p>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex items-center gap-4 pt-4">
              <button
                type="submit"
                disabled={status === 'submitting'}
                className="btn-primary"
              >
                {status === 'submitting' ? 'Submitting...' : 'Submit Article'}
              </button>
              <Link href="/en" className="text-secondary hover:text-primary transition-colors">
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
