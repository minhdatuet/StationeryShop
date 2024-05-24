const payos = require('../../payos');

// POST
exports.createPaymentLink = async (req, res) => {
    const { orderCode, description, returnUrl, cancelUrl, amount } = req.body;
    const body = { orderCode, amount, description, cancelUrl, returnUrl };
    try {
        const paymentLinkRes = await payos.createPaymentLink(body);

        return res.json({
            error: 0,
            message: "Success",
            data: {
                bin: paymentLinkRes.bin,
                checkoutUrl: paymentLinkRes.checkoutUrl,
                accountNumber: paymentLinkRes.accountNumber,
                accountName: paymentLinkRes.accountName,
                amount: paymentLinkRes.amount,
                description: paymentLinkRes.description,
                orderCode: paymentLinkRes.orderCode,
                qrCode: paymentLinkRes.qrCode,
            },
        });
    } catch (error) {
        return res.json({
            error: -1,
            message: "fail at payosController createPaymentLink " + error,
            data: null,
        });
    }
}

//GET
exports.getPaymentLinkInfomation = async (req, res) => {
    try {
        const order = await payos.getPaymentLinkInformation(req.params.orderId);
        if (!order) {
            return res.json({
                error: -1,
                message: "getPaymentLinkInfomation failed",
                data: null,
            });
        }
        return res.json({
            error: 0,
            message: "getPaymentLinkInfomation success",
            data: order,
        });
    } catch (error) {
        console.log(error);
        return res.json({
            error: -1,
            message: "fail at payosController getPaymentLinkInfomation " + error,
            data: null,
        });
    }
}

//PUT
exports.cancelPaymentLink = async (req, res) => {
    try {
        const { orderId } = req.params;
        const body = req.body;
        const order = await payos.cancelPaymentLink(orderId, body.cancellationReason);
        if (!order) {
            return res.json({
                error: -1,
                message: "cancelPaymentLink failed",
                data: null,
            });
        }
        return res.json({
            error: 0,
            message: "cancelPaymentLink success",
            data: order,
        });
    } catch (error) {
        console.error(error);
        return res.json({
            error: -1,
            message: "fail at payosController cancelPaymentLink " + error,
            data: null,
        });
    }
}

//POST
exports.confirmWebHook = async (req, res) => {
    const { webhookUrl } = req.body;
    try {
        await payos.confirmWebhook(webhookUrl);
        return res.json({
            error: 0,
            message: "confirmWebHook success",
            data: null,
        });
    } catch (error) {
        console.error(error);
        return res.json({
            error: -1,
            message: "fail at payosController confirmWebHook " + error,
            data: null,
        });
    }
}

//POST
exports.verifyPaymentWebhookData = async (req, res) => {
    const webhookData = payos.verifyPaymentWebhookData(req.body);
    console.log(req.body);

    // if (
    //     ["Ma giao dich thu nghiem", "VQRIO123"].includes(webhookData.description)
    // ) {
    //     return res.json({
    //         error: 0,
    //         message: "verifyPaymentWebhookData success",
    //         data: webhookData
    //     });
    // }

    // Source code uses webhook data

    return res.json({
        error: 0,
        message: "Ok",
        data: webhookData
    });
}
