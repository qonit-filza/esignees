import ViewPdf from '../views/ViewPdf.tsx';
import { createBrowserRouter } from 'react-router-dom';
import UploadPdf from '../views/UploadPdf';
import DashboardLayout from '../layouts/DashboardLayout';
import InboxPage from '../views/InboxPage';
import SettingsPage from '../views/SettingsPage';
import ContactPage from '../views/ContactPage';
import InboxDetails from '../views/InboxDetails';
import UploadLayout from '../layouts/UploadLayout';
import UploadOption from '../components/UploadOption';
import OrganizationPage from '../views/OrganizationPage';
import SubcriptionPage from '../components/SubcriptionPage';
import SentPage from '../views/SentPage';
import ReplyPdf from '../components/ReplyPdf';
import VerifyDocumentPage from '../views/VerifyDocuments';
import LoginPage from '../views/LoginPage';
import RegisterPage from '../views/RegisterPage';
import LandingPagePublic from '../views/LandingPagePublic';

const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPagePublic />,
  },
  {
    element: <DashboardLayout />,
    children: [
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
        element: <SentPage />,
      },
      {
        path: '/sent/:message_id',
        element: <InboxDetails />,
      },
      {
        path: '/inbox',
        element: <InboxPage />,
      },
      {
        path: '/inbox/:message_id',
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
        path: '/reply',
        element: <ReplyPdf />,
      },
    ],
  },
  {
    path: '/verify-documents',
    element: <VerifyDocumentPage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/register',
    element: <RegisterPage />,
  },
]);

export default router;
