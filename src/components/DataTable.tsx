"use client";

import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Box,
  Text,
  Select,
  Input,
  Flex,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
} from "@chakra-ui/react";
import { DayPicker } from 'react-day-picker';
import { ptBR } from 'date-fns/locale';
import { format, parse } from 'date-fns';
import 'react-day-picker/dist/style.css';
import { Expediente, StatusExpediente } from "@/types";
import { useExpedientes } from "@/contexts/ExpedienteContext";
import { COLORS } from "@/colors/colors";

interface DataTableProps {
  data: Expediente[];
  isRespondidosTab?: boolean;
}

const statusStyles = {
  Iniciar: {
    bg: COLORS.brand.iniciar,
    color: COLORS.brandText.text,
  },
  Entregar: {
    bg: COLORS.brand.entregar,
    color: COLORS.brandText.text,
  },
  Ciência: {
    bg: COLORS.brand.ciencia,
    color: COLORS.brandText.text,
  },
  Responder: {
    bg: COLORS.brand.responder,
    color: COLORS.brandText.text,
  },
  Respondido: {
    bg: COLORS.brand.respondido,
    color: COLORS.brandText.text,
  },
  Entregue: {
    bg: COLORS.brand.entregue,
    color: COLORS.brandText.text,
  },
};

export function DataTable({ data, isRespondidosTab = false }: DataTableProps) {
  const { updateExpediente } = useExpedientes();

  // Mantendo a ordenação por data (recente para antigo)
  // Substitua a linha do sortedData por esta:
  const sortedData = [...data].sort(
    (a, b) => new Date(a.data).getTime() - new Date(b.data).getTime(),
  );

  return (
    <Box overflowX="auto" w="full">
      {/* Aumentado a largura para preencher melhor o espaço */}
      <Table variant="unstyled" size="md" w="full" sx={{ minWidth: "1200px" }}>
        <Thead
          bg="#d5d5d5"
          borderBottom="1px solid"
          borderColor="brand.outlineVariant"
        >
          <Tr>
            <Th
              py={4}
              textAlign="center"
              color="brand.onSurfaceVariant"
              fontSize="xs"
              textTransform="uppercase"
            >
              Data
            </Th>
            <Th
              py={4}
              textAlign="center"
              color="brand.onSurfaceVariant"
              fontSize="xs"
              textTransform="uppercase"
            >
              Expediente
            </Th>
            <Th
              py={4}
              textAlign="center"
              color="brand.onSurfaceVariant"
              fontSize="xs"
              textTransform="uppercase"
            >
              Nº do Processo
            </Th>
            <Th
              py={4}
              textAlign="center"
              color="brand.onSurfaceVariant"
              fontSize="xs"
              textTransform="uppercase"
            >
              Partes
            </Th>
            <Th
              py={4}
              textAlign="center"
              color="brand.onSurfaceVariant"
              fontSize="xs"
              textTransform="uppercase"
            >
              Comarca
            </Th>
            <Th
              py={4}
              textAlign="center"
              color="brand.onSurfaceVariant"
              fontSize="xs"
              textTransform="uppercase"
            >
              Honorários (R$)
            </Th>
            <Th
              py={4}
              textAlign="start"
              color="brand.onSurfaceVariant"
              fontSize="xs"
              textTransform="uppercase"
            >
              Situação/Histórico
            </Th>
            <Th
              py={4}
              textAlign="center"
              color="brand.onSurfaceVariant"
              fontSize="xs"
              textTransform="uppercase"
            >
              Nome
            </Th>
            {isRespondidosTab && (
              <Th
                py={4}
                textAlign="center"
                color="brand.onSurfaceVariant"
                fontSize="xs"
              >
                Recebido?
              </Th>
            )}
          </Tr>
        </Thead>
        <Tbody>
          {sortedData.map((item) => (
            <Tr
              key={item.id}
              _hover={{ bg: "brand.surfaceContainerLow" }}
              borderBottom="1px solid"
              borderColor="brand.outlineVariant"
              transition="all 0.2s"
            >
              {/* DATA - Largura fixa pequena */}
              <Td textAlign="center" w="150px">
                <Popover>
                  <PopoverTrigger>
                    <Input
                      value={format(
                        parse(item.data, "yyyy-MM-dd", new Date()),
                        "dd/MM/yyyy",
                      )}
                      readOnly
                      cursor="pointer"
                      size="sm"
                      variant="unstyled"
                      textAlign="center"
                    />
                  </PopoverTrigger>
                  <PopoverContent w="auto">
                    <PopoverBody>
                      <DayPicker
                        mode="single"
                        selected={parse(item.data, "yyyy-MM-dd", new Date())}
                        onSelect={(date) => {
                          if (date)
                            updateExpediente(
                              item.id,
                              "data",
                              format(date, "yyyy-MM-dd"),
                            );
                        }}
                        locale={ptBR}
                      />
                    </PopoverBody>
                  </PopoverContent>
                </Popover>
              </Td>

              {/* EXPEDIENTE - Centralizado */}
              <Td textAlign="center" w="180px">
                <Flex justify="center">
                  <Select
                    size="xs" /* Alterado de "xs" para "sm" para um tamanho maior */
                    fontWeight="bold"
                    textAlign="center"
                    textTransform="uppercase"
                    borderRadius="md"
                    py={2} /* Aumentado o padding vertical */
                    pl={2}
                    h="30px" /* Altura definida explicitamente para maior área de clique */
                    bg={statusStyles[item.status].bg}
                    color={statusStyles[item.status].color}
                    value={item.status}
                    onChange={(e) =>
                      updateExpediente(
                        item.id,
                        "status",
                        e.target.value as StatusExpediente,
                      )
                    }
                  >
                    {Object.keys(statusStyles).map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </Select>
                </Flex>
              </Td>

              <Td
                textAlign="center"
                fontSize="sm"
                color="brand.secondary"
                textDecoration="underline"
                textDecorationStyle="dotted"
                w="150px"
              >
                {item.numeroProcesso}
              </Td>

              {/* PARTES - Ocupa espaço flexível, sem largura máxima */}
              {/* PARTES - Ocupa espaço flexível e quebra o "vs." em uma nova linha para melhor legibilidade */}
              <Td textAlign="start" fontSize="sm" px={4} whiteSpace="normal">
                <Flex direction="column" align="center" gap={1}>
                  <Text fontWeight="bold" fontSize="sm" lineHeight="1.2">
                    {item.partes.split(" vs. ")[0]}
                  </Text>
                  <Text fontWeight="bold" fontSize="sm" lineHeight="1.2">
                    {item.partes.split(" vs. ")[1] || ""}
                  </Text>
                </Flex>
              </Td>

              <Td textAlign="center" fontSize="sm" w="120px">
                {item.comarca}
              </Td>

              <Td
                textAlign="center"
                fontSize="sm"
                fontWeight="medium"
                w="120px"
              >
                {item.honorarios.toLocaleString("pt-BR", {
                  minimumFractionDigits: 2,
                })}
              </Td>

              {/* HISTÓRICO - Ocupa espaço flexível, sem largura máxima */}
              <Td textAlign="center" fontSize="sm" px={4} whiteSpace="normal">
                <Flex align="center" justify="center" gap={2}>
                  <Box
                    w={2}
                    h={2}
                    borderRadius="full"
                    flexShrink={0}
                    bg={statusStyles[item.status].bg}
                  />
                  <Input
                    variant="unstyled"
                    size="sm"
                    fontSize="sm"
                    value={item.situacaoHistorico}
                    onChange={(e) =>
                      updateExpediente(
                        item.id,
                        "situacaoHistorico",
                        e.target.value,
                      )
                    }
                  />
                </Flex>
              </Td>

              <Td textAlign="center" fontSize="sm" w="120px">
                {item.nome}
              </Td>

              {isRespondidosTab && (
                <Td textAlign="center" w="100px">
                  <Select
                    variant="unstyled"
                    size="sm"
                    value={item.honorariosRecebidos || "Não"}
                    onChange={(e) =>
                      updateExpediente(
                        item.id,
                        "honorariosRecebidos",
                        e.target.value,
                      )
                    }
                  >
                    <option value="Sim">Sim</option>
                    <option value="Não">Não</option>
                  </Select>
                </Td>
              )}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
}
