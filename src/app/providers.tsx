"use client";
import { ChakraProvider } from "@chakra-ui/react";
import { ExpedienteProvider } from "@/contexts/ExpedienteContext";
import { theme } from "@/theme";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ChakraProvider theme={theme}>
      <ExpedienteProvider>{children}</ExpedienteProvider>
    </ChakraProvider>
  );
}
