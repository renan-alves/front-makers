import { ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

type Provider = 'google' | 'linkedin' | 'github';

interface SocialAuthButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  provider: Provider;
}

const providerStyles: Record<Provider, string> = {
  google:
    'border-[#E0E0E0] bg-white text-[#1A1A1A] hover:bg-[#F7F7F7]',
  linkedin: 'border-transparent bg-[#0A66C2] text-white hover:bg-[#004182]',
  github: 'border-transparent bg-[#111111] text-white hover:bg-black',
};

const providerLabels: Record<Provider, string> = {
  google: 'Continue with Google',
  linkedin: 'Continue with LinkedIn',
  github: 'Continue with GitHub',
};

export default function SocialAuthButton({
  provider,
  className,
  ...props
}: SocialAuthButtonProps) {
  const label = providerLabels[provider];

  return (
    <button
      type="button"
      className={cn(
        'w-full flex items-center justify-center gap-3 rounded-lg border px-4 py-2.5 text-sm font-semibold transition-colors',
        providerStyles[provider],
        className
      )}
      aria-label={label}
      {...props}
    >
      {provider === 'google' && (
        <svg
          aria-hidden="true"
          width="18"
          height="18"
          viewBox="0 0 18 18"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M17.64 9.2045c0-.638-.0573-1.251-.1636-1.84H9v3.481h4.8446a4.14 4.14 0 0 1-1.795 2.72v2.259h2.908c1.7017-1.567 2.6824-3.874 2.6824-6.62Z"
            fill="#4285F4"
          />
          <path
            d="M9 18c2.43 0 4.467-0.806 5.956-2.188l-2.908-2.259c-.806.54-1.84.86-3.048.86-2.345 0-4.332-1.583-5.04-3.71H0.955v2.332C2.435 16.09 5.477 18 9 18Z"
            fill="#34A853"
          />
          <path
            d="M3.96 10.703a5.4 5.4 0 0 1-.282-1.703c0-.591.102-1.166.282-1.703V4.965H0.955A8.999 8.999 0 0 0 0 9c0 1.452.347 2.828.955 4.035l3.005-2.332Z"
            fill="#FBBC05"
          />
          <path
            d="M9 3.58c1.322 0 2.507.455 3.44 1.35l2.58-2.58C13.46.91 11.43 0 9 0 5.477 0 2.435 1.91.955 4.965l3.005 2.332C4.668 5.163 6.655 3.58 9 3.58Z"
            fill="#EA4335"
          />
        </svg>
      )}
      {provider === 'linkedin' && (
        <svg
          aria-hidden="true"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
        >
          <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6 1.12 6 0 4.88 0 3.5 0 2.12 1.12 1 2.5 1c1.37 0 2.48 1.12 2.48 2.5ZM0.5 8.5H4.5V24H0.5V8.5ZM8.5 8.5H12.33V10.62H12.38C12.91 9.62 14.21 8.57 16.19 8.57 20.33 8.57 21.5 11.12 21.5 15.02V24H17.5V15.82C17.5 13.87 17.46 11.38 14.83 11.38 12.16 11.38 11.75 13.52 11.75 15.68V24H7.75V8.5H8.5Z" />
        </svg>
      )}
      {provider === 'github' && (
        <svg
          aria-hidden="true"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
        >
          <path d="M12 0.5C5.37 0.5 0 5.87 0 12.5c0 5.29 3.438 9.78 8.205 11.365.6.113.82-.26.82-.577 0-.285-.01-1.04-.015-2.04-3.338.727-4.042-1.61-4.042-1.61-.546-1.388-1.333-1.758-1.333-1.758-1.09-.745.083-.73.083-.73 1.205.085 1.84 1.238 1.84 1.238 1.07 1.834 2.807 1.304 3.492.997.108-.776.418-1.305.762-1.605-2.665-.305-5.467-1.333-5.467-5.933 0-1.31.468-2.38 1.236-3.22-.124-.304-.536-1.53.116-3.19 0 0 1.008-.322 3.3 1.23a11.48 11.48 0 0 1 3.005-.404c1.02.005 2.045.138 3.005.404 2.29-1.552 3.296-1.23 3.296-1.23.654 1.66.242 2.886.118 3.19.77.84 1.234 1.91 1.234 3.22 0 4.61-2.807 5.624-5.48 5.92.43.37.823 1.1.823 2.22 0 1.604-.015 2.896-.015 3.29 0 .32.216.694.825.576C20.565 22.276 24 17.787 24 12.5 24 5.87 18.63 0.5 12 0.5Z" />
        </svg>
      )}
      {label}
    </button>
  );
}
