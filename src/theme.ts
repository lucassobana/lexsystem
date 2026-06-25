import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  colors: {
    brand: {
      primary: "#001a48",
      secondary: "#0054cd",
      surface: "#f8f9ff",
      surfaceContainerLowest: "#ffffff",
      surfaceContainerLow: "#eff4ff",
      surfaceContainerHigh: "#dce9ff",
      outlineVariant: "#c4c6d2",
      error: "#ba1a1a",
      errorContainer: "#ffdad6",
      onSurface: "#0d1c2e",
      onSurfaceVariant: "#444651",
      orange100: "#ffedd5",
      orange800: "#9a3412",
    }
  },
  fonts: {
    heading: "'Inter', sans-serif",
    body: "'Inter', sans-serif",
  },
  styles: {
    global: {
      body: {
        bg: "brand.surface",
        color: "brand.onSurface",
      }
    }
  }
});