import Dashboard from '../views/Dashboard';
import ViewPdf from '../views/ViewPdf.tsx';
import Home from '../views/LandingPage';
import Register from '../views/Register';
import Login from '../views/Login';
import AdminReg from '../views/adminRegister';
import AdminLog from '../views/adminLogin';
import UploadPdf from '../views/UploadPdf';
import { createBrowserRouter } from 'react-router-dom';
import DashboardLayout from '../layouts/DashboardLayout';
import SendPdf from '../views/SendPdf';

const router = createBrowserRouter([
  {
    element: <DashboardLayout />,
    children: [
      {
        path: '/',
        element: <Dashboard />,
      },
      {
        path: '/upload',
        element: <UploadPdf />,
      },
      {
        path: '/home',
        element: <Home />,
      },
      {
        path: '/send',
        element: <SendPdf />,
      },
    ],
  },
  {
    path: '/login',
    element: <div>LOGIN</div>,
  },
  {
    path: '/user/register',
    element: <Register />,
  },
  {
    path: '/user/login',
    element: <Login />,
  },
  {
    path: '/admin/register',
    element: <AdminReg />,
  },
  {
    path: '/admin/login',
    element: <AdminLog />,
  },

  {
    path: '/upload',
    element: <UploadPdf />,
  },
  {
    path: '/render',
    element: <ViewPdf />,
  },
  {
    path: '/send',
    element: <></>,
  },
]);

export default router;
