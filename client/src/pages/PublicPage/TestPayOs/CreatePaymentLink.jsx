import React from 'react';
import { apiCreatePaymentLink } from '../../../services/payos';

const CreatePaymentLink = () => {
    const orderTest = {
        orderCode: 3148445906,
        amount: 10000,
        description: "Thanh toan don hang",
        items: [
          {
            name: "Mì tôm hảo hảo ly",
            quantity: 1,
            price: 10000,
          }
        ],
        cancelUrl: "http://localhost:3000",
        returnUrl: "http://localhost:3000",
    };

    const handleSubmit = async () => {
        try {
            const response = await apiCreatePaymentLink(orderTest);
            console.log(response);
            // window.location.href= response.data.data.checkoutUrl;
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div>
            <h2>Create Payment Link</h2>
            <button onClick={handleSubmit}>
                Submit
            </button>
        </div>
    );
};

export default CreatePaymentLink;
