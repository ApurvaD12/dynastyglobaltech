/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Premium dark navy + electric blue + gold accent
        primary: { DEFAULT: '#0d1117', light: '#161b22', 50: '#f0f6ff' },
        navy: '#0a192f',
        accent: { DEFAULT: '#2563eb', light: '#3b82f6', dark: '#1d4ed8', glow: '#60a5fa' },
        gold: { DEFAULT: '#f59e0b', light: '#fbbf24' },
        emerald: { DEFAULT: '#10b981', light: '#34d399' },
        surface: '#1e293b',
        muted: '#64748b',
        light: '#f8fafc',
        border: '#e2e8f0'
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Inter', 'system-ui', 'sans-serif']
      },
      animation: {
        'fade-up': 'fadeUp 0.7s ease-out forwards',
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'slide-right': 'slideRight 0.6s ease-out forwards',
        'float': 'float 4s ease-in-out infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'gradient': 'gradient 6s ease infinite',
        'counter': 'counter 2s ease-out forwards',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        fadeUp: { '0%': { opacity: '0', transform: 'translateY(40px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        fadeIn: { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        slideRight: { '0%': { opacity: '0', transform: 'translateX(-40px)' }, '100%': { opacity: '1', transform: 'translateX(0)' } },
        float: { '0%,100%': { transform: 'translateY(0px)' }, '50%': { transform: 'translateY(-16px)' } },
        gradient: { '0%,100%': { backgroundPosition: '0% 50%' }, '50%': { backgroundPosition: '100% 50%' } },
        glow: { '0%': { boxShadow: '0 0 20px rgba(37,99,235,0.3)' }, '100%': { boxShadow: '0 0 40px rgba(37,99,235,0.6)' } },
      },
      backgroundSize: { '300%': '300%' },
      boxShadow: {
        'glow': '0 0 30px rgba(37,99,235,0.25)',
        'glow-gold': '0 0 30px rgba(245,158,11,0.25)',
        'card': '0 4px 24px rgba(0,0,0,0.06)',
        'card-hover': '0 12px 40px rgba(0,0,0,0.12)',
      }
    }
  },
  plugins: []
};
