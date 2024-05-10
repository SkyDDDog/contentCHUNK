import React, { useState } from 'react'
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

import { FiHome, FiUsers, FiSettings, FiBook } from 'react-icons/fi'
// import { ResizeBox, /* ResizeHandle, useResize */ } from "./saas-ui-pro/react/src/resize/index.ts";
import {
  ResizeHandle,
  useResize,
} from '../../saas-ui-pro/react/src/resize/index.ts'

import Tree from '../Tree.jsx'
import { useNavigate } from 'react-router-dom'

export default function SideNav() {
  const navigate = useNavigate()
  /* sideNav about */
  const [activeNavItem, setActiveNavItem] = useState(null)
  const handleNavItemClick = (itemName) => {
    setActiveNavItem(itemName)
    navigate(`/${itemName}`)
  }
  function onSideNavChange(e) {
    console.log(e.target)
  }
  /* drag-resize about */
  const { getContainerProps, getHandleProps } = useResize({
    onHandleClick: () => {
      console.log('Resize handle clicked')
    },
  })
  return (
    <Box
      {...getContainerProps()}
      position="relative"
      bg="blackAlpha.200"
      borderRightWidth="2px"
      /* handlePosition="left" */
      width="200px"
      minWidth="15vw"
      maxWidth="30vw"
      height="89vh"
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
          <NavItem
            icon={<FiHome />}
            isActive={!activeNavItem || activeNavItem === 'home'}
            onClick={() => handleNavItemClick('home')}
          >
            团队主页
          </NavItem>
          <NavItem
            icon={<FiBook />}
            isActive={activeNavItem === 'page'}
            onClick={() => handleNavItemClick('page')}
          >
            内容中心
          </NavItem>
          {activeNavItem === 'page' && (
            <NavGroup onClick={onSideNavChange} isCollapsible title="teamspace">
              <Tree></Tree>
            </NavGroup>
          )}
          <NavItem
            icon={<FiBook />}
            isActive={activeNavItem === 'distribute'}
            onClick={() => handleNavItemClick('distribute')}
          >
            自动分发
          </NavItem>
          <NavItem
            icon={<FiBook />}
            isActive={activeNavItem === 'manage'}
            onClick={() => handleNavItemClick('manage')}
          >
            运营管理
          </NavItem>
          <NavItem
            icon={<FiUsers />}
            isActive={activeNavItem === 'user'}
            onClick={() => handleNavItemClick('user')}
          >
            账号管理
          </NavItem>
          <NavItem
            icon={<FiSettings />}
            isActive={activeNavItem === 'setting'}
            onClick={() => handleNavItemClick('setting')}
          >
            其他设置
          </NavItem>
        </SidebarSection>
      </Sidebar>
    </Box>
  )
}
