import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: ['class', '@media (prefers-color-scheme: dark)'],
  theme: {
    extend: {
      /* ===========================
         COLORS - Comprehensive palette
         =========================== */
      colors: {
        // Primary Red (Tech)
        primary: {
          DEFAULT: 'var(--color-primary)',
          dark: 'var(--color-primary-dark)',
          light: 'var(--color-primary-light)',
          rgb: 'var(--color-primary-rgb)',
        },
        // Accent Blue
        blue: {
          DEFAULT: 'var(--color-accent-blue)',
          dark: 'var(--color-accent-blue-dark)',
          light: 'var(--color-accent-blue-light)',
          soft: 'var(--color-accent-blue-soft)',
          rgb: 'var(--color-accent-blue-rgb)',
        },
        // Accent Orange
        orange: {
          DEFAULT: 'var(--color-accent-orange)',
          dark: 'var(--color-accent-orange-dark)',
          light: 'var(--color-accent-orange-light)',
          soft: 'var(--color-accent-orange-soft)',
          rgb: 'var(--color-accent-orange-rgb)',
        },
        // Semantic Colors
        success: {
          DEFAULT: 'var(--color-success)',
          soft: 'var(--color-success-soft)',
        },
        warning: {
          DEFAULT: 'var(--color-warning)',
          soft: 'var(--color-warning-soft)',
        },
        error: {
          DEFAULT: 'var(--color-error)',
          soft: 'var(--color-error-soft)',
        },
        info: {
          DEFAULT: 'var(--color-info)',
          soft: 'var(--color-info-soft)',
        },
        // Legacy Naming
        neutral: {
          50: 'var(--neutral-50)',
          100: 'var(--neutral-100)',
          300: 'var(--neutral-300)',
          600: 'var(--neutral-600)',
          700: 'var(--neutral-700)',
          800: 'var(--neutral-800)',
          900: 'var(--neutral-900)',
        },
        accent: {
          primary: 'var(--color-primary)',
          hover: 'var(--color-primary-dark)',
          soft: '#FFE8E6',
          blue: 'var(--color-accent-blue)',
          'blue-soft': 'var(--color-accent-blue-soft)',
        },
      },

      /* ===========================
         BACKGROUNDS
         =========================== */
      backgroundColor: {
        primary: 'var(--color-bg-primary)',
        secondary: 'var(--color-bg-secondary)',
        tertiary: 'var(--color-bg-tertiary)',
        dark: 'var(--bg-dark)',
      },

      /* ===========================
         TEXT COLORS
         =========================== */
      textColor: {
        primary: 'var(--color-text)',
        secondary: 'var(--color-text-secondary)',
        inverse: 'var(--text-inverse)',
        muted: 'var(--color-text-secondary)',
        accent: 'var(--color-primary)',
      },

      /* ===========================
         BORDER COLORS & STYLES
         =========================== */
      borderColor: {
        light: 'var(--color-border)',
        dark: 'var(--color-border-dark)',
        primary: 'var(--color-primary)',
        blue: 'var(--color-accent-blue)',
        orange: 'var(--color-accent-orange)',
        DEFAULT: 'var(--color-border)',
      },

      /* ===========================
         BORDER RADIUS
         =========================== */
      borderRadius: {
        none: 'var(--radius-none)',
        sm: 'var(--radius-sm)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
        xl: 'var(--radius-xl)',
        full: 'var(--radius-full)',
      },

      /* ===========================
         SPACING - 4px base scale
         =========================== */
      spacing: {
        'xs': 'var(--spacing-xs)',
        'sm': 'var(--spacing-sm)',
        'md': 'var(--spacing-md)',
        'base': 'var(--spacing-base)',
        'lg': 'var(--spacing-lg)',
        'xl': 'var(--spacing-xl)',
        '2xl': 'var(--spacing-2xl)',
        '3xl': 'var(--spacing-3xl)',
        '4xl': 'var(--spacing-4xl)',
        '5xl': 'var(--spacing-5xl)',
      },

      /* ===========================
         FONT FAMILY
         =========================== */
      fontFamily: {
        sans: ['var(--font-primary)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
        inter: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },

      /* ===========================
         FONT WEIGHT
         =========================== */
      fontWeight: {
        regular: 'var(--font-weight-regular)',
        bold: 'var(--font-weight-bold)',
        'extra-bold': 'var(--font-weight-extra-bold)',
      },

      /* ===========================
         MAX WIDTH / CONTAINER
         =========================== */
      maxWidth: {
        'container': 'var(--container-max-width)',
        '3xl': '48rem',
        '4xl': '56rem',
        '5xl': '64rem',
        '6xl': '72rem',
        '7xl': '80rem',
      },

      /* ===========================
         BOX SHADOW
         =========================== */
      boxShadow: {
        'sm': 'var(--shadow-sm)',
        'md': 'var(--shadow-md)',
        'lg': 'var(--shadow-lg)',
        'card': '0 4px 20px rgba(0, 0, 0, 0.08)',
        'card-hover': '0 8px 30px rgba(0, 0, 0, 0.12)',
        'glow-blue': 'var(--shadow-glow-blue)',
        'glow-red': 'var(--shadow-glow-red)',
        'glow-orange': 'var(--shadow-glow-orange)',
      },

      /* ===========================
         TRANSITIONS & ANIMATIONS
         =========================== */
      transition: {
        'fast': 'var(--transition-fast)',
        'base': 'var(--transition-base)',
        'slow': 'var(--transition-slow)',
        'slower': 'var(--transition-slower)',
      },

      transitionTimingFunction: {
        'ease-out': 'var(--ease-out)',
        'ease-in-out': 'var(--ease-in-out)',
      },

      animation: {
        'fade-in': 'fadeIn var(--transition-slow) ease',
        'slide-up': 'slideUp var(--transition-slow) ease',
        'scale': 'scale var(--transition-base) ease',
      },

      /* ===========================
         CUSTOM Z-INDEX
         =========================== */
      zIndex: {
        'dropdown': 'var(--z-dropdown)',
        'sticky': 'var(--z-sticky)',
        'modal-backdrop': 'var(--z-modal-backdrop)',
        'modal': 'var(--z-modal)',
        'tooltip': 'var(--z-tooltip)',
        'notification': 'var(--z-notification)',
      },

      /* ===========================
         LINE HEIGHT
         =========================== */
      lineHeight: {
        'tight': '1.15',
        'normal': '1.5',
        'relaxed': '1.7',
      },

      /* ===========================
         LETTER SPACING
         =========================== */
      letterSpacing: {
        'tight': '-0.02em',
        'normal': '0em',
        'wide': '0.5px',
      },
    },
  },
  plugins: [],
};

export default config;
