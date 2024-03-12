import React from "react";
import Header from "./components/Header/Header";
import { Routes, Route } from "react-router-dom";
import { publicRoutes, adminRoutes, customerRoutes } from "./routes";
import Footer from "./components/Footer/Footer";
import AboutUs from "./pages/PublicPage/AboutUs/AboutUs.jsx";
import "./App.css";

function App() {
  return (
    <Routes>
        <Route
          path="*"
          element={
            <div>
              <Header />
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
    </Routes>
  );
}

export default App;
