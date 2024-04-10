import Home from "../pages/PublicPage/Home/Home";
import Login from "../pages/PublicPage/Login/Login";
import Register from "../pages/PublicPage/Register/Register";
import Instruction from "../pages/PublicPage/Instruction/Instruction"
import AboutUs from "../pages/PublicPage/AboutUs//AboutUs"
import Product from "../pages/PublicPage/Product/Product";
import Products from "../pages/PublicPage/Products/Products";
import Personal from "../pages/PublicPage/Personal/Personal";
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
      path: '/product',
      page: Product
    },
    {
      path: '/',
      page: Home
    },
    {
      path: '*',
      page: Home
    }, 
    {
      path: 'products',
      page: Products
    },
    {
      path: 'personal',
      page: Personal
    }
  ];
const adminRoutes = [
    
]
const customerRoutes = [

]

export {publicRoutes, adminRoutes, customerRoutes}