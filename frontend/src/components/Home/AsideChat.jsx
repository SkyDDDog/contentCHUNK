import React, { useState } from 'react'
import { Sidebar /*  SidebarSection, NavItem  */ } from '@saas-ui/react'
// import Chat from '../page/Chat'
import AliChat from '../page/AliChat.jsx'
import { ResizeBox } from '../../saas-ui-pro/react/src/resize/index.ts'

export default function AsideChat() {
  const { isOpen /* setOpen */ } = useState(true)
  return (
    <ResizeBox
      position="relative"
      right="0"
      minWidth="30vw"
      maxWidth="50vw"
      height={'89vh'}
      borderLeftWidth="3px"
      bg="blackAlpha.300"
      handlePosition="left"
    >
      <Sidebar
        position="sticky"
        top="56px"
        toggleBreakpoint="sm"
        isOpen={isOpen}
        width="100%"
        maxWidth="50vw"
        height="89vh"
      >
        <AliChat></AliChat>
      </Sidebar>
    </ResizeBox>
  )
}
