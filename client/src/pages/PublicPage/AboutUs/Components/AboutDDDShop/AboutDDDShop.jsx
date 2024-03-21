import React from "react";
import style from './AboutDDDShop.module.scss';
import clsx from "clsx";

const AboutDDDShop = () => {
    return (
        <div className={clsx(style.container)}>
            <h1>
                About DDD Shop
            </h1>
            <div className={clsx(style.concept)}>
                <ul>
                    <li>Welcome to DDD Shop, where you can find a complete and diverse range of quality office products!</li>
                    <li>We provide everything from basic stationery to specialized equipment, meeting the needs of both businesses and individuals. Our mission is to bring you a convenient, fast and safe shopping experience.</li>
                    <li>With a commitment to quality and customer satisfaction, we always update and provide the latest products from trusted suppliers. Also, through our blog, you can learn tips and tricks to optimize your workspace.</li>
                    <li>With a team of experienced and enthusiastic staff, DDD Shop is ready to support you at all times. Thank you for choosing us as your trusted partner for all your stationery needs!</li>
                </ul>
            </div>
        </div>
    )
}

export default AboutDDDShop
