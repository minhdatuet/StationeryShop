import React from "react";
import Header from "../../../components/Header/Header";
import PrivacyPolicy from "./Components/PrivacyPolicy/PrivacyPolicy";
import RefundPolicy from "./Components/RefundPolicy/RefundPolicy";
import Footer from "../../../components/Footer/Footer";

const Policy = () => {
    return (
        <div>
            <Header />
            <PrivacyPolicy />
            <RefundPolicy />
            <Footer />
        </div>
    )
}

export default Policy;
