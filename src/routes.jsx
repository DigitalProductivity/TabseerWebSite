import { createBrowserRouter } from "react-router-dom";
import RequestsPage from "./pages/requestsPage";
import RequestDetailsPage from "./pages/RequestDetailsPage";
import ProfilePage from "./pages/profilePage";
import HelpPage from "./pages/HelpPage";
import ContactUsPage from "./pages/contactUsPage";
import TersmAndConditionsPage from "./pages/tersmAndConditionsPage";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import WalletPage from "./pages/Wallet/WalletPage";
import HomeAdmin from "./pages/Home/Home";


const NavigationRoutes = createBrowserRouter([
    {
        path:"/",
        element:<LandingPage/>
    },
    {
        path:"/login",
        element:<Login/>
    },
    {
        path:"/register",
        element:<Register/>
    },
    {
        path:"/home",
        element:<HomeAdmin/>
    },
    {
        path:"/wallet",
        element:<WalletPage/>
    },
    {
        path:"/requests",
        element:<RequestsPage/>
    },
    {
        path:"/requests/:id",
        element:<RequestDetailsPage/>
    },
    {
        path:"/profile",
        element:<ProfilePage/>
    },
    {
        path:"/help",
        element:<HelpPage/>
    },
    {
        path:"/contactUs",
        element:<ContactUsPage/>,
    },
    {
        path:"/termsAndConditions",
        element:<TersmAndConditionsPage/>
    }
])

export default NavigationRoutes