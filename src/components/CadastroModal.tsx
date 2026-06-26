"use client";

import { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  SimpleGrid,
  Textarea,
  Popover,
  PopoverTrigger,
  InputRightElement,
  Icon,
  InputGroup,
  PopoverContent,
  PopoverBody,
} from "@chakra-ui/react";
import { DayPicker } from "react-day-picker";
import { ptBR } from "date-fns/locale";
import { format, parse } from "date-fns";
import "react-day-picker/dist/style.css";
import { useExpedientes } from "@/contexts/ExpedienteContext";
import { StatusExpediente, Expediente } from "@/types";
import { MdOutlineCalendarToday } from "react-icons/md";

interface CadastroModalProps {
  isOpen: boolean;
  onClose: () => void;
  expedienteToEdit?: Expediente | null; // Nova prop opcional
}

const estadoInicial = {
  data: new Date().toISOString().split("T")[0],
  status: "Iniciar" as StatusExpediente,
  numeroProcesso: "",
  partes: "",
  comarca: "",
  honorarios: 0,
  situacaoHistorico: "",
  nome: "",
};

export function CadastroModal({
  isOpen,
  onClose,
  expedienteToEdit,
}: CadastroModalProps) {
  const { addExpediente, updateExpedienteFull } = useExpedientes();
  const [formData, setFormData] = useState<Expediente | typeof estadoInicial>(estadoInicial);

  const [prevIsOpen, setPrevIsOpen] = useState(isOpen);
  const [prevExp, setPrevExp] = useState(expedienteToEdit);

  if (isOpen !== prevIsOpen || expedienteToEdit !== prevExp) {
    setPrevIsOpen(isOpen);
    setPrevExp(expedienteToEdit);
    
    if (isOpen) {
      // Se o modal abrir, preenche com os dados de edição ou limpa o form
      setFormData(expedienteToEdit ? expedienteToEdit : estadoInicial);
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (expedienteToEdit) {
      // EDITA SE TIVER ID
      await updateExpedienteFull(expedienteToEdit.id, formData);
    } else {
      // CRIA SE NÃO TIVER (Forçamos o tipo Omit para ignorar o id na criação)
      await addExpediente(formData as Omit<Expediente, "id">);
    }

    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="2xl"
      motionPreset="slideInBottom"
    >
      <ModalOverlay backdropFilter="blur(3px)" />

      <ModalContent
        as="form"
        onSubmit={handleSubmit}
        bg="brand.surfaceContainerLowest"
      >
        <ModalHeader color="brand.primary">
          {expedienteToEdit ? "Editar Expediente" : "Cadastrar Novo Expediente"}
        </ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} mb={6}>
            <FormControl isRequired>
              <FormLabel fontSize="sm" color="brand.onSurfaceVariant">
                Data
              </FormLabel>
              <Popover placement="bottom-start">
                <PopoverTrigger>
                  <InputGroup size="sm">
                    <Input
                      value={
                        formData.data
                          ? format(
                              parse(formData.data, "yyyy-MM-dd", new Date()),
                              "dd/MM/yyyy",
                            )
                          : ""
                      }
                      readOnly
                      cursor="pointer"
                    />
                    <InputRightElement pointerEvents="none">
                      <Icon
                        as={MdOutlineCalendarToday}
                        color="brand.onSurfaceVariant"
                      />
                    </InputRightElement>
                  </InputGroup>
                </PopoverTrigger>
                <PopoverContent w="auto">
                  <PopoverBody>
                    <DayPicker
                      mode="single"
                      selected={
                        formData.data
                          ? parse(formData.data, "yyyy-MM-dd", new Date())
                          : undefined
                      }
                      onSelect={(date) =>
                        date &&
                        setFormData({
                          ...formData,
                          data: format(date, "yyyy-MM-dd"),
                        })
                      }
                      locale={ptBR}
                    />
                  </PopoverBody>
                </PopoverContent>
              </Popover>
            </FormControl>

            <FormControl isRequired>
              <FormLabel fontSize="sm" color="brand.onSurfaceVariant">
                Expediente
              </FormLabel>
              <Select
                value={formData.status}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    status: e.target.value as StatusExpediente,
                  })
                }
                size="sm"
              >
                <option value="Iniciar">Iniciar</option>
                <option value="Entregar">Entregar</option>
                <option value="Ciência">Ciência</option>
                <option value="Responder">Responder</option>
                <option value="Respondido">Respondido</option>
                <option value="Entregue">Entregue</option>
              </Select>
            </FormControl>

            <FormControl isRequired>
              <FormLabel fontSize="sm" color="brand.onSurfaceVariant">
                Número do Processo
              </FormLabel>
              <Input
                value={formData.numeroProcesso}
                onChange={(e) =>
                  setFormData({ ...formData, numeroProcesso: e.target.value })
                }
                size="sm"
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel fontSize="sm" color="brand.onSurfaceVariant">
                Partes
              </FormLabel>
              <Input
                value={formData.partes}
                onChange={(e) =>
                  setFormData({ ...formData, partes: e.target.value })
                }
                size="sm"
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel fontSize="sm" color="brand.onSurfaceVariant">
                Comarca
              </FormLabel>
              <Input
                value={formData.comarca}
                onChange={(e) =>
                  setFormData({ ...formData, comarca: e.target.value })
                }
                size="sm"
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel fontSize="sm" color="brand.onSurfaceVariant">
                Honorários (R$)
              </FormLabel>
              <Input
                type="number"
                step="0.01"
                value={formData.honorarios}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    honorarios: parseFloat(e.target.value),
                  })
                }
                size="sm"
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel fontSize="sm" color="brand.onSurfaceVariant">
                Nome
              </FormLabel>
              <Input
                value={formData.nome}
                onChange={(e) =>
                  setFormData({ ...formData, nome: e.target.value })
                }
                size="sm"
              />
            </FormControl>
          </SimpleGrid>

          <FormControl isRequired>
            <FormLabel fontSize="sm" color="brand.onSurfaceVariant">
              Situação / Histórico
            </FormLabel>
            <Textarea
              value={formData.situacaoHistorico}
              onChange={(e) =>
                setFormData({ ...formData, situacaoHistorico: e.target.value })
              }
              size="sm"
              resize="none"
            />
          </FormControl>
        </ModalBody>

        <ModalFooter
          borderTop="1px solid"
          borderColor="brand.outlineVariant"
          mt={6}
        >
          <Button variant="ghost" mr={3} onClick={onClose} size="sm">
            Cancelar
          </Button>
          <Button
            type="submit"
            bg="brand.secondary"
            color="white"
            _hover={{ bg: "brand.primary" }}
            size="sm"
          >
            {expedienteToEdit ? "Salvar Alterações" : "Salvar Expediente"}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
