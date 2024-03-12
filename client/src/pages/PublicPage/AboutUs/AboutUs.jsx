import React from 'react'
import './AboutUs.css'
import Header from '../../../components/Header/Header'
import AboutDDDShop from './Components/AboutDDDShop/AboutDDDShop'
import OurPlans from './Components/OurPlans/OurPlans'
import TeamMember from './Components/TeamMember/TeamMember'
import Footer from '../../../components/Footer/Footer'

const AboutUs = () => {    
    
    return(
        <div>
            <Header />
            <AboutDDDShop />
            <OurPlans />
            <TeamMember />
            <Footer />
        </div>
    )
}

export default AboutUs