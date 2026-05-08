import { createTheme, rem } from "@mantine/core";

export const theme = createTheme({
  primaryColor: "green",

  colors: {
    green: [
      "#eef8f0",
      "#d8efdc",
      "#b0dfbb",
      "#84cf96",
      "#5dc078",
      "#46b866",
      "#3ab45c",
      "#2f9d4e",
      "#268b44",
      "#157e34",
    ],

    gray: [
      "#f8f9fa",
      "#f1f3f5",
      "#e9ecef",
      "#dee2e6",
      "#ced4da",
      "#adb5bd",
      "#868e96",
      "#495057",
      "#343a40",
      "#212529",
    ],
  },

  primaryShade: {
    light: 6,
    dark: 8,
  },

  white: "#FFFFFF",
  black: "#1F2933",

  fontFamily:
    "Poppins, Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, sans-serif",

  headings: {
    fontFamily:
      "Poppins, Inter, ui-sans-serif, system-ui, sans-serif",

    fontWeight: "600",

    sizes: {
      h1: {
        fontSize: rem(40),
        lineHeight: "1.2",
      },

      h2: {
        fontSize: rem(32),
        lineHeight: "1.25",
      },

      h3: {
        fontSize: rem(28),
        lineHeight: "1.3",
      },

      h4: {
        fontSize: rem(24),
        lineHeight: "1.35",
      },

      h5: {
        fontSize: rem(20),
        lineHeight: "1.4",
      },

      h6: {
        fontSize: rem(18),
        lineHeight: "1.45",
      },
    },
  },

  radius: {
    xs: rem(6),
    sm: rem(10),
    md: rem(14),
    lg: rem(20),
    xl: rem(28),
  },

  spacing: {
    xs: rem(8),
    sm: rem(12),
    md: rem(16),
    lg: rem(24),
    xl: rem(32),
  },

  shadows: {
    xs: "0 1px 2px rgba(0,0,0,0.04)",

    sm: "0 2px 6px rgba(0,0,0,0.06)",

    md: "0 4px 12px rgba(0,0,0,0.08)",

    lg: "0 8px 24px rgba(0,0,0,0.10)",

    xl: "0 12px 32px rgba(0,0,0,0.12)",
  },

  components: {
    Button: {
      defaultProps: {
        radius: "md",
        size: "md",
      },

      styles: {
        root: {
          fontWeight: 500,
          transition: "all 150ms ease",
        },
      },
    },

    Card: {
      defaultProps: {
        radius: "lg",
        shadow: "sm",
        padding: "lg",
        withBorder: true,
      },

      styles: {
        root: {
          borderColor: "#E9ECEF",
          backgroundColor: "#FFFFFF",
        },
      },
    },

    Paper: {
      defaultProps: {
        radius: "lg",
        shadow: "xs",
      },
    },

    Input: {
      defaultProps: {
        radius: "md",
        size: "md",
      },

      styles: {
        input: {
          borderColor: "#DEE2E6",
          backgroundColor: "#FFFFFF",

          "&:focus": {
            borderColor: "#2F9D4E",
          },
        },
      },
    },

    TextInput: {
      defaultProps: {
        radius: "md",
      },
    },

    Modal: {
      defaultProps: {
        radius: "lg",
        centered: true,
      },
    },

    Drawer: {
      defaultProps: {
        radius: "lg",
      },
    },

    Badge: {
      defaultProps: {
        radius: "xl",
        variant: "light",
      },
    },

    NavLink: {
      styles: {
        root: {
          borderRadius: rem(12),
        },
      },
    },

    ActionIcon: {
      defaultProps: {
        radius: "md",
        variant: "subtle",
      },
    },

    Tooltip: {
      defaultProps: {
        radius: "md",
        withArrow: true,
      },
    },
  },

  other: {
    layout: {
      sidebarWidth: 280,
      headerHeight: 72,
      mapControlsSize: 44,
    },

    map: {
      pointSize: 18,
      selectedPointSize: 24,
      routeStrokeWidth: 6,
    },
  },
});