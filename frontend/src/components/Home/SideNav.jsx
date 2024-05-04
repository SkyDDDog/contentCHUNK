import React from 'react'
import {
  Box,
  Spacer,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Image,
} from '@chakra-ui/react'

import {
  Sidebar,
  SidebarSection,
  NavItem,
  PersonaAvatar,
  NavGroup,
} from '@saas-ui/react'

import { FiHome, FiUsers, FiSettings } from 'react-icons/fi'
// import { ResizeBox, /* ResizeHandle, useResize */ } from "./saas-ui-pro/react/src/resize/index.ts";
import {
  ResizeHandle,
  useResize,
} from '../../saas-ui-pro/react/src/resize/index.ts'

import Tree from '../Tree.jsx'
export default function SideNav() {
  const { getContainerProps, getHandleProps } = useResize({
    onHandleClick: () => {
      alert('Resize handle clicked')
    },
  })
  return (
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

          <Tree></Tree>
        </SidebarSection>
      </Sidebar>
    </Box>
  )
}
