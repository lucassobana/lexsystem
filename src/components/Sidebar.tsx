"use client";

import { useState } from "react";
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
} from "@chakra-ui/react";
// Importando os ícones da coleção Material Design
import {
  MdOutlineDashboard,
  MdOutlineBalance,
  MdOutlineMenu,
  MdOutlineMenuOpen,
} from "react-icons/md";

// Note que agora passamos a referência do componente de ícone, não uma string
const menuItems = [
  {
    label: "Dashboard",
    icon: MdOutlineDashboard,
    href: "#",
    isActive: true,
  },
];

export function Sidebar() {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const [isCollapsed, setIsCollapsed] = useState(true);

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

      <Box
        p={isCollapsed ? 4 : 6}
        borderTop="1px solid"
        borderColor="brand.outlineVariant"
      >
        <Flex
          align="center"
          justify={isCollapsed ? "center" : "flex-start"}
          gap={3}
        >
          <Avatar
            size="sm"
            name="Dr. Ricardo Silva"
            src="https://bit.ly/dan-abramov"
            cursor="pointer"
          />
          {!isCollapsed && (
            <Box overflow="hidden" whiteSpace="nowrap">
              <Text fontSize="sm" fontWeight="bold" color="brand.onSurface">
                Dr. Ricardo Silva
              </Text>
              <Text
                fontSize="xs"
                color="brand.onSurfaceVariant"
                textTransform="uppercase"
              >
                OAB/SP 123.456
              </Text>
            </Box>
          )}
        </Flex>
      </Box>
    </Flex>
  );
}
