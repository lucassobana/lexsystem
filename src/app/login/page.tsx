"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/client"; // Cliente do navegador que criamos
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Text,
  IconButton,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import {
  MdMail,
  MdLock,
  MdVisibility,
  MdVisibilityOff,
  MdBalance,
  MdLogin,
} from "react-icons/md";

export default function LoginPage() {
  const router = useRouter();
  const supabase = createClient();

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Novos estados para lidar com carregamento e erros
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg("");

    // Chamada oficial ao Supabase
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error("Erro no login:", error.message);
      setErrorMsg("E-mail ou senha incorretos.");
      setIsLoading(false);
      return;
    }

    // Sucesso! Redireciona para o painel principal
    router.push("/");
    router.refresh(); // Força o Next.js a re-renderizar a página limpa
  };

  return (
    <Box
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bg="#f8f9ff"
      position="relative"
      p={4}
      zIndex={1}
    >
      {/* ... [O Box do fundo SVG permanece igual] ... */}

      <Box w="full" maxW="440px" zIndex={10}>
        <Box
          bg="white"
          border="1px solid #e2e8f0"
          boxShadow="0 4px 12px rgba(35, 49, 68, 0.08)"
          borderRadius="xl"
          p={{ base: 8, md: 10 }}
        >
          {/* Identidade Visual */}
          <Flex direction="column" align="center" mb={8}>
            <Flex align="center" gap={2} mb={2}>
              <Box as={MdBalance} color="#001a48" boxSize={10} />
              <Heading as="h1" size="lg" color="#001a48" letterSpacing="tight">
                LexSystem
              </Heading>
            </Flex>
            <Text fontSize="sm" color="#444651">
              Legal Management Platform
            </Text>
          </Flex>

          {/* NOVO: Alerta de Erro Visual */}
          {errorMsg && (
            <Alert status="error" borderRadius="md" mb={6} fontSize="sm">
              <AlertIcon />
              {errorMsg}
            </Alert>
          )}

          {/* Formulário */}
          <form onSubmit={handleLogin}>
            <Flex direction="column" gap={4}>
              {/* ... [FormControls de Email e Senha permanecem iguais] ... */}
              <FormControl>
                <FormLabel fontSize="sm" fontWeight="600" color="#444651">
                  E-mail Corporativo
                </FormLabel>
                <InputGroup size="lg">
                  <InputLeftElement pointerEvents="none">
                    <Box as={MdMail} color="#747782" boxSize={5} />
                  </InputLeftElement>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    fontSize="sm"
                    focusBorderColor="#0054cd"
                    borderRadius="lg"
                    required
                  />
                </InputGroup>
              </FormControl>

              <FormControl>
                <FormLabel fontSize="sm" fontWeight="600" color="#444651">
                  Senha
                </FormLabel>
                <InputGroup size="lg">
                  <InputLeftElement pointerEvents="none">
                    <Box as={MdLock} color="#747782" boxSize={5} />
                  </InputLeftElement>
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    fontSize="sm"
                    focusBorderColor="#0054cd"
                    borderRadius="lg"
                    required
                  />
                  <InputRightElement>
                    <IconButton
                      aria-label={
                        showPassword ? "Ocultar senha" : "Mostrar senha"
                      }
                      icon={
                        showPassword ? (
                          <MdVisibilityOff size={20} />
                        ) : (
                          <MdVisibility size={20} />
                        )
                      }
                      variant="unstyled"
                      color="#747782"
                      _hover={{ color: "#0054cd" }}
                      onClick={() => setShowPassword(!showPassword)}
                      display="flex"
                      minW="auto"
                    />
                  </InputRightElement>
                </InputGroup>
              </FormControl>

              {/* Botão de Ação */}
              <Button
                type="submit"
                isLoading={isLoading} // Feedback visual nativo do Chakra
                loadingText="Entrando..."
                bg="#001a48"
                color="white"
                size="lg"
                w="full"
                mt={2}
                borderRadius="lg"
                rightIcon={<MdLogin size={18} />}
                _hover={{ bg: "#224489" }}
                _active={{ transform: "scale(0.98)" }}
              >
                Entrar
              </Button>
            </Flex>
          </form>
        </Box>
      </Box>
    </Box>
  );
}
