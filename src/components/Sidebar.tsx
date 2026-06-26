"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/client"; // Cliente Supabase
import {
  Box,
  Flex,
  Text,
  Avatar,
  IconButton,
  VStack,
  Tooltip,
  useBreakpointValue,
  Icon,
  Skeleton, // Importado para a animação de carregamento
} from "@chakra-ui/react";
import {
  MdOutlineDashboard,
  MdOutlineBalance,
  MdOutlineMenu,
  MdOutlineMenuOpen,
  MdLogout, // Importado o ícone de logout
} from "react-icons/md";

const menuItems = [
  {
    label: "Dashboard",
    icon: MdOutlineDashboard,
    href: "#",
    isActive: true,
  },
];

export function Sidebar() {
  const router = useRouter();
  const supabase = createClient();

  const isMobile = useBreakpointValue({ base: true, md: false });
  const [isCollapsed, setIsCollapsed] = useState(true);

  // Estados de Autenticação
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Busca os dados do utilizador logado no Supabase
  useEffect(() => {
    async function fetchUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        setUserEmail(user.email ?? "");
        const nameFromMeta =
          user.user_metadata?.full_name || user.user_metadata?.name;
        setUserName(nameFromMeta || user.email?.split("@")[0] || "Advogado");
      }
      setIsLoading(false);
    }
    fetchUser();
  }, [supabase.auth]);

  // Função de Logout
  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  const sidebarWidth = isCollapsed ? "80px" : "256px";

  const handleMouseEnter = () => {
    if (!isMobile) setIsCollapsed(false);
  };
  const handleMouseLeave = () => {
    if (!isMobile) setIsCollapsed(true);
  };
  const toggleMobile = () => {
    if (isMobile) setIsCollapsed(!isCollapsed);
  };

  return (
    <Flex
      as="aside"
      direction="column"
      w={sidebarWidth}
      h="100vh"
      bg="brand.surfaceContainerLowest"
      borderRight="1px solid"
      borderColor="brand.outlineVariant"
      transition="all 0.2s cubic-bezier(0.4, 0, 0.2, 1)"
      pos="fixed"
      top={0}
      left={0}
      zIndex={40}
      boxShadow={!isCollapsed && !isMobile ? "xl" : "sm"}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Flex
        p={6}
        align="center"
        justify={isCollapsed ? "center" : "space-between"}
        borderBottom="1px solid"
        borderColor="brand.outlineVariant"
        minH="88px"
      >
        {!isCollapsed && (
          <Flex align="center" gap={3} overflow="hidden">
            <Flex
              w={8}
              h={8}
              bg="brand.primary"
              borderRadius="md"
              align="center"
              justify="center"
              color="white"
              shrink={0}
            >
              <Icon as={MdOutlineBalance} boxSize={5} />
            </Flex>
            <Text
              fontSize="xl"
              fontWeight="bold"
              color="brand.primary"
              whiteSpace="nowrap"
            >
              LexSystem
            </Text>
          </Flex>
        )}

        {isCollapsed && !isMobile && (
          <Flex
            w={8}
            h={8}
            bg="brand.primary"
            borderRadius="md"
            align="center"
            justify="center"
            color="white"
            shrink={0}
          >
            <Icon as={MdOutlineBalance} boxSize={5} />
          </Flex>
        )}

        {isMobile && (
          <IconButton
            aria-label="Alternar menu"
            variant="ghost"
            size="sm"
            color="brand.onSurfaceVariant"
            onClick={toggleMobile}
            icon={
              <Icon
                as={isCollapsed ? MdOutlineMenu : MdOutlineMenuOpen}
                boxSize={6}
              />
            }
          />
        )}
      </Flex>

      <Box flex="1" py={6} overflowY="auto" overflowX="hidden">
        <VStack spacing={2} align="stretch" px={isCollapsed ? 2 : 4}>
          {menuItems.map((item, index) => (
            <Tooltip
              key={index}
              label={item.label}
              placement="right"
              isDisabled={!isCollapsed}
              hasArrow
            >
              <Flex
                as="a"
                href={item.href}
                align="center"
                gap={3}
                px={isCollapsed ? 0 : 4}
                py={3}
                justify={isCollapsed ? "center" : "flex-start"}
                bg={
                  item.isActive ? "brand.surfaceContainerHigh" : "transparent"
                }
                color={
                  item.isActive ? "brand.secondary" : "brand.onSurfaceVariant"
                }
                borderRight={
                  item.isActive && !isCollapsed ? "4px solid" : "none"
                }
                borderColor="brand.secondary"
                borderRadius={isCollapsed ? "md" : "0"}
                cursor="pointer"
                transition="all 0.2s"
                _hover={{
                  bg: "brand.surfaceContainerLow",
                  color: "brand.secondary",
                }}
              >
                <Icon as={item.icon} boxSize={6} />

                {!isCollapsed && (
                  <Text
                    fontSize="sm"
                    fontWeight={item.isActive ? "bold" : "medium"}
                    whiteSpace="nowrap"
                  >
                    {item.label}
                  </Text>
                )}
              </Flex>
            </Tooltip>
          ))}
        </VStack>
      </Box>

      {/* RODAPÉ DO UTILIZADOR */}
      <Box
        p={isCollapsed ? 4 : 6}
        pb={isCollapsed ? 6 : 8} // <-- Aumentamos o padding inferior (espaço extra no fundo)
        flexShrink={0} // <-- IMPEDE que a lista de menus esmague o rodapé
        borderTop="1px solid"
        borderColor="brand.outlineVariant"
      >
        <Flex
          align="center"
          justify="center"
          gap={1}
        >
          <Flex align="center" gap={1} overflow="hidden">
            <Skeleton isLoaded={!isLoading} borderRadius="full">
              <Avatar
                size="sm"
                name={userName || "Usuário"}
                bg="brand.primary"
                color="white"
                cursor="pointer"
              />
            </Skeleton>

            {!isCollapsed && (
              <Box overflow="hidden" whiteSpace="nowrap">
                {/* Trocamos h por minH para não esmagar o texto */}
                <Skeleton isLoaded={!isLoading} minH="20px" w="120px" mb={1}>
                  <Text fontSize="sm" fontWeight="bold" color="brand.onSurface" isTruncated textTransform="capitalize" lineHeight="1.2">
                    {userName}
                  </Text>
                </Skeleton>
                <Skeleton isLoaded={!isLoading} minH="18px" w="140px">
                  <Text fontSize="xs" color="brand.onSurfaceVariant" isTruncated lineHeight="1.2" pb={1}>
                    {userEmail}
                  </Text>
                </Skeleton>
              </Box>
            )}
          </Flex>

          {/* BOTÃO DE LOGOUT APARECE APENAS QUANDO EXPANDIDO */}
          {!isCollapsed && (
            <Tooltip label="Sair do Sistema" placement="top" hasArrow>
              <IconButton
                aria-label="Sair"
                icon={<Icon as={MdLogout} boxSize={5} />}
                size="sm"
                variant="ghost"
                colorScheme="red"
                onClick={handleLogout}
              />
            </Tooltip>
          )}
        </Flex>
      </Box>
    </Flex>
  );
}
