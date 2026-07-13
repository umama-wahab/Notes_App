/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#4F46E5',
          hover: '#4338CA',
          dark: '#6366F1'
        },
        accent: {
          DEFAULT: '#06B6D4',
          dark: '#22D3EE'
        },
        success: '#22C55E',
        danger: '#EF4444',
        light: {
          bg: '#F8FAFC',
          surface: '#FFFFFF',
          textPrimary: '#0F172A',
          textSecondary: '#64748B',
          border: '#E2E8F0'
        },
        dark: {
          bg: '#0F172A',
          surface: '#1E293B',
          textPrimary: '#F8FAFC',
          textSecondary: '#94A3B8',
          border: '#334155'
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif']
      },
      animation: {
        'fade-in': 'fadeIn 0.2s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' }
        }
      }
    }
  },
  plugins: []
}
