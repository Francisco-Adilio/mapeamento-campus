import { createTheme, MantineTheme } from '@mantine/core';

export const ifscTheme = createTheme({
  colors: {
    'ifsc-green': [
      '#e8f5e9',
      '#c8e6c9',
      '#a5d6a7',
      '#81c784',
      '#66bb6a',
      '#4caf50',
      '#43a047',
      '#388e3c',
      '#2e7d32',
      '#1b5e20',
    ],
    'ifsc-red': [
      '#ffebee',
      '#ffcdd2',
      '#ef9a9a',
      '#e57373',
      '#ef5350',
      '#f44336',
      '#e53935',
      '#d32f2f',
      '#c62828',
      '#b71c1c',
    ],
  },
  primaryColor: 'ifsc-green',
  primaryShade: 6,
  fontFamily:
    'Inter, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, -apple-system, BlinkMacSystemFont',
  headings: { fontFamily: 'Inter, system-ui, -apple-system, "Segoe UI", Roboto' },
  radius: { xs: '4px', sm: '6px', md: '8px', lg: '12px', xl: '16px' },
  spacing: { xs: '8px', sm: '12px', md: '16px', lg: '24px', xl: '32px' },
  shadows: {
    xs: '0 1px 2px rgba(16,24,40,0.04)',
    sm: '0 2px 6px rgba(16,24,40,0.08)',
    md: '0 6px 18px rgba(16,24,40,0.12)',
    lg: '0 12px 30px rgba(16,24,40,0.16)',
    xl: '0 24px 60px rgba(16,24,40,0.2)',
  },
  components: {
    Button: {
      defaultProps: { radius: 'md' },
      styles: {
        root: {
          fontWeight: 600,
          borderRadius: '8px',
        },
        outline: {
          borderColor: '#4caf50',
        },
      },
    },
    Card: {
      styles: {
        root: {
          borderRadius: '8px',
          boxShadow: '0 2px 6px rgba(16,24,40,0.08)',
        },
      },
    },
    Badge: {
      styles: {
        dot: {
          backgroundColor: '#e53935',
        },
      },
    },
    Tooltip: {
      defaultProps: { color: 'ifsc-green' },
    },
  },
});

export default ifscTheme;
