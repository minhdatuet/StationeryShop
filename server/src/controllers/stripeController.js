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

exports.createCheckOutSession = async (req, res) => {
    try {
        const { name, amount, success_url, cancel_url } = req.body;
        const session = await stripe.checkout.sessions.create({
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: name,
                        },
                        unit_amount: amount,
                    },
                    quantity: 1,
                },
            ],
            payment_method_types: ['card'],
            mode: 'payment',
            success_url: success_url,
            cancel_url: cancel_url,
        });
        res.json(session)
    }
    catch (error) {
        return res.json({
            error: -1,
            message: "fail at stripeController createCheckOutSession " + error,
            data: null,
        });
    }
}

exports.retrieveASession = async (req, res) => {
    try {
        const id = req.params.id;
        const session = await stripe.checkout.sessions.retrieve(id);
        res.json(session)
    }
    catch (error) {
        return res.json({
            error: -1,
            message: "fail at stripeController retrieveASession " + error,
            data: null,
        });
    }
}
