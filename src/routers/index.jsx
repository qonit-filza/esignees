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
import InboxPage from '../views/InboxPage';
import SettingsPage from '../views/SettingsPage';
import ContactPage from '../views/ContactPage';
import SendPdf from '../views/SendPdf';
import InboxDetails from '../views/InboxDetails';
import UploadLayout from '../layouts/UploadLayout';
import UploadOption from '../components/UploadOption';
import OrganizationPage from '../views/OrganizationPage';
import SubcriptionPage from '../views/SubcriptionPage';
import SentPage from '../views/SentPage';
import ReplyPdf from '../views/ReplyPdf';

const router = createBrowserRouter([
  {
    element: <DashboardLayout />,
    children: [
      {
        path: '/',
        element: <Dashboard />,
      },
      {
        path: '/contacts',
        element: <ContactPage />,
      },
      {
        path: '/organization',
        element: <OrganizationPage />,
      },
      {
        path: '/subcriptions',
        element: <SubcriptionPage />,
      },
      {
        path: '/sent',
        element: <div>sent</div>,
      },
      {
        path: '/sent',
        element: <SentPage />,
      },
      {
        path: '/inbox',
        element: <InboxPage />,
      },
      {
        path: '/inbox/:document_id',
        element: <InboxDetails />,
      },
      {
        path: '/accounts',
        element: <SettingsPage />,
      },
      {
        path: '/upload',
        element: <UploadLayout />,
        children: [
          {
            path: 'options',
            element: <UploadOption />,
          },
          {
            path: 'documents',
            element: <UploadPdf />,
          },
          {
            path: 'preview',
            element: <ViewPdf />,
          },
        ],
      },
      {
        path: '/home',
        element: <Home />,
      },
      {
        path: '/send',
        element: <SendPdf />,
      },
      {
        path: '/reply',
        element: <ReplyPdf />,
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
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
