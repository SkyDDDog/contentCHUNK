import React from 'react'

import { Navbar, NavbarContent, NavbarItem } from '@saas-ui/react'

import PageTabs from '../page/PageTabs'
import Login from '../../views/Login'
import Signup from '../../views/Signup'
import { useSelector } from 'react-redux'
import { Avatar, Button } from '@chakra-ui/react'
export default function TopNav() {
  // const dispatch = useDispatch()
  const isLogin = useSelector((state) => state.user.isLogin)
  const userInfo = useSelector((state) => state.user.userInfo)
  return (
    <Navbar
      position="sticky"
      borderBottomWidth="1px"
      background="transparent"
      backdropFilter="blur(10px)"
      height="8vh"
    >
      <PageTabs></PageTabs>
      {!isLogin ? (
        <NavbarContent justifyContent="flex-end" spacing="2">
          <NavbarItem>
            <Login></Login>
          </NavbarItem>
          <NavbarItem>
            <Signup></Signup>
          </NavbarItem>
        </NavbarContent>
      ) : (
        <NavbarContent justifyContent="flex-end" spacing="2">
          <NavbarItem>
            <Avatar size={'sm'} name={userInfo.username} />
          </NavbarItem>
          <NavbarItem>
            <Button
              onClick={() => {
                /* 清空token */
                localStorage.removeItem('token')
                window.location.reload()
              }}
            >
              Logout
            </Button>
          </NavbarItem>
        </NavbarContent>
      )}
    </Navbar>
  )
}
