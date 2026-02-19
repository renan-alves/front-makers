/**
 * Global Type Definitions
 * Tipos compartilhados em todo o projeto
 */

// Article types (também exportados de data/articles.ts)
export interface Article {
  slug: string;
  title: string;
  description: string;
  content: string;
  date: string;
  readTime: string;
  category: string;
  author: Author;
}

export interface Author {
  name: string;
  avatar: string;
}

// Tool types
export interface Tool {
  title: string;
  description: string;
  href: string;
  icon: string;
  category: ToolCategory;
}

export type ToolCategory = 'CSS' | 'JavaScript' | 'Design' | 'Productivity';

// SEO types
export interface SEOProps {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  url?: string;
}

// Navigation types
export interface NavItem {
  label: string;
  href: string;
  external?: boolean;
}

// Ad slot types
export type AdSlot =
  | 'hero'
  | 'article-list'
  | 'article-content'
  | 'tool-end'
  | 'footer';

// Metadata types
export interface PageMetadata {
  title: string;
  description: string;
  image?: string;
  type?: 'website' | 'article';
  date?: string;
}

// Component common props
export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

// Form types
export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export interface SelectOption {
  value: string;
  label: string;
}

// API Response types (para futuras features)
export interface APIResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Color types
export type ColorFormat = 'hex' | 'rgb' | 'rgba' | 'hsl' | 'hsla';

export interface Color {
  hex: string;
  rgb: { r: number; g: number; b: number };
  rgba: { r: number; g: number; b: number; a: number };
}

// Box Shadow types
export interface BoxShadow {
  offsetX: number;
  offsetY: number;
  blur: number;
  spread: number;
  color: string;
  opacity: number;
}

// Gradient types
export interface Gradient {
  type: 'linear' | 'radial';
  direction: string;
  colors: string[];
}

// Converter types
export interface ConversionResult {
  input: number;
  output: number;
  unit: string;
}
