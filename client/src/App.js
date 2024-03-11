import React from "react";
import Header from "./conponents/Header/Header";
import { Routes, Route } from "react-router-dom";
import { publicRoutes, adminRoutes, customerRoutes } from "./routes";
import Footer from "./conponents/Footer/Footer";
import "./App.css";
import Slider from "./conponents/Slider/Slider";


function App() {
  return (
    <Routes>
        <Route
          path="*"
          element={
            <div>
              <Header />
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
    </Routes>
  );
}

export default App;
