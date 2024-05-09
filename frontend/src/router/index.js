import { createBrowserRouter, Navigate } from 'react-router-dom'
import App from '../App'
import Manage from '../views/Manage'
import Page from '../views/Page'
const router = createBrowserRouter([
  {
    path: '/',
    element: <App></App>,
    children: [
      {
        path: '',
        element: <Navigate replace to={'/home'}></Navigate>,
      },
      {
        path: 'test',
        element: <div>123</div>,
      },
      {
        path: 'page',
        element: <Page></Page>,
      },
      {
        path: 'home',
        element: <div>home</div>,
      },
      {
        path: 'setting',
        element: <div>setting</div>,
      },
      {
        path: 'manage',
        element: <Manage></Manage>,
      },
    ],
  },
])

export default router
