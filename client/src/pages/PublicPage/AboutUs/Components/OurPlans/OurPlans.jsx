import React from 'react';
import style from './OurPlans.module.scss';
import clsx from 'clsx';

const OurPlans = () => {
    return (
        <div className={clsx(style.container)}>
            <h1>Our Future Plans</h1>
            <div className={clsx(style.concept)}>
                <ul>
                    <li>Product Expansion: We will continuously expand our product portfolio to meet the diverse needs of customers. By strengthening cooperation with reliable suppliers, we will provide customers with a more diverse and richer choice.</li>
                    <li>Optimize Shopping Experience: We are committed to enhancing our customers' online shopping experience. From improving the user interface to optimizing the checkout process, we will create a more convenient, easy-to-use and secure shopping environment.</li>
                    <li>Developing Loyalty Programs: We will create promotions and special offers for loyal customers. By offering bonus points and exclusive offers, we aim to create a community of happy and satisfied customers.</li>
                    <li>Expanding Delivery Range: We will endeavor to expand our delivery range to meet customers' shipping needs. By working with trusted shipping partners, we provide customers with a fast and reliable delivery experience.</li>
                    <li>Dedicated Customer Care: We will continue to enhance our customer care service to ensure all customer questions and requests are resolved quickly and effectively.</li>
                </ul>
            </div>
        </div>
    )
}

export default OurPlans
