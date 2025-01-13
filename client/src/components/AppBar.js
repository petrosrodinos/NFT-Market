import React, { useContext } from "react";
import {
  IconButton,
  Box,
  CloseButton,
  Flex,
  Icon,
  useColorModeValue,
  Drawer,
  DrawerContent,
  Text,
  Tooltip,
  useDisclosure,
  Button,
} from "@chakra-ui/react";
import {
  FiHome,
  FiTrendingUp,
  FiCompass,
  FiStar,
  FiSettings,
  FiMenu,
  FiPower,
  FiPlusCircle,
} from "react-icons/fi";
import { CgProfile } from "react-icons/cg";
import { BsPerson } from "react-icons/bs";
import { AuthContext } from "../context/auth-context";
import { Link } from "react-router-dom";

const LinkItems = [
  { name: "/", icon: FiHome },
  { name: "create", icon: FiPlusCircle },
  { name: "profile", icon: CgProfile },
];

const AuthIcons = [BsPerson, FiPower];

export default function SimpleSidebar({ children }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box minH="100vh">
      <SidebarContent onClose={() => onClose} display={{ base: "none", md: "block" }} />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav display={{ base: "flex", md: "none" }} onOpen={onOpen} />
      <Box p={3} ml={20} w="100%">
        {children}
      </Box>
    </Box>
  );
}

const SidebarContent = ({ onClose, ...rest }) => {
  const auth = useContext(AuthContext);
  return (
    <Box
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 100 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="4" textAlign="center" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          NFT Market
        </Text>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem tooltip={link.name} key={link.name} icon={link.icon}></NavItem>
      ))}
      {auth.logedIn ? (
        <AuthItem
          loginPress={auth.Logout}
          tooltip={"Log Out"}
          key={Math.random()}
          icon={AuthIcons[1]}
        ></AuthItem>
      ) : (
        <AuthItem
          loginPress={auth.Login}
          tooltip={"Authenticate"}
          key={Math.random()}
          icon={AuthIcons[0]}
        ></AuthItem>
      )}
    </Box>
  );
};

const AuthItem = ({ icon, children, tooltip, loginPress }) => {
  return (
    <Button
      onClick={loginPress}
      variant="link"
      p="6"
      mx="4"
      borderRadius="lg"
      role="group"
      _hover={{
        bg: "cyan.400",
        color: "white",
      }}
    >
      {children}
    </Button>
  );
};

const NavItem = ({ icon, children, tooltip }) => {
  return (
    <Link to={tooltip} style={{ textDecoration: "none" }}>
      <Flex
        align="center"
        p="6"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: "cyan.400",
          color: "white",
        }}
      >
        {icon && (
          <Icon
            color="#38B2AC"
            mr="4"
            fontSize="30"
            _groupHover={{
              color: "white",
            }}
            as={icon}
          />
        )}
      </Flex>
    </Link>
  );
};

const MobileNav = ({ onOpen, ...rest }) => {
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 24 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue("white", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent="flex-start"
      {...rest}
    >
      <IconButton variant="outline" onClick={onOpen} aria-label="open menu" icon={<FiMenu />} />

      <Text fontSize="2xl" ml="8" fontFamily="monospace" fontWeight="bold">
        NFT Market
      </Text>
    </Flex>
  );
};
