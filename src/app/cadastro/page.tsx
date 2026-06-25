// "use client";

// import { useState } from "react";
// import {
//   Box,
//   Button,
//   Flex,
//   FormControl,
//   FormLabel,
//   Heading,
//   Input,
//   Select,
//   SimpleGrid,
//   Textarea,
// } from "@chakra-ui/react";
// import { useRouter } from "next/navigation";
// import { useExpedientes } from "@/contexts/ExpedienteContext";
// import { StatusExpediente } from "@/types";

// export default function CadastroExpediente() {
//   const router = useRouter();
//   const { addExpediente } = useExpedientes();

//   const [formData, setFormData] = useState({
//     data: new Date().toISOString().split("T")[0],
//     status: "Iniciar" as StatusExpediente,
//     numeroProcesso: "",
//     partes: "",
//     comarca: "",
//     honorarios: 0,
//     situacaoHistorico: "",
//     nome: "",
//   });

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     addExpediente(formData);
//     // Redireciona de volta para a lista. O item cairá na aba correta automaticamente.
//     router.push("/");
//   };

//   return (
//     <Box p={8} maxW="800px" mx="auto">
//       <Flex justify="space-between" align="center" mb={6}>
//         <Heading size="md">Cadastrar Novo Expediente</Heading>
//         <Button variant="ghost" onClick={() => router.push("/")}>
//           Cancelar
//         </Button>
//       </Flex>

//       <form onSubmit={handleSubmit}>
//         <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} mb={6}>
//           <FormControl isRequired>
//             <FormLabel>Data</FormLabel>
//             <Input
//               type="date"
//               value={formData.data}
//               onChange={(e) =>
//                 setFormData({ ...formData, data: e.target.value })
//               }
//             />
//           </FormControl>

//           <FormControl isRequired>
//             <FormLabel>Status</FormLabel>
//             <Select
//               value={formData.status}
//               onChange={(e) =>
//                 setFormData({
//                   ...formData,
//                   status: e.target.value as StatusExpediente,
//                 })
//               }
//             >
//               <option value="Iniciar">Iniciar</option>
//               <option value="Entregar">Entregar</option>
//               <option value="Ciência">Ciência</option>
//               <option value="Responder">Responder</option>
//               <option value="Respondido">Respondido</option>
//               <option value="Entregue">Entregue</option>
//             </Select>
//           </FormControl>

//           <FormControl isRequired>
//             <FormLabel>Número do Processo</FormLabel>
//             <Input
//               value={formData.numeroProcesso}
//               onChange={(e) =>
//                 setFormData({ ...formData, numeroProcesso: e.target.value })
//               }
//             />
//           </FormControl>

//           <FormControl isRequired>
//             <FormLabel>Partes</FormLabel>
//             <Input
//               value={formData.partes}
//               onChange={(e) =>
//                 setFormData({ ...formData, partes: e.target.value })
//               }
//             />
//           </FormControl>

//           <FormControl isRequired>
//             <FormLabel>Comarca</FormLabel>
//             <Input
//               value={formData.comarca}
//               onChange={(e) =>
//                 setFormData({ ...formData, comarca: e.target.value })
//               }
//             />
//           </FormControl>

//           <FormControl isRequired>
//             <FormLabel>Honorários (R$)</FormLabel>
//             <Input
//               type="number"
//               step="0.01"
//               value={formData.honorarios}
//               onChange={(e) =>
//                 setFormData({
//                   ...formData,
//                   honorarios: parseFloat(e.target.value),
//                 })
//               }
//             />
//           </FormControl>

//           <FormControl isRequired>
//             <FormLabel>Nome</FormLabel>
//             <Input
//               value={formData.nome}
//               onChange={(e) =>
//                 setFormData({ ...formData, nome: e.target.value })
//               }
//             />
//           </FormControl>
//         </SimpleGrid>

//         <FormControl mb={6} isRequired>
//           <FormLabel>Situação / Histórico</FormLabel>
//           <Textarea
//             value={formData.situacaoHistorico}
//             onChange={(e) =>
//               setFormData({ ...formData, situacaoHistorico: e.target.value })
//             }
//           />
//         </FormControl>

//         <Button type="submit" colorScheme="blue" width="full">
//           Salvar Expediente
//         </Button>
//       </form>
//     </Box>
//   );
// }
