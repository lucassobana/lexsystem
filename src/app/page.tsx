"use client";

import { Box, Flex, Heading, Icon, useDisclosure } from "@chakra-ui/react";
import { useState } from "react";
import { DataTable } from "@/components/DataTable";
import { useExpedientes } from "@/contexts/ExpedienteContext";
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import { StatsGrid } from "@/components/StatsGrid";
import { CadastroModal } from "@/components/CadastroModal";
import { MdOutlineFolderOpen } from "react-icons/md";

export default function Dashboard() {
  const { expedientes } = useExpedientes();
  const [activeTab, setActiveTab] = useState<"ativos" | "respondidos">("ativos");
  const { isOpen, onOpen, onClose } = useDisclosure();

  const ativos = expedientes.filter(
    (e) => e.status !== "Respondido" && e.status !== "Entregue",
  );
  const currentData =
    activeTab === "ativos"
      ? ativos
      : expedientes.filter(
          (e) => e.status === "Respondido" || e.status === "Entregue",
        );

  return (
    <Flex minH="100vh">
      <Sidebar />
      <Box flex="1" ml={{ base: "0", md: "80px" }}>
        <Header
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onOpenCadastro={onOpen}
        />

        <Box p={10} maxW="2000px" mx="auto">
          <StatsGrid expedientes={expedientes} />

          <Box
            bg="brand.surfaceContainerLowest"
            border="1px solid"
            borderColor="brand.outlineVariant"
            borderRadius="lg"
            overflow="hidden"
            mb={8}
          >
            <Flex
              p={4}
              borderBottom="1px solid"
              borderColor="brand.outlineVariant"
              bg="brand.surfaceContainerLow"
              align="center"
              justify="space-between"
            >
              <Flex align="center" gap={2} color="brand.primary">
                <Icon as={MdOutlineFolderOpen} boxSize={5} />
                <Heading size="sm">Fila de Expedientes</Heading>
              </Flex>
            </Flex>
            <DataTable
              data={currentData}
              isRespondidosTab={activeTab === "respondidos"}
            />
          </Box>
        </Box>
      </Box>
      <CadastroModal isOpen={isOpen} onClose={onClose} />
    </Flex>
  );
}