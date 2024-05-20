import { createBrowserRouter, Navigate } from 'react-router-dom'
import App from '../App'
import Manage from '../views/Manage'
import Page from '../views/Page'
import Distribute from "../views/Distribute";
import Home from "../views/Home";
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
        path: 'page/:pageId',
        element: <Page></Page>,
      },
      {
        path: 'home',
        element: <Home></Home>,
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
        element: <Distribute></Distribute>,
      },
    ],
  },
])

export default router
