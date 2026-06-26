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
  useDisclosure,
  IconButton,
} from "@chakra-ui/react";
import { DayPicker } from "react-day-picker";
import { ptBR } from "date-fns/locale";
import { format, parse } from "date-fns";
import "react-day-picker/dist/style.css";
import { Expediente, StatusExpediente } from "@/types";
import { useExpedientes } from "@/contexts/ExpedienteContext";
import { COLORS } from "@/colors/colors";
import { useState } from "react";
import { MdEdit } from "react-icons/md";
import { CadastroModal } from "./CadastroModal";

interface DataTableProps {
  data: Expediente[];
  isRespondidosTab?: boolean;
}

const statusStyles = {
  Iniciar: { bg: COLORS.brand.iniciar, color: COLORS.brandText.text },
  Entregar: { bg: COLORS.brand.entregar, color: COLORS.brandText.text },
  Ciência: { bg: COLORS.brand.ciencia, color: COLORS.brandText.text },
  Responder: { bg: COLORS.brand.responder, color: COLORS.brandText.text },
  Respondido: { bg: COLORS.brand.respondido, color: COLORS.brandText.text },
  Entregue: { bg: COLORS.brand.entregue, color: COLORS.brandText.text },
};

const EditableTextInput = ({
  initialValue,
  onSave,
}: {
  initialValue: string;
  onSave: (val: string) => void;
}) => {
  const [value, setValue] = useState(initialValue);
  const [prevInitial, setPrevInitial] = useState(initialValue);

  if (initialValue !== prevInitial) {
    setValue(initialValue);
    setPrevInitial(initialValue);
  }

  const handleBlur = () => {
    if (value !== initialValue) {
      onSave(value);
    }
  };

  return (
    <Input
      variant="unstyled"
      size="sm"
      fontSize="sm"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onBlur={handleBlur}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.currentTarget.blur();
        }
      }}
    />
  );
};

export function DataTable({ data, isRespondidosTab = false }: DataTableProps) {
  const { updateExpediente } = useExpedientes();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedExpediente, setSelectedExpediente] =
    useState<Expediente | null>(null);

  const sortedData = [...data].sort(
    (a, b) => new Date(a.data).getTime() - new Date(b.data).getTime(),
  );

  const handleEditClick = (item: Expediente) => {
    setSelectedExpediente(item);
    onOpen();
  };

  const handleCloseModal = () => {
    setSelectedExpediente(null); // Limpa o item ao fechar
    onClose();
  };

  return (
    <Box overflowX="auto" w="full">
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
            <Th
              py={4}
              textAlign="center"
              color="brand.onSurfaceVariant"
              fontSize="xs"
              textTransform="uppercase"
              w="60px"
            >
              Ações
            </Th>
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

              <Td textAlign="center" w="200px">
                <Flex justify="center">
                  <Select
                    size="sm"
                    fontWeight="bold"
                    textAlign="center"
                    textTransform="uppercase"
                    borderRadius="md"
                    h="30px"
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

              <Td textAlign="center" fontSize="sm" px={4} whiteSpace="normal">
                <Flex align="center" justify="center" gap={2}>
                  <Box
                    w={2}
                    h={2}
                    borderRadius="full"
                    flexShrink={0}
                    bg={statusStyles[item.status].bg}
                  />
                  <EditableTextInput
                    initialValue={item.situacaoHistorico}
                    onSave={(newVal) =>
                      updateExpediente(item.id, "situacaoHistorico", newVal)
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

              <Td textAlign="center" w="60px" px={2}>
                <IconButton
                  aria-label="Editar Expediente"
                  icon={<MdEdit size={18} />}
                  size="sm"
                  variant="ghost" // "ghost" deixa sem fundo até o rato passar por cima
                  colorScheme="gray"
                  color="brand.secondary"
                  onClick={() => handleEditClick(item)}
                  _hover={{ bg: "brand.surfaceContainerHigh" }}
                />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      <CadastroModal
        isOpen={isOpen}
        onClose={handleCloseModal}
        expedienteToEdit={selectedExpediente}
      />
    </Box>
  );
}
