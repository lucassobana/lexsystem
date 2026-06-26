"use client";

import { Box, Flex, Text, SimpleGrid } from "@chakra-ui/react";
import { Expediente } from "@/types";

interface StatsGridProps {
  expedientes: Expediente[];
}

export function StatsGrid({ expedientes }: StatsGridProps) {
  // Data de hoje formatada como 'YYYY-MM-DD' para comparar com o input type="date"
  const hoje = new Date().toISOString().split('T')[0];

  // Expedientes ativos
  const ativos = expedientes.filter(e => e.status !== "Respondido" && e.status !== "Entregue");
  
  // Prazos de hoje: expedientes ativos com data igual a hoje
  const prazosHoje = ativos.filter(e => e.data === hoje);

  // Total Honorários Recebidos
  const totalHonorariosRecebidos = expedientes
    .filter(e => (e.status === "Respondido" || e.status === "Entregue") && e.honorariosRecebidos === "Sim")
    .reduce((acc, curr) => acc + curr.honorarios, 0);

  return (
    <SimpleGrid columns={{ base: 1, sm: 2, lg: 3 }} spacing={6} mb={8}>
      {/* Card 1: Aguardando Resposta */}
      <Box bg="brand.surfaceContainerLowest" border="1px solid" borderColor="brand.outlineVariant" p={5} borderRadius="lg">
        <Text fontSize="xs" color="brand.onSurfaceVariant" mb={1} fontWeight="semibold">Aguardando Resposta</Text>
        <Flex align="flex-end" justify="space-between">
          <Text fontSize="3xl" fontWeight="bold" color="brand.primary">{ativos.length}</Text>
        </Flex>
      </Box>

      {/* Card 2: Prazos de Hoje (Funcional) */}
      <Box bg="brand.surfaceContainerLowest" border="1px solid" borderColor="brand.outlineVariant" p={5} borderRadius="lg">
        <Text fontSize="xs" color="brand.onSurfaceVariant" mb={1} fontWeight="semibold">Prazos de Hoje</Text>
        <Flex align="flex-end" justify="space-between">
          <Text fontSize="3xl" fontWeight="bold" color="brand.primary">{prazosHoje.length}</Text>
          <Text fontSize="xs" color={prazosHoje.length > 0 ? "brand.error" : "brand.onSurfaceVariant"} fontWeight="bold">
            {prazosHoje.length > 0 ? "Atenção" : "Em dia"}
          </Text>
        </Flex>
      </Box>

      {/* Card 3: Total Honorários Recebidos */}
      <Box bg="brand.surfaceContainerLowest" border="1px solid" borderColor="brand.outlineVariant" p={5} borderRadius="lg">
        <Text fontSize="xs" color="brand.onSurfaceVariant" mb={1} fontWeight="semibold">Total em Honorários Recebidos</Text>
        <Flex align="flex-end" justify="space-between">
          <Text fontSize="3xl" fontWeight="bold" color="brand.secondary">
            {totalHonorariosRecebidos.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
          </Text>
        </Flex>
      </Box>
    </SimpleGrid>
  );
}