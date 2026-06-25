"use client";

import { Flex, Heading, Button, Icon } from "@chakra-ui/react";
import { MdOutlineAdd } from "react-icons/md";

interface HeaderProps {
  activeTab: "ativos" | "respondidos";
  setActiveTab: (tab: "ativos" | "respondidos") => void;
  onOpenCadastro: () => void; // Nova propriedade
}

export function Header({
  activeTab,
  setActiveTab,
  onOpenCadastro,
}: HeaderProps) {
  return (
    <Flex
      as="header"
      h="16"
      bg="brand.surfaceContainerLowest"
      borderBottom="1px solid"
      borderColor="brand.outlineVariant"
      px={10}
      align="center"
      justify="space-between"
      pos="sticky"
      top={0}
      zIndex={30}
    >
      <Flex align="center" gap={8} h="full">
        <Heading size="sm" color="brand.primary">
          Painel de Controle
        </Heading>

        <Flex gap={6} h="full" align="center">
          <Flex
            h="full"
            align="center"
            borderBottom={activeTab === "ativos" ? "2px solid" : "none"}
            borderColor="brand.secondary"
            color={
              activeTab === "ativos"
                ? "brand.secondary"
                : "brand.onSurfaceVariant"
            }
            fontWeight="bold"
            cursor="pointer"
            onClick={() => setActiveTab("ativos")}
          >
            Expedientes
          </Flex>

          <Flex
            h="full"
            align="center"
            borderBottom={activeTab === "respondidos" ? "2px solid" : "none"}
            borderColor="brand.secondary"
            color={
              activeTab === "respondidos"
                ? "brand.secondary"
                : "brand.onSurfaceVariant"
            }
            fontWeight="bold"
            cursor="pointer"
            onClick={() => setActiveTab("respondidos")}
          >
            Respondidos
          </Flex>
        </Flex>
      </Flex>

      {/* Botão agora chama a função para abrir o Modal */}
      <Button
        leftIcon={<Icon as={MdOutlineAdd} boxSize={5} />}
        bg="brand.secondary"
        color="white"
        _hover={{ bg: "brand.primary" }}
        size="sm"
        onClick={onOpenCadastro}
      >
        Novo Expediente
      </Button>
    </Flex>
  );
}
