# Frontmakers Design System

**Design System Version:** 1.0  
**Last Updated:** February 2026  
**Status:** Active

## 1. Brand Identity

### 1.1 Brand Positioning

**Frontmakers** is a professional, technology-focused platform for frontend developers. The brand reflects:
- Engineering excellence
- Modular thinking
- Technical clarity
- Modern aesthetics
- Reliability and performance

### 1.2 Logo System

#### Primary Logo: Typographic Wordmark

The primary logo is purely **typographic**, with "Frontmakers" as the protagonist:

```
FRONT        MAKERS
 └──────────────────┘
  └─ Open Sans Bold ─┘
   └──────────────────┘
```

**Design Notes:**
- Font: "Open Sans" Bold, 600+ weight
- Character spacing: Tight, modern feel
- FRONT in tech red (#E10600)
- MAKERS in charcoal (#1A1A1A)
- Minimal spacing creates visual unity
- No icon or mascot in primary logo
- Scalable from 16px to 500px+ with perfect legibility

#### Logo Variations

1. **Horizontal (Primary)**
   - Full "Frontmakers" wordmark
   - Ideal for: Headers, navigation, large displays

2. **Stacked (Secondary)**
   - FRONT (line 1)
   - MAKERS (line 2)
   - Ideal for: Mobile headers, tight spaces, favicons background

3. **Monochrome (Utility)**
   - Both words in single color for flexibility
   - Available in: Red, Black, White, Gray

---

## 2. Color System

### 2.1 Core Palette

#### Primary Colors

| Color | Hex | RGB | CSS Variable | Usage |
|-------|-----|-----|--------------|-------|
| **Tech Red** | `#E10600` | `225, 6, 0` | `--color-primary` | CTAs, accents, emphasis |
| **Tech Orange** | `#FF7A3D` | `255, 122, 61` | `--color-accent-orange` | Secondary actions, highlights |
| **Tech Blue** | `#00C2FF` | `0, 194, 255` | `--color-accent-blue` | Information, features, tags |
| **Charcoal** | `#1A1A1A` | `26, 26, 26` | `--color-text` | Text, dark mode, primary content |
| **White** | `#FFFFFF` | `255, 255, 255` | `--color-bg-primary` | Background, light mode |
| **Neutral Gray** | `#F5F5F5` | `245, 245, 245` | `--color-bg-secondary` | Secondary background, cards |

#### Extended Palette

| Color | Hex | RGB | CSS Variable | Usage |
|-------|-----|-----|--------------|-------|
| **Gray Light** | `#E8E8E8` | `232, 232, 232` | `--color-border` | Borders, dividers |
| **Gray Medium** | `#999999` | `153, 153, 153` | `--color-text-secondary` | Secondary text, muted |
| **Blue Soft** | `#F0F9FF` | `240, 249, 255` | `--color-accent-blue-soft` | Blue badges, light backgrounds |
| **Orange Soft** | `#FFF5E6` | `255, 245, 230` | `--color-accent-orange-soft` | Orange badges, light backgrounds |
| **Red Soft** | `#FFF0E6` | `255, 240, 230` | `--color-accent-red-soft` | Error states, light backgrounds |
| **Success Green** | `#10B981` | `16, 185, 129` | `--color-success` | Validation, success states |
| **Warning Yellow** | `#F59E0B` | `245, 158, 11` | `--color-warning` | Warnings, attention |
| **Error Red** | `#EF4444` | `239, 68, 68` | `--color-error` | Errors, critical states |

### 2.2 Color Usage Guidelines

**Primary (Tech Red)**
- Main CTAs (buttons)
- Primary headlines
- Logo "FRONT" component
- Focus states
- Hover effects on primary actions

**Secondary (Tech Blue)**
- Feature tags
- Information badges
- Secondary CTAs
- Accent elements
- Active states

**Tertiary (Tech Orange)**
- Highlights
- Emphasis points
- Secondary badges
- Decorative accents
- Hover on secondary elements

**Backgrounds**
- White: Default, main content
- Gray: Secondary sections, alt backgrounds
- Soft colors: Badge backgrounds, light alerts

**Text**
- Charcoal: Primary text, headings
- Gray: Secondary text, metadata
- White/Light: Text on dark backgrounds

### 2.3 Semantic Colors

```css
--color-success: #10B981    /* Positive states, confirmations */
--color-warning: #F59E0B    /* Caution, attention needed */
--color-error: #EF4444      /* Errors, critical issues */
--color-info: #00C2FF       /* Information, tips */
```

---

## 3. Typography System

### 3.1 Font Stack

**Primary Font:** `Open Sans` (Google Fonts)
- Weight options: 400 Regular, 600 Bold, 700 Extra Bold
- System fallback: `-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`

**Monospace Font:** `Fira Code` (code examples, technical content)
- Weight options: 400, 500, 600
- System fallback: `monospace`

### 3.2 Type Scale

| Level | Size | Weight | Line Height | Letter Spacing | Usage |
|-------|------|--------|------------|----------------|-------|
| **H1** | 56px | 700 Bold | 1.2 | -2px | Page titles |
| **H2** | 44px | 700 Bold | 1.25 | -1px | Section headers |
| **H3** | 32px | 700 Bold | 1.3 | 0px | Subsections |
| **H4** | 24px | 600 Bold | 1.4 | 0px | Small headers |
| **H5** | 20px | 600 Bold | 1.4 | 0px | Component headers |
| **H6** | 16px | 600 Bold | 1.5 | 0px | Mini headers |
| **Body** | 16px | 400 Regular | 1.7 | 0px | Main text |
| **Small** | 14px | 400 Regular | 1.6 | 0px | Secondary text |
| **Tiny** | 12px | 400 Regular | 1.5 | 0px | Metadata, captions |
| **Code** | 14px | 400 Regular | 1.6 | 0px | Code blocks |

### 3.3 Text Hierarchy

1. **H1** - Page title (only one per page)
2. **H2** - Major sections
3. **H3** - Subsections
4. **Body** - Main content, descriptions
5. **Small** - Metadata, timestamps, secondary info
6. **Tiny** - Captions, labels, badges

### 3.4 Units Policy (`rem` vs `px`)

Use a mixed strategy with clear responsibilities:

- **Use `rem`** for scalable UI dimensions:
  - Typography (`font-size`)
  - Section/layout spacing
  - Component sizing that should follow user font preferences
- **Use `px`** for precision-only details:
  - Borders (`1px`, `2px`)
  - Hairlines and dividers
  - Fine icon strokes and exact visual details
  - Shadow offsets/blur values

**Project default:**
- Scalable dimensions should be authored as `rem` in tokens/components.
- Precision details should remain in `px`.

---

## 4. Component System

### 4.1 Button Component

#### Primary Button
```css
background-color: #E10600;
color: #FFFFFF;
padding: 12px 24px;
border-radius: 8px;
font-weight: 600;
font-size: 16px;
border: none;
cursor: pointer;
transition: all 0.2s ease;

&:hover {
  background-color: #B80500;
  box-shadow: 0 8px 16px rgba(225, 6, 0, 0.2);
  transform: translateY(-2px);
}

&:active {
  transform: translateY(0);
  box-shadow: 0 4px 8px rgba(225, 6, 0, 0.15);
}
```

#### Secondary Button
```css
background-color: transparent;
color: #E10600;
padding: 12px 24px;
border-radius: 8px;
font-weight: 600;
font-size: 16px;
border: 2px solid #E10600;
cursor: pointer;
transition: all 0.2s ease;

&:hover {
  background-color: rgba(225, 6, 0, 0.05);
  border-color: #B80500;
}
```

#### Ghost Button
```css
background-color: transparent;
color: #E10600;
padding: 12px 24px;
border-radius: 8px;
font-weight: 600;
font-size: 16px;
border: none;
cursor: pointer;
transition: all 0.2s ease;

&:hover {
  background-color: rgba(225, 6, 0, 0.05);
}
```

### 4.2 Card Component

```css
background-color: #FFFFFF;
border-radius: 12px;
padding: 24px;
border: 1px solid #E8E8E8;
box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
transition: all 0.3s ease;

&:hover {
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  transform: translateY(-4px);
  border-color: #00C2FF;
}
```

### 4.3 Input Component

```css
background-color: #FFFFFF;
border: 2px solid #E8E8E8;
border-radius: 8px;
padding: 12px 16px;
font-size: 16px;
font-family: 'Open Sans', sans-serif;
transition: all 0.2s ease;

&:focus {
  outline: none;
  border-color: #00C2FF;
  box-shadow: 0 0 0 3px rgba(0, 194, 255, 0.1);
}

&::placeholder {
  color: #999999;
}
```

### 4.4 Tag/Badge Component

#### Blue Tag
```css
background-color: #F0F9FF;
color: #00C2FF;
padding: 4px 12px;
border-radius: 20px;
font-size: 12px;
font-weight: 600;
border: 1px solid #00C2FF;
```

#### Orange Tag
```css
background-color: #FFF5E6;
color: #FF7A3D;
padding: 4px 12px;
border-radius: 20px;
font-size: 12px;
font-weight: 600;
border: 1px solid #FF7A3D;
```

### 4.5 Divider

```css
height: 1px;
background-color: #E8E8E8;
border: none;
margin: 24px 0;
```

---

## 5. Spacing System

### 5.1 Spacing Scale

```
4px   - Micro spacing (padding between elements)
8px   - Extra small spacing
12px  - Small spacing
16px  - Base spacing
24px  - Medium spacing
32px  - Large spacing
48px  - Extra large spacing
64px  - Hero spacing
96px  - Section spacing
128px - Page spacing
```

### 5.2 Common Patterns

| Component | Padding | Margin | Gap |
|-----------|---------|--------|-----|
| Sections (rule) | 12px (small), 24px (medium), 40px (large) | - | - |
| Button | 12px 24px | - | - |
| Card | 24px | 16px | - |
| Section | - | 96px 0 | - |
| Grid (3 cols) | - | - | 32px |
| Grid (2 cols) | - | - | 24px |
| Flex (items) | - | - | 12px-16px |

### 5.3 Section Padding Tokens (Single Source of Truth)

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

Use these tokens in section/layout wrappers (e.g., `.section-padding`) so future changes require editing only these values.

---

## 6. Shape & Border System

### 6.1 Border Radius

| Level | Value | Usage |
|-------|-------|-------|
| **Square** | 0px | Sharp, modern graphics |
| **Subtle** | 4px | Minimal rounding |
| **Soft** | 8px | Buttons, inputs, small cards |
| **Rounded** | 12px | Large cards, containers |
| **Full** | 20px+ / 50% | Pills, badges, circles |

### 6.2 Border Styles

```css
/* Light border - separation */
border: 1px solid #E8E8E8;

/* Accent border - emphasis */
border: 2px solid #00C2FF;

/* Primary border - action */
border: 2px solid #E10600;

/* Dashed border - incomplete/draft */
border: 2px dashed #E8E8E8;
```

### 6.3 Box Shadows

| Level | Shadow | Usage |
|-------|--------|-------|
| **None** | - | Flat design elements |
| **Subtle** | `0 2px 8px rgba(0,0,0,0.04)` | Default cards, elevation 1 |
| **Soft** | `0 4px 16px rgba(0,0,0,0.08)` | Hover cards, elevation 2 |
| **Bold** | `0 8px 24px rgba(0,0,0,0.12)` | Modals, floating elements |
| **Glow** | `0 0 24px rgba(0,194,255,0.2)` | Focus states, highlights |

---

## 7. Icon System

### 7.1 Icon Style Guide

- **Shape:** Geometric, based on perfect squares/circles
- **Stroke:** 2-3px, rounded corners
- **Size:** Scales from 16x16px to 64x64px
- **Color:** Matches content semantic color
- **Spacing:** 8-12px gap from text

### 7.2 Common Icons

| Icon | Hex | Name | Usage |
|------|-----|------|-------|
| → | U+2192 | Arrow Right | Navigation, links |
| ← | U+2190 | Arrow Left | Back action |
| ✓ | U+2713 | Checkmark | Confirmation |
| ✕ | U+2715 | X Mark | Close, delete |
| + | U+002B | Plus | Add, expand |
| − | U+2212 | Minus | Reduce, collapse |
| ⚙ | U+2699 | Gear | Settings |
| 🔍 | U+1F50D | Magnifier | Search |

### 7.3 Icon Colors

```css
/* Primary icons */
color: #E10600;

/* Secondary icons */
color: #00C2FF;

/* Neutral icons */
color: #999999;

/* Success icons */
color: #10B981;

/* Error icons */
color: #EF4444;
```

---

## 8. Layout System

### 8.1 Grid Container

```css
.container-grid {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

@media (max-width: 768px) {
  padding: 0 16px;
}

@media (max-width: 480px) {
  padding: 0 12px;
}
```

### 8.2 Responsive Breakpoints

| Breakpoint | Width | Device | CSS |
|-----------|-------|--------|-----|
| **Mobile** | < 480px | Small phones | `@media (max-width: 480px)` |
| **Tablet** | 480px - 768px | Tablets | `@media (max-width: 768px)` |
| **Desktop** | 768px - 1200px | Small laptops | `@media (min-width: 768px)` |
| **Wide** | > 1200px | Large screens | `@media (min-width: 1200px)` |

### 8.3 Grid System

- **Desktop:** 12-column grid
- **Tablet:** 6-column grid
- **Mobile:** 2-column / 1-column grid
- **Gap:** 24px (desktop), 16px (tablet), 12px (mobile)

### 8.4 Responsive Strategy (Project Standard)

Use a **mobile-first, content-driven** approach in all pages and components.

#### Mandatory Rules

1. Start with base mobile styles first (no breakpoint prefix).
2. Add `md` and `lg` only where layout/content requires more space.
3. Prefer flexible widths (`w-full`) combined with max constraints (`container-grid`, `max-w-*`).
4. Use predictable progressive grids (`grid-cols-1 md:grid-cols-2 lg:grid-cols-3`).
5. Prevent horizontal overflow in wide blocks (tables, code, previews) with `overflow-x-auto` wrappers.

#### Reference Pattern

```tsx
<div className="overflow-x-auto rounded-lg border border-light">
  <div className="min-w-[960px]">
    {/* Wide content */}
  </div>
</div>
```

---

## 9. Animation & Transitions

### 9.1 Timing Functions

```css
/* Quick interactions */
transition: all 0.2s ease;

/* Standard transitions */
transition: all 0.3s ease;

/* Smooth animations */
transition: all 0.5s ease;

/* Easing function */
cubic-bezier(0.25, 0.46, 0.45, 0.94)
```

### 9.2 Common Animations

| Animation | Duration | Usage |
|-----------|----------|-------|
| Hover lift | 0.2s | Button hover, card hover |
| Fade in | 0.3s | Page load, content enter |
| Slide up | 0.3s | Modal enter, dropdown |
| Scale | 0.2s | Icon interaction, zoom focus |
| Color transition | 0.2s | State change, hover effect |

### 9.3 Performance Notes

- Use `transform: translateY()` instead of `top/bottom`
- Use `opacity` for fade effects
- Limit animations to 0.2s - 0.5s duration
- Use `will-change` sparingly for expensive properties
- Always provide `prefers-reduced-motion` respects

---

## 10. Dark Mode (Future)

### 10.1 Color Remapping

| Light Mode | Dark Mode |
|-----------|-----------|
| #FFFFFF | #0F0F0F |
| #F5F5F5 | #1A1A1A |
| #1A1A1A | #E8E8E8 |
| #E8E8E8 | #333333 |
| #E10600 | #FF5A50 |
| #00C2FF | #50DDFF |

---

## 11. Accessibility

### 11.1 Color Contrast

- **Normal text:** Minimum 4.5:1 contrast ratio
- **Large text (18px+):** Minimum 3:1 contrast ratio
- **UI components:** Minimum 3:1 contrast ratio

### 11.2 Font Sizes

- **Minimum:** 14px for body text
- **Links:** Easily distinguishable, either color or underline
- **Focus indicators:** Always visible, 2px minimum

### 11.3 Spacing for Touch

- **Touch targets:** Minimum 44x44px
- **Touch spacing:** 16px minimum between interactive elements

---

## 12. Usage Examples

### 12.1 Home Page Layout

```
Header (fixed)
  ├── Logo: Typographic "FRONTMAKERS"
  ├── Nav: Tools | Articles | Submit
  └── Context action: Submit Article

Hero Section
  ├── Headline: "Tools and Resources for Frontend Developers"
  ├── Subheadline: Value proposition
  └── Buttons: Primary + Secondary

Featured Tools (3-column grid)
  ├── Cards with icons
  ├── Tool names + descriptions
  └── Orange tag for category

CTA Section
  ├── Dark background
  ├── Headline + description
  └── Primary button

Features Section (3-column)
  └── Icon + Title + Description (repeated)

Footer
  ├── Links (4 columns)
  ├── Copyright
  └── Soft background
```

### 12.2 Article Page Layout

```
Header (sticky)
  └── Logo + Navigation

Article Header
  ├── Breadcrumb navigation
  ├── Category badge (blue)
  ├── Publication date + read time
  ├── Title (H1)
  ├── Excerpt
  └── Author info

Article Content
  ├── Markdown rendered
  ├── Code blocks with syntax highlighting
  ├── Ad banner (centered)
  ├── Call-to-action box
  └── Related articles (3 cards)

Footer
  └── Links + copyright
```

---

## 13. File Structure

```
app/
├── globals.css              # CSS Variables + base styles
├── layout.tsx               # Root layout with Tailwind
└── [locale]/
    ├── layout.tsx           # Locale-specific layout
    ├── page.tsx             # Home page
    ├── articles/
    │   ├── page.tsx         # Articles list
    │   └── [slug]/
    │       └── page.tsx     # Article detail
    └── tools/
        ├── page.tsx         # Tools list
        └── [tool]/
            └── page.tsx     # Tool page

components/
├── layout/
│   ├── Header.tsx           # Main header
│   └── Footer.tsx           # Main footer
├── ui/
│   ├── Button.tsx
│   ├── Card.tsx
│   ├── Badge.tsx
│   └── Input.tsx
└── ads/
    └── AdBanner.tsx

styles/
├── colors.css               # Color variables
├── typography.css           # Font definitions
├── spacing.css              # Spacing scale
├── components.css           # Component styles
└── animations.css           # Animation definitions
```

---

## 14. Brand Voice & Tone

### 14.1 Writing Principles

- **Clear:** Technical but accessible
- **Concise:** Minimal fluff, maximum value
- **Confident:** Authority in frontend tools
- **Helpful:** Always solving problems

### 14.2 Language Examples

**Do:**
- "Create perfect CSS shadows with real-time preview"
- "Convert pixels to REM easily"
- "Write safer TypeScript code"

**Don't:**
- "Our amazing incredible tool..."
- "You won't believe how easy this is!"
- "Revolutionary revolutionary technique..."

---

## 15. Changelog

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | Feb 2026 | Initial design system |

---

**Design System Maintained By:** Frontmakers Team  
**For Questions:** Refer to this document or contact the design team
