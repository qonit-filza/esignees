import ViewPdf from '../views/ViewPdf.tsx';
import { createBrowserRouter, redirect } from 'react-router-dom';
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
    loader: () => {
      const isAuthenticated = localStorage.getItem('access_token');
      if (!isAuthenticated) {
        return redirect('/login');
      }
      return null;
    },
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
    loader : () => {
      if (!localStorage.access_token){
        return redirect("/login")
      }
      return null
    }
  },
  {
    path: '/verify-documents',
    element: <VerifyDocumentPage />,
  },
  {
    path: '/login',
    loader: () => {
      const isAuthenticated = localStorage.getItem('access_token');
      if (isAuthenticated) {
        return redirect('/inbox');
      }
      return null;
    },
    element: <LoginPage />,
    loader : () => {
      if (localStorage.access_token){
        return redirect("/inbox")
      }
      return null
    }
  },
  {
    path: '/register',
    loader: () => {
      const isAuthenticated = localStorage.getItem('access_token');
      if (isAuthenticated) {
        return redirect('/inbox');
      }
      return null;
    },
    element: <RegisterPage />,
    loader : () => {
      if (localStorage.access_token){
        return redirect("/inbox")
      }
      return null
    }
  },
]);

export default router;
