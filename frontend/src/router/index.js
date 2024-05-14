import { createBrowserRouter, Navigate } from 'react-router-dom'
import App from '../App'
import Manage from '../views/Manage'
import Page from '../views/Page'
import Distrubute from "../views/Distrubute";
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
        element: <Distrubute></Distrubute>,
      },
    ],
  },
])

export default router
