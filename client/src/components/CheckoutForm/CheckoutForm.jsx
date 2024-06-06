import { PaymentElement } from '@stripe/react-stripe-js';
import { apiCreatePaymentIntent } from '../../services/stripe';
import { useEffect } from 'react';

const CheckoutForm = () => {
    useEffect(() => {
        const createPaymentIntent = async () => {
            try {
                const response = await apiCreatePaymentIntent();
                console.log(response);
            } catch (error) {
                console.error(error);
            }
        };
        createPaymentIntent();
    }, []);

    return (
        <form>
            <PaymentElement />
            <button>Submit</button>
        </form>
    );
};

export default CheckoutForm;