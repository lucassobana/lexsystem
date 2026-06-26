"use client";

import { useState, useEffect } from "react";
import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider } from "@chakra-ui/react";
import { ExpedienteProvider } from "@/contexts/ExpedienteContext";
import { theme } from "@/theme";

export function Providers({ children }: { children: React.ReactNode }) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <div style={{ minHeight: "100vh", backgroundColor: "#f8f9ff" }} />;
  }

  return (
    <CacheProvider>
      <ChakraProvider theme={theme}>
        <ExpedienteProvider>{children}</ExpedienteProvider>
      </ChakraProvider>
    </CacheProvider>
  );
}
