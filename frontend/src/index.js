import React from 'react'
import ReactDOM from 'react-dom/client'
import { store } from './redux/store'
import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'
import router from './router/index.js'

import { extendTheme } from '@chakra-ui/react'
import { SaasProvider, theme as baseTheme } from '@saas-ui/react'

// 3. Extend the theme to include custom colors, fonts, etc
const colors = {
  brand: {
    900: '#1a365d',
    800: '#153e75',
    700: '#2a69ac',
  },
}

const theme = extendTheme({ colors }, baseTheme)

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <Provider store={store}>
    <SaasProvider theme={theme}>
      <RouterProvider router={router} />
    </SaasProvider>
    ,
  </Provider>,
)
