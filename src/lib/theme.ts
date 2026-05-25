/**
 * Design System Tokens for AI Project Architect
 * Focused on premium, high-end SaaS aesthetics (dark theme, glassmorphism, neon glow)
 */

export const theme = {
  colors: {
    background: {
      deep: '#030303',
      dark: '#0A0A0B',
      card: 'rgba(17, 17, 19, 0.7)',
    },
    primary: {
      DEFAULT: '#8B5CF6', // Vivid Purple
      glow: 'rgba(139, 92, 246, 0.5)',
      vibrant: '#A78BFA',
    },
    accent: {
      DEFAULT: '#06B6D4', // Neon Cyan/Blue
      glow: 'rgba(6, 182, 212, 0.5)',
      vibrant: '#22D3EE',
    },
    text: {
      primary: '#F8FAFC',
      secondary: '#94A3B8',
      muted: '#64748B',
    },
    border: {
      glass: 'rgba(255, 255, 255, 0.08)',
      glow: 'rgba(139, 92, 246, 0.3)',
    }
  },
  gradients: {
    primary: 'linear-gradient(135deg, #8B5CF6 0%, #06B6D4 100%)',
    surface: 'linear-gradient(180deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0) 100%)',
    glow: 'radial-gradient(circle at 50% 50%, rgba(139, 92, 246, 0.15), transparent 70%)',
  },
  glassmorphism: {
    background: 'rgba(10, 10, 11, 0.8)',
    blur: '12px',
    border: '1px solid rgba(255, 255, 255, 0.1)',
  },
  animations: {
    transition: {
      duration: 0.3,
      ease: [0.23, 1, 0.32, 1], // Custom cubic-bezier for premium feel
    }
  }
};
