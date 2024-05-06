import { Box, Container } from '@chakra-ui/react'

import { AppShell } from '@saas-ui/react'

import TopNav from './components/Home/TopNav.jsx'
import SideNav from './components/Home/SideNav.jsx'
// import Page from './components/Page.jsx'
// import BlockNote from './components/BlockNote.jsx'
import { Outlet } from 'react-router-dom'

function App() {
  return (
    <AppShell navbar={TopNav()} sidebar={SideNav()}>
      <Box as="main" flex="1" py="2" px="4">
        <Container
          maxW="container.xl"
          pt="8"
          px="8"
          display="flex"
          flexDirection="column"
          margin="0 auto"
          maxHeight={'80vh'}
        >
          {/* <BlockNote></BlockNote> */}
          <Outlet></Outlet>
        </Container>
      </Box>
    </AppShell>
  )
}

export default App
