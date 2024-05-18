import React from "react";
import { Routes, Route } from "react-router-dom";
import { publicRoutes, adminRoutes, customerRoutes } from "./routes";
import AOS from 'aos';
import "./App.css";
import 'aos/dist/aos.css';
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
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
              ))},
              {adminRoutes.map((route, i) => (
                <Route key={i} path={route.path} element={<route.page />} />
              ))}
            </Routes>
            <Footer />
          </div>
        }
      />
    </Routes>
  );
}

export default App;
