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
import { DayPicker } from 'react-day-picker';
import { ptBR } from 'date-fns/locale';
import { format, parse } from 'date-fns';
import 'react-day-picker/dist/style.css';
import { useExpedientes } from "@/contexts/ExpedienteContext";
import { StatusExpediente } from "@/types";
import { MdOutlineCalendarToday } from "react-icons/md";

interface CadastroModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CadastroModal({ isOpen, onClose }: CadastroModalProps) {
  const { addExpediente } = useExpedientes();

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

  const [formData, setFormData] = useState(estadoInicial);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addExpediente(formData);

    // Reseta o formulário e fecha o modal
    setFormData(estadoInicial);
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
          Cadastrar Novo Expediente
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
                      placeholder="dd/mm/aaaa"
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
                      onSelect={(date) => {
                        if (date) {
                          setFormData({
                            ...formData,
                            data: format(date, "yyyy-MM-dd"),
                          });
                        }
                      }}
                      locale={ptBR}
                    />
                  </PopoverBody>
                </PopoverContent>
              </Popover>
            </FormControl>

            <FormControl isRequired>
              <FormLabel fontSize="sm" color="brand.onSurfaceVariant">
                Status
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
                placeholder="Ex: 1023456-78.2023.8.26.0100"
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
                placeholder="Ex: João vs. Empresa X"
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
                placeholder="Ex: São Paulo / SP"
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
                Nome do Advogado/Responsável
              </FormLabel>
              <Input
                placeholder="Ex: Marcos Oliveira"
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
              placeholder="Descreva o status atual do expediente..."
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
            Salvar Expediente
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
