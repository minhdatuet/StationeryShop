import Home from "../pages/PublicPage/Home/Home";
import Login from "../pages/PublicPage/Login/Login";
import Register from "../pages/PublicPage/Register/Register";
import Instruction from "../pages/PublicPage/Instruction/Instruction"
import ShoppingCart from "../pages/PublicPage/ShoppingCart/ShoppingCart"
import AboutUs from "../pages/PublicPage/AboutUs//AboutUs"
import Product from "../pages/PublicPage/Product/Product";
import Cart from "../components/Cart/Cart";
import Products from "../pages/PublicPage/Products/Products";
import Personal from "../pages/PublicPage/Personal/Personal";
import Payment from "../components/Payment/Payment";
import AdminPage from "../pages/PrivatePage/AdminPage";

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
    path: '/cart',
    page: ShoppingCart
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
  },
  {
    path: 'payment',
    page: Payment
  }
];
const adminRoutes = [
  {
    path: 'admin',
    page: AdminPage
  }
]
const customerRoutes = [

]

export { publicRoutes, adminRoutes, customerRoutes }