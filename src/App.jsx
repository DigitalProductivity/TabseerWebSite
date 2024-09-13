import {
  RouterProvider,
  createHashRouter,
  useNavigate,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import LandingPage from './pages/LandingPage';
import HomeAdmin from './pages/Home/Home';
import RequestsPage from './pages/RequestsPage';
import WalletPage from './pages/Wallet/WalletPage';
import ContactUsPage from './pages/contactUsPage';
import HelpPage from './pages/HelpPage';
import MainLayout from './pages/mainLayout/mainLayout';
import { useEffect } from 'react';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import { store } from './core/store/store';
import RequestDetailsCard from './components/requestDetailsCard';
import AgoraRTC, { AgoraRTCProvider, useRTCClient } from 'agora-rtc-react';
import { LiveVideo } from '../src/components/agora/LiveVideo';
import ProfilePage from './pages/childLayouts/profilePage/ProfilePage';
import ResetPasswordPage from './pages/childLayouts/resetPassword/ResetPasswordPage';
import TermsPage from './pages/childLayouts/landingPageLinks/termsPage';
import PrivacyPolicy from './pages/childLayouts/landingPageLinks/privacyPolicy';
import { ConnectForm } from './components/agora/ConnectForm';
import ChatInterface from './components/agora/chat';
import Notification from './pages/childLayouts/notification/Notification';
import TersmAndConditionsPage from './pages/childLayouts/termsAndConditions/tersmAndConditionsPage';

function App() {
  const agoraClient = useRTCClient(
    AgoraRTC.createClient({ codec: 'vp8', mode: 'rtc' })
  ); 

  const handleConnect = (channelName) => {
    navigate(`/via/${channelName}`);
  };

  const ProtectedRoute = ({ children }) => {
    const isAuthenticated = !!localStorage.getItem('token');
    const navigate = useNavigate();

    useEffect(() => {
      if (!isAuthenticated) {
        navigate('/landingPage', { replace: true });
      }
    }, [isAuthenticated, navigate]);

    return isAuthenticated ? children : null;
  };

  const NavRoutes = createHashRouter([
    {
      path: '/',
      element: (
        <ProtectedRoute>
          <MainLayout>
            <HomeAdmin />
          </MainLayout>
        </ProtectedRoute>
      ),
    },
    {
      path: '/notification',
      element: (
        <ProtectedRoute>
          <MainLayout>
            <Notification />
          </MainLayout>
        </ProtectedRoute>
      ),
    },
    {
      path: '/requests',
      element: (
        <ProtectedRoute>
          <MainLayout>
            <RequestsPage />
          </MainLayout>
        </ProtectedRoute>
      ),
    },
    {
      path: '/wallet',
      element: (
        <ProtectedRoute>
          <MainLayout>
            <WalletPage />
          </MainLayout>
        </ProtectedRoute>
      ),
    },
    {
      path: '/profile',
      element: (
        <ProtectedRoute>
          <MainLayout>
            <ProfilePage />
          </MainLayout>
        </ProtectedRoute>
      ),
    },
    {
      path: '/termsAndConditions',
      element: (
        <ProtectedRoute>
          <MainLayout>
            <TersmAndConditionsPage />
          </MainLayout>
        </ProtectedRoute>
      ),
    },
    {
      path: '/help',
      element: (
        <ProtectedRoute>
          <MainLayout>
            <HelpPage />
          </MainLayout>
        </ProtectedRoute>
      ),
    },
    {
      path: '/contactUs',
      element: (
        <ProtectedRoute>
          <MainLayout>
            <ContactUsPage />
          </MainLayout>
        </ProtectedRoute>
      ),
    },
    {
      path: '/requests/:id',
      element: (
        <ProtectedRoute>
          <MainLayout>
            <RequestDetailsCard />
          </MainLayout>
        </ProtectedRoute>
      ),
    },
    {
      path: '/call',
      element: (
        <ProtectedRoute>
          <MainLayout>
            <ConnectForm connectToVideo={handleConnect} />
          </MainLayout>
        </ProtectedRoute>
      ),
    },
    {
      path: '/interactionChannel/:id',
      element: (
        <ProtectedRoute>
          <MainLayout>
            <AgoraRTCProvider client={agoraClient}>
              <LiveVideo />
            </AgoraRTCProvider>
          </MainLayout>
        </ProtectedRoute>
      ),
    },
    {
      path: '/chat/:id',
      element: (
        <ProtectedRoute>
          <MainLayout>
       
             <ChatInterface/>
          </MainLayout>
        </ProtectedRoute>
      ),
    },
    {
      path: '/login',
      element: <Login />,
    },
    {
      path: '/register',
      element: <Register />,
    },
    {
      path: '/resetPassword',
      element: <ResetPasswordPage />,
    },
    {
      path: '/landingPage',
      element: <LandingPage />,
  
    },
    {
      path: '/terms',
      element: <TermsPage />,
  
    },
    {
      path: '/privacyPolicy',
      element: <PrivacyPolicy />,
  
    },
  ]);

  return (
    <>
      <Provider store={store}>
        <RouterProvider router={NavRoutes} />
      </Provider>
    </>
  );
}

export default App;
