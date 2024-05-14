import React from 'react'

import { Navbar, NavbarContent, NavbarItem } from '@saas-ui/react'

import PageTabs from '../page/PageTabs'
import Login from '../../views/Login'
import Signup from '../../views/Signup'
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
          <Login></Login>
        </NavbarItem>
        <NavbarItem>
          <Signup></Signup>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  )
}
