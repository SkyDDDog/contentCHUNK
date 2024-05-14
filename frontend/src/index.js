import React from 'react'
import ReactDOM from 'react-dom/client'
import { store } from './redux/store'
import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'
import router from './router/index.js'
import './assets/css/index.css'

import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { SaasProvider } from '@saas-ui/react'

// 3. Extend the theme to include custom colors, fonts, etc

const theme = extendTheme({
  colors: {
    brand: {
      100: '#1D979E',
      // ...
      900: '#1a202c',
    },
  },
})

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <Provider store={store}>
    <ChakraProvider theme={theme}>
      <SaasProvider>
        <RouterProvider router={router} />
      </SaasProvider>
    </ChakraProvider>
    ,
  </Provider>,
)
