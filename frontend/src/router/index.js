import { createBrowserRouter, Navigate } from 'react-router-dom'
import App from '../App'
import BlockNote from '../components/BlockNote'
import Manage from "../views/Manage";
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
        element: <BlockNote></BlockNote>,
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
