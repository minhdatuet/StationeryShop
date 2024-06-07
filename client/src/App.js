import React, { useEffect } from "react";
import { Routes, Route, useLocation, matchPath, Navigate } from "react-router-dom";
import { publicRoutes, adminRoutes, customerRoutes } from "./routes";
import AOS from 'aos';
import "./App.css";
import 'aos/dist/aos.css';
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Slider from "./components/Slider/Slider";

function App() {
  useEffect(() => {
    AOS.init();

    const handleScrollOrClick = () => {
      AOS.refresh();
    };

    window.addEventListener('scroll', handleScrollOrClick);
    window.addEventListener('click', handleScrollOrClick);

    return () => {
      window.removeEventListener('scroll', handleScrollOrClick);
      window.removeEventListener('click', handleScrollOrClick);
    };
  }, []);

  const location = useLocation();

  const isPublicRoute = publicRoutes.some(route => matchPath(route.path, location.pathname));
  const isAdminRoute = adminRoutes.some(route => matchPath(route.path, location.pathname));
  const isHomeRoute = location.pathname === "/" || location.pathname === "*";

  const userType = localStorage.getItem('type');

  // if (userType === 'ADMIN' && location.pathname.startsWith('/admin')) {
  //   return <Navigate to="/admin" replace />;
  // }

  if (userType === 'CUSTOMER' && isAdminRoute) {
    return <Navigate to="/" replace />;
  }

  return (
      <>
        {!isAdminRoute && isPublicRoute && <Header />}
        {!isAdminRoute && isPublicRoute && isHomeRoute && <Slider />}
        <Routes>
          {publicRoutes.map((route, i) => (
            <Route key={i} path={route.path} element={<route.page />} />
          ))}
          {userType === 'ADMIN' && adminRoutes.map((route, i) => (
            <Route key={i} path={route.path} element={<route.page />} />
          ))}
          {userType === 'CUSTOMER' && customerRoutes.map((route, i) => (
            <Route key={i} path={route.path} element={<route.page />} />
          ))}
        </Routes>
        {!isAdminRoute && isPublicRoute && <Footer />}
      </>
  );
}

export default App;
