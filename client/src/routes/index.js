import {Home} from "../pages/PublicPage/Home/Home";
import Login from "../pages/PublicPage/Login/Login";
import Register from "../pages/PublicPage/Register/Register";
import Instruction from "../pages/PublicPage/Instruction/Instruction"
import AboutUs from "../pages/PublicPage/AboutUs//AboutUs"
const publicRoutes = [
    {
      path: 'login',
      page: Login
    },
    {
      path: '/register',
      page: Register
    },
    {
      path: '/instruction',
      page: Instruction
    },
    {
      path: '/aboutUs',
      page: AboutUs
    },
    {
      path: '/',
      page: Home
    },
    {
      path: '*',
      page: Home
    }
  ];
const adminRoutes = [
    
]
const customerRoutes = [

]

export {publicRoutes, adminRoutes, customerRoutes}