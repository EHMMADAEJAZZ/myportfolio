import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Home from '../pages/Home';
import Contact from '../pages/Contact';
import Admin from '../pages/Admin/Admin';
import AdminIntro from '../components/Admin/AdminIntro';
import AdminAbout from '../components/Admin/AdminAbout';
import AdminExperiences from '../components/Admin/AdminExperiences';
import Addexperience from '../components/Admin/Addexperience';
import Projects from '../components/Admin/Projects';
import Certifications from '../components/Admin/Certifications';
import AdminContact from '../components/Admin/AdminContact';
import Login from '../pages/Admin/Login';
import ProutedRoutes from '../components/Admin/ProutedRoutes';
import CompanyContacts from '../components/Admin/CompanyContacts';
import Profile from '../components/Admin/Profile';
import ForgotPasword from '../components/ForgotPasword';
import ResetPassword from '../components/ResetPassword';
import NotFound from '../components/NotFound';

const router = createBrowserRouter([
  {
    path: '/',
    exact: true,
    element: <App />,

    children: [
      {
        path: '*',
        element: <NotFound />,
      },
      {
        path: '',
        exact: true,
        element: <Home />,
      },
      {
        path: 'contact',
        element: <Contact />,
      },
      {
        path: 'forgot-password',
        element: <ForgotPasword />,
      },
      {
        path: 'reset-password',
        element: <ResetPassword />,
      },
      {
        path: 'auth',
        element: <Login />,
      },
      {
        element: <ProutedRoutes />,
        children: [
          {
            path: 'admin',
            element: <Admin />,

            children: [
              {
                path: '',
                element: <AdminIntro />,
              },
              {
                path: 'about',
                element: <AdminAbout />,
              },
              {
                path: 'experiences',
                element: <AdminExperiences />,
              },
              {
                path: 'add-experience',
                element: <Addexperience />,
              },
              {
                path: 'projects',
                element: <Projects />,
              },
              {
                path: 'certifications',
                element: <Certifications />,
              },
              {
                path: 'contactinfo',
                element: <AdminContact />,
              },
              {
                path: 'company-contacts',
                element: <CompanyContacts />,
              },
              {
                path: 'profile',
                element: <Profile />,
              },
              {
                path: 'auth',
                element: <Login />,
              },
            ],
          },
        ],
      },
    ],
  },
]);

export default router;
