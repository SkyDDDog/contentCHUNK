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
        path: 'user',
        element: <div>账号管理</div>,
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
      {
        path: 'distribute',
        element: <div>distribute</div>,
      },
    ],
  },
])

export default router
