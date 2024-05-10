import { Box } from '@chakra-ui/react'

import { AppShell } from '@saas-ui/react'

import TopNav from './components/Home/TopNav.jsx'
import SideNav from './components/Home/SideNav.jsx'
// import Page from './components/Page.jsx'
// import BlockNote from './components/BlockNote.jsx'
import { Outlet, useLocation } from 'react-router-dom'
// import Chat from './components/page/Chat.jsx'
import AsideChat from './components/Home/AsideChat.jsx'
function App() {
  let location = useLocation()
  const { pathname } = location
  console.log('pathname', pathname)
  return (
    <AppShell
      navbar={TopNav()}
      sidebar={SideNav()}
      aside={pathname === '/page' && <AsideChat />}
      width="100%"
    >
      <Box as="main" flex="1" py="2" px="4" maxWidth={'100%'} padding={'30px'}>
        <Outlet></Outlet>
      </Box>
    </AppShell>
  )
}

export default App
