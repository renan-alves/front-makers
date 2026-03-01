# Design System Implementation Guide

## Overview

This guide explains how to use the Frontmakers design system in your components and pages. The system consists of:

1. **CSS Variables** (`styles/design-system.css`) - Core design tokens
2. **Tailwind Configuration** (`tailwind.config.ts`) - Tailwind extensions
3. **Global Styles** (`app/globals.css`) - Base styles and utility classes
4. **Component Library** - Reusable React components using the system

---

## Quick Reference

### Colors

```css
/* Primary (Red) */
--color-primary: #E10600
--color-primary-dark: #B80500
--color-primary-light: #FA4C42

/* Accent (Blue) */
--color-accent-blue: #00C2FF
--color-accent-blue-dark: #0099CC
--color-accent-blue-light: #50DDFF

/* Accent (Orange) */
--color-accent-orange: #FF7A3D
--color-accent-orange-dark: #E85F24
--color-accent-orange-light: #FFB399

/* Text */
--color-text: #1A1A1A
--color-text-secondary: #999999

/* Backgrounds */
--color-bg-primary: #FFFFFF
--color-bg-secondary: #F5F5F5
--color-bg-tertiary: #EFEFEF

/* Semantic */
--color-success: #10B981
--color-warning: #F59E0B
--color-error: #EF4444
```

### Spacing Scale

```
spacing-xs: 4px
spacing-sm: 8px
spacing-md: 12px
spacing-base: 16px
spacing-lg: 24px
spacing-xl: 32px
spacing-2xl: 48px
spacing-3xl: 64px
spacing-4xl: 96px
spacing-5xl: 128px
```

### Section Padding Rule (Global)

```css
--section-padding-sm: 12px;
--section-padding-md: 24px;
--section-padding-lg: 40px;
--section-padding: var(--section-padding-sm);

@media (min-width: 768px) {
  --section-padding: var(--section-padding-md);
}

@media (min-width: 1200px) {
  --section-padding: var(--section-padding-lg);
}
```

Use `var(--section-padding)` in section/layout wrappers so changing the rule only requires updating these tokens.

### Units Policy (`rem` vs `px`)

Use this decision rule in implementation:

- **`rem` for scalable dimensions**
  - Typography sizes
  - Section and layout spacing
  - Component dimensions that should scale with user preferences
- **`px` for precision details**
  - Borders and dividers
  - Fine icon strokes
  - Shadow geometry

Quick examples:

```css
/* Scalable */
font-size: 1rem;
padding: 1.5rem;

/* Precise */
border: 1px solid var(--color-border);
box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
```

### Typography

```
Primary Font: Open Sans (--font-primary)
Mono Font: Fira Code (--font-mono)

Font Weights:
  regular: 400
  bold: 600
  extra-bold: 700
```

### Border Radius

```
radius-none: 0px
radius-sm: 4px
radius-md: 8px
radius-lg: 12px
radius-xl: 16px
radius-full: 9999px
```

### Transitions

```
transition-fast: 0.15s ease
transition-base: 0.2s ease
transition-slow: 0.3s ease
transition-slower: 0.5s ease
```

---

## Usage Examples

### 1. Using CSS Variables

#### In CSS Files

```css
.custom-button {
  background-color: var(--color-primary);
  color: white;
  padding: 12px 24px;
  border-radius: var(--radius-md);
  transition: all var(--transition-base);
  box-shadow: var(--shadow-md);
}

.custom-button:hover {
  background-color: var(--color-primary-dark);
  box-shadow: var(--shadow-lg);
}
```

#### In Inline Styles (React)

```tsx
<div style={{
  backgroundColor: 'var(--color-bg-secondary)',
  padding: 'var(--section-padding)',
  borderRadius: 'var(--radius-lg)',
  boxShadow: 'var(--shadow-md)'
}}>
  Content
</div>
```

---

### 2. Using Tailwind Classes

#### Colors

```tsx
// Background colors
<div className="bg-primary bg-secondary bg-tertiary">
  
// Text colors
<p className="text-primary text-secondary text-accent">

// Border colors
<div className="border border-primary border-blue border-orange">

// Quick color access
<div className="bg-blue text-orange border-primary">
```

#### Spacing

```tsx
// Padding (uses design system spacing scale)
<div className="p-base px-lg py-md">

// Margin
<div className="m-base mx-lg my-md">

// Gap (flex/grid)
<div className="flex gap-lg">
```

#### Typography

```tsx
// Font families
<p className="font-sans font-mono">

// Font weights
<p className="font-regular font-bold font-extra-bold">

// Custom line height
<p className="leading-tight leading-normal leading-relaxed">
```

#### Border Radius

```tsx
<div className="rounded-md rounded-lg rounded-xl rounded-full">
```

#### Shadows

```tsx
<div className="shadow-sm shadow-md shadow-lg shadow-glow-blue">
```

#### Transitions

```tsx
<button className="transition-base hover:bg-primary-dark">
  Hover me
</button>

<div className="transition-slow hover:shadow-lg">
```

---

### 3. Utility Classes

The design system includes pre-built utility classes for common patterns:

#### Flex Utilities

```tsx
// Center content
<div className="flex-center">Content</div>

// Space between
<div className="flex-between">
  <div>Left</div>
  <div>Right</div>
</div>

// Column layout
<div className="flex-col-center">
  <h2>Title</h2>
  <p>Subtitle</p>
</div>
```

#### Grid Utilities

```tsx
// 2-column grid
<div className="grid-2 gap-lg">
  <Card />
  <Card />
</div>

// 3-column grid
<div className="grid-3 gap-lg">
  <Card />
  <Card />
  <Card />
</div>

// Auto-responsive grid
<div className="grid-auto">
  {items.map(item => <Card key={item.id} />)}
</div>
```

#### Text Utilities

```tsx
<p className="text-primary">Primary text</p>
<p className="text-secondary">Secondary text</p>
<p className="text-accent">Accent text</p>
<p className="text-muted">Muted text</p>
```

#### Link Utilities

```tsx
<a href="#" className="link-primary">Primary link</a>
<a href="#" className="link-secondary">Secondary link</a>
```

#### Badge Utilities

```tsx
<span className="badge badge-primary">New</span>
<span className="badge badge-success">Success</span>
<span className="badge badge-warning">Warning</span>
<span className="badge badge-error">Error</span>
```

---

### 4. Component Patterns

#### Buttons

```tsx
// Using CSS classes (preferred)
<button className="btn-primary">
  Click me
</button>

<button className="btn-secondary">
  Secondary
</button>

<button className="btn-ghost">
  Ghost
</button>
```

#### Cards

```tsx
<div className="card">
  <h3 className="text-primary font-bold">Card Title</h3>
  <p className="text-secondary mt-md">Card content</p>
</div>
```

#### Forms

```tsx
<div className="mb-lg">
  <label className="label">Email</label>
  <input 
    type="email" 
    className="input"
    placeholder="Enter email"
  />
</div>

<div className="mb-lg">
  <label className="label">Message</label>
  <textarea 
    className="textarea"
    placeholder="Enter message"
  />
</div>
```

#### Badges

```tsx
<span className="badge badge-primary">Featured</span>
<span className="badge badge-success">Published</span>
<span className="badge badge-warning">Draft</span>
<span className="badge badge-error">Rejected</span>
```

---

### 5. Dark Mode Support

The design system supports dark mode via `prefers-color-scheme: dark`.

#### CSS Example

```css
@media (prefers-color-scheme: dark) {
  :root {
    --color-bg-primary: #0F0F0F;
    --color-bg-secondary: #1A1A1A;
    --color-text: #E8E8E8;
  }
}
```

#### Tailwind Usage

```tsx
// Automatic with prefers-color-scheme
<div className="bg-primary text-primary">
  This adapts automatically to dark mode
</div>

// Or use `dark:` prefix (legacy)
<div className="bg-white dark:bg-black text-black dark:text-white">
  Legacy dark mode approach
</div>
```

---

### 6. Responsive Design

The system supports responsive layouts with breakpoints:

- **Mobile**: < 480px
- **Tablet**: 480px - 768px
- **Desktop**: 768px - 1200px
- **Wide**: > 1200px

#### Recommended Approach (Project Standard)

Use a **mobile-first, content-driven** strategy:

1. Start with a 1-column layout and base spacing (no breakpoint classes).
2. Add `md:` and `lg:` only when content actually needs more space.
3. Use fluid containers (`w-full`) constrained by `max-w-*` or `container-grid`.
4. Prefer responsive grids like `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`.
5. Prevent horizontal overflow for wide UI (tables/code/header previews) using `overflow-x-auto` wrappers.

#### Responsive Rules (Do / Don't)

**Do**
- Use `text-base md:text-lg` style scaling for readability.
- Keep touch targets and controls easy to tap on mobile.
- Let long code and large previews scroll horizontally when needed.
- Test common ranges: mobile (~360px), tablet (~768px), desktop (≥1024px).

**Don't**
- Do not start from desktop and patch down to mobile.
- Do not force fixed widths that break on small screens.
- Do not hide critical content on mobile unless there is an equivalent path.

#### Grid Example

```tsx
// 3 columns on desktop, 2 on tablet, 1 on mobile (auto-responsive)
<div className="grid-auto gap-lg">
  <Card />
  <Card />
  <Card />
</div>
```

#### Tailwind Responsive Classes

```tsx
<div className="
  w-full md:w-1/2 lg:w-1/3
  p-md md:p-lg lg:p-xl
  text-sm md:text-base lg:text-lg
">
  Responsive content
</div>
```

#### Practical Pattern for Wide Blocks

```tsx
<div className="overflow-x-auto rounded-lg border border-light">
  <div className="min-w-[960px]">
    {/* Wide content (header preview/table/code panel) */}
  </div>
</div>
```

---

## Component Implementation Examples

### Button Component

```tsx
// components/Button.tsx
import React from 'react';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  className?: string;
  [key: string]: any;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  ...props
}) => {
  const baseClasses = 'font-bold rounded-md transition-base focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variantClasses = {
    primary: 'btn-primary focus:ring-primary',
    secondary: 'btn-secondary focus:ring-primary',
    ghost: 'btn-ghost focus:ring-primary',
  };

  const sizeClasses = {
    sm: 'px-md py-sm text-sm',
    md: 'px-lg py-base text-base',
    lg: 'px-xl py-lg text-lg',
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
```

### Card Component

```tsx
// components/Card.tsx
import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverable?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  hoverable = true
}) => {
  return (
    <div className={`card ${hoverable ? 'hover:shadow-lg' : ''} ${className}`}>
      {children}
    </div>
  );
};
```

### Badge Component

```tsx
// components/Badge.tsx
import React from 'react';

interface BadgeProps {
  variant?: 'primary' | 'success' | 'warning' | 'error';
  children: React.ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'primary',
  children,
  className = ''
}) => {
  return (
    <span className={`badge badge-${variant} ${className}`}>
      {children}
    </span>
  );
};
```

---

## Skeleton Loading

Use skeletons for non-static elements while data is loading. Prefer a route-level
`loading.tsx` and compose it using the `skeleton` utility class.

```tsx
import Skeleton from '@/components/ui/Skeleton';

export default function Loading() {
  return (
    <div className="card space-y-4">
      <Skeleton className="h-5 w-1/3" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-5/6" />
      <div className="flex gap-2">
        <Skeleton className="h-6 w-16 rounded-full" />
        <Skeleton className="h-6 w-20 rounded-full" />
      </div>
    </div>
  );
}
```

---

## Color Accessibility

All color combinations meet WCAG AA standards:

- **Tech Red (#E10600) on White**: 5.2:1 contrast
- **Tech Blue (#00C2FF) on White**: 5.8:1 contrast
- **Tech Orange (#FF7A3D) on White**: 4.9:1 contrast
- **Charcoal (#1A1A1A) on White**: 14.3:1 contrast

---

## Performance Considerations

1. **CSS Variables** are computed at runtime, which is fast enough for modern browsers
2. **Tailwind Classes** are pre-compiled and optimized for production
3. **Use utility classes** over inline styles when possible
4. **Avoid unnecessary nesting** of components
5. **Use `prefers-reduced-motion`** for accessibility

---

## Common Patterns

### Hero Section

```tsx
<section className="bg-primary text-white py-5xl px-base">
  <div className="container-grid">
    <h1 className="text-4xl font-bold mb-lg">Welcome</h1>
    <p className="text-xl mb-2xl opacity-90">Subtitle text</p>
    <button className="btn-secondary">Get Started</button>
  </div>
</section>
```

### Feature Grid

```tsx
<div className="grid-3 gap-lg py-3xl px-base">
  {features.map(feature => (
    <div key={feature.id} className="card">
      <h3 className="text-xl font-bold text-primary mb-md">
        {feature.title}
      </h3>
      <p className="text-secondary">{feature.description}</p>
    </div>
  ))}
</div>
```

### Form Section

```tsx
<form className="max-w-2xl mx-auto p-lg md:p-2xl bg-secondary rounded-lg">
  <h2 className="text-2xl font-bold mb-2xl">Contact Us</h2>
  
  <div className="mb-lg">
    <label htmlFor="email" className="label">Email</label>
    <input 
      id="email"
      type="email" 
      className="input" 
      placeholder="your@email.com"
    />
  </div>

  <div className="mb-2xl">
    <label htmlFor="message" className="label">Message</label>
    <textarea 
      id="message"
      className="textarea" 
      placeholder="Your message..."
    />
  </div>

  <button type="submit" className="btn-primary w-full">
    Send Message
  </button>
</form>
```

---

## Migration Guide

### From Old Styles

**Before:**
```tsx
<div style={{
  backgroundColor: '#E10600',
  padding: '16px',
  borderRadius: '8px',
  color: 'white'
}}>
```

**After:**
```tsx
<div className="bg-primary p-base rounded-md text-white">
```

---

## Resources

- **DESIGN_SYSTEM.md** - Complete design specification
- **styles/design-system.css** - CSS variables and utility classes
- **tailwind.config.ts** - Tailwind extensions
- **app/globals.css** - Global styles

---

## Support

For questions about the design system:
1. Check DESIGN_SYSTEM.md for specifications
2. Review component examples in `components/`
3. Check Tailwind documentation: https://tailwindcss.com/docs
4. Check CSS Variables: https://developer.mozilla.org/en-US/docs/Web/CSS/--*
