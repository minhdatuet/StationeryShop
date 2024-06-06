import React, { useEffect } from "react";
import { Routes, Route, useLocation, matchPath, Navigate } from "react-router-dom";
import { publicRoutes, adminRoutes, customerRoutes } from "./routes";
import AOS from 'aos';
import "./App.css";
import 'aos/dist/aos.css';
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Slider from "./components/Slider/Slider";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

// Load your Stripe publishable key
const stripePromise = loadStripe("pk_test_51PMT0P086JXHzxnMi1v3P83iyqjqQtY5QCmjxqQNHJ1U8xLEjdWvvl2bSDwYILAWn0NgVmNjvHPyjG66XAxAsUzA00qPFN6aV9");

function App() {
  const options = {
    // passing the client secret obtained from the server
    clientSecret: "pi_3POcIg086JXHzxnM1EYqnbhg_secret_UotPXyiCdPVj6vMDCI4MX3b46",
  };

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
    <Elements stripe={stripePromise} options={options}>
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
    </Elements>
  );
}

export default App;
