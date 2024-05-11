import React from 'react'

import { Navbar, NavbarContent, NavbarItem } from '@saas-ui/react'

import { Button } from '@chakra-ui/react'
import PageTabs from '../page/PageTabs'
export default function TopNav() {
  return (
    <Navbar
      position="sticky"
      borderBottomWidth="1px"
      background="transparent"
      backdropFilter="blur(10px)"
      height="8vh"
    >
      <PageTabs></PageTabs>
      <NavbarContent justifyContent="flex-end" spacing="2">
        <NavbarItem>
          <Button href="#">Login</Button>
        </NavbarItem>
        <NavbarItem>
          <Button variant="primary">Sign up</Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  )
}
