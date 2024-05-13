import { Box } from '@chakra-ui/react'

import { AppShell } from '@saas-ui/react'

import TopNav from './components/Home/TopNav.jsx'
import SideNav from './components/Home/SideNav.jsx'
// import Page from './components/Page.jsx'
// import BlockNote from './components/BlockNote.jsx'
import { Outlet, useLocation } from 'react-router-dom'
// import Chat from './components/page/Chat.jsx'
import AsideChat from './components/Home/AsideChat.jsx'
import { Page, PageHeader, PageBody } from './saas-ui-pro/react/src/page'


function App() {
  let location = useLocation()
  const { pathname } = location
  console.log('pathname', pathname)
  return (
    <div className="app">
      <AppShell
        /* navbar={TopNav()} */
        sidebar={SideNav()}
        /* aside={pathname === '/page' && <AsideChat />} */
      >
        <Page>
          <PageHeader /* title="Users" */ toolbar={<TopNav></TopNav>} />
          <PageBody p="0" style={{ maxWidth: '100%' }}>
            <div className="main" style={{ display: 'flex', maxWidth: '100%' }}>
              <Box
                as="main"
                flex="1"
                py="2"
                px="4"
                maxWidth={'100vw'}
                padding={'30px'}
              >
                <Outlet></Outlet>
              </Box>
              <div className="charWrap">
                {pathname.match(/\/page/) && <AsideChat />}
              </div>
            </div>
          </PageBody>
        </Page>
      </AppShell>
    </div>
  )
}

export default App
