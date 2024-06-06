const stripe = require('../../stripe');

exports.makePayment = async (req, res) => {
    const paymentIntent = await stripe.paymentIntents.create({
        amount: 2000,
        currency: 'usd',
        payment_method_types: ['card'],
        // automatic_payment_methods: {
        //     enabled: true,
        // },
    });
    return res.send(paymentIntent);
};
