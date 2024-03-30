import React from "react";
import { Routes, Route } from "react-router-dom";
import { publicRoutes, adminRoutes, customerRoutes } from "./routes";
import AOS from 'aos';
import 'aos/dist/aos.css';
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import AboutUs from "./pages/PublicPage/AboutUs/AboutUs.jsx";
import Policy from "./pages/PublicPage/Policy/Policy.jsx";
import "./App.css";
import Slider from "./components/Slider/Slider";
import Products from "./pages/PublicPage/Products/Products.jsx";

function App() {
  AOS.init();

  window.addEventListener('scroll', () => {
    AOS.refresh();
  })

  window.addEventListener('click', () => {
    AOS.refresh();
  })

  return (
    <Routes>
        <Route
          path="*"
          element={
            <div>
              <Header />
              {/* <Products /> */}
              <Slider />
              <Routes>
                {publicRoutes.map((route, i) => (
                  <Route key={i} path={route.path} element={<route.page />} />
                ))}
              </Routes>
              <Footer />
            </div>
          }
        />

        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="/products" element={<Products />} />
    </Routes>
  );
}

export default App;
