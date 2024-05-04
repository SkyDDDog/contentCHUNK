import {
  Button,
  Box,
  Container,
  Stack,
  Skeleton,
  SkeletonText,
  Spacer,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Image,
} from '@chakra-ui/react';

import {
  AppShell,
  Sidebar,
  SidebarSection,
  NavItem,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  SearchInput,
  NavbarLink,
  PersonaAvatar,
  NavGroup,
} from '@saas-ui/react';

import { FiHome, FiUsers, FiSettings } from 'react-icons/fi';
// import { ResizeBox, /* ResizeHandle, useResize */ } from "./saas-ui-pro/react/src/resize/index.ts";
import {
  ResizeHandle,
  useResize,
} from './saas-ui-pro/react/src/resize/index.ts';

function App() {
  const { getContainerProps, getHandleProps } = useResize({
    onHandleClick: () => {
      alert('Resize handle clicked');
    },
  });
  return (
    <AppShell
      navbar={
        <Navbar
          position="sticky"
          borderBottomWidth="1px"
          background="transparent"
          backdropFilter="blur(10px)"
          height="10vh"
        >
          <NavbarBrand>
            <FiHome width="100px" />
          </NavbarBrand>
          <NavbarContent>
            <NavbarItem>
              <NavbarLink isActive aria-current="page" href="#">
                Home
              </NavbarLink>
            </NavbarItem>
            <NavbarItem>
              <NavbarLink href="#">About</NavbarLink>
            </NavbarItem>
            <NavbarItem>
              <NavbarLink href="#">Contact</NavbarLink>
            </NavbarItem>
          </NavbarContent>
          <NavbarContent>
            <SearchInput />
          </NavbarContent>
          <NavbarContent justifyContent="flex-end" spacing="2">
            <NavbarItem>
              <Button href="#">Login</Button>
            </NavbarItem>
            <NavbarItem>
              <Button variant="primary">Sign up</Button>
            </NavbarItem>
          </NavbarContent>
        </Navbar>
      }
      sidebar={
        <Box
          {...getContainerProps()}
          position="relative"
          bg="blackAlpha.200"
          borderRightWidth="2px"
          width="200px"
          minWidth="15vw"
          maxWidth="30vw"
          height="100vh"
        >
          <ResizeHandle
            {...getHandleProps()}
            _after={{
              content: '""',
              position: 'absolute',
              top: '0',
              bottom: '0',
              left: '4px',
              width: '2px',
              bg: 'primary.500',
              transitionProperty: 'opacity',
              transitionDuration: 'normal',
              opacity: 0,
            }}
            _hover={{
              _after: {
                opacity: 1,
              },
            }}
          />
          <Sidebar
            height="100%"
            width="100%"
            minWidth="15vw"
            maxWidth="30vw"
            toggleBreakpoint="sm"
          >
            <SidebarSection direction="row">
              {/* <SaasUILogo width="100px" /> */}
              <Image
                src="https://saas-ui.dev/favicons/favicon-96x96.png"
                boxSize="7"
              />
              <Spacer />
              <Menu>
                <MenuButton
                  as={IconButton}
                  icon={
                    <PersonaAvatar
                      presence="online"
                      size="xs"
                      src="/showcase-avatar.jpg"
                    />
                  }
                  variant="ghost"
                />
                <MenuList>
                  <MenuItem>Sign out</MenuItem>
                </MenuList>
              </Menu>
            </SidebarSection>
            {/* <SidebarSection direction="row" flex="1" overflowY="scroll">
              <NavItem icon={<FiHome size="1.2em" />}>Home</NavItem>
              <NavItem icon={<FiUsers size="1.2em" />}>Contacts</NavItem>
            </SidebarSection> */}
            <SidebarSection flex="1" overflowY="auto">
              <NavGroup>
                <NavItem icon={<FiHome />} isActive>
                  Home
                </NavItem>
                <NavItem icon={<FiUsers />}>Users</NavItem>
                <NavItem icon={<FiSettings />}>Settings</NavItem>
              </NavGroup>

              <NavGroup title="Teams" isCollapsible>
                <NavItem>123</NavItem>
                <NavItem>Support</NavItem>
                <NavGroup title="Teams" isCollapsible>
                  <NavItem>Sales</NavItem>
                  <NavItem>Support</NavItem>
                </NavGroup>
              </NavGroup>

              {/*   <NavGroup title="Tags" isCollapsible>
                  <NavItem
                    icon={
                      <Badge bg="purple.500" boxSize="2" borderRadius="full" />
                    }
                  >
                    <Text>Lead</Text>
                    <Badge opacity="0.6" borderRadius="full" bg="none" ms="auto">
                      83
                    </Badge>
                  </NavItem>
                  <NavItem
                    icon={<Badge bg="cyan.500" boxSize="2" borderRadius="full" />}
                  >
                    <Text>Customer</Text>
                    <Badge opacity="0.6" borderRadius="full" bg="none" ms="auto">
                      210
                    </Badge>
                  </NavItem>
                </NavGroup> */}
            </SidebarSection>
          </Sidebar>
        </Box>
      }
    >
      <Box as="main" flex="1" py="2" px="4">
        <Container
          maxW="container.xl"
          pt="8"
          px="8"
          display="flex"
          flexDirection="column"
          margin="0 auto"
        >
          <Stack spacing="4" mb="14">
            <Skeleton width="100px" height="24px" speed={0} />
            <SkeletonText speed={0} />
          </Stack>
          <Stack direction="row" spacing="8" mb="14">
            <Stack spacing="4" flex="1">
              <Skeleton width="100px" height="20px" speed={0} />
              <SkeletonText speed={0} />
            </Stack>
            <Stack spacing="4" flex="1">
              <Skeleton width="100px" height="20px" speed={0} />
              <SkeletonText speed={0} />
            </Stack>
          </Stack>
          <Stack direction="row" spacing="8" mb="14">
            <Stack spacing="4" flex="1">
              <Skeleton width="100px" height="20px" speed={0} />
              <SkeletonText speed={0} />
            </Stack>
            <Stack spacing="4" flex="1">
              <Skeleton width="100px" height="20px" speed={0} />
              <SkeletonText speed={0} />
            </Stack>
          </Stack>
          <Stack direction="row" spacing="8">
            <Stack spacing="4" flex="1">
              <Skeleton width="100px" height="20px" speed={0} />
              <SkeletonText speed={0} />
            </Stack>
            <Stack spacing="4" flex="1">
              <Skeleton width="100px" height="20px" speed={0} />
              <SkeletonText speed={0} />
            </Stack>
          </Stack>
        </Container>
      </Box>
    </AppShell>
  );
}

export default App;
