import React from 'react'

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  SearchInput,
  NavbarLink,
} from '@saas-ui/react'

import { Button } from '@chakra-ui/react'

import { FiHome } from 'react-icons/fi'

export default function TopNav() {
  return (
    <Navbar
      position="sticky"
      borderBottomWidth="1px"
      background="transparent"
      backdropFilter="blur(10px)"
      height="8vh"
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
  )
}
