const { STRIPE_PUBLISHABLE_KEY, STRIPE_SECRET_KEY } = process.env;
const prices = 25
const stripe = require('stripe')(STRIPE_SECRET_KEY)

const renderBuyPage = async (req, res) => {

    try {

        res.render('buy', {
            key: STRIPE_PUBLISHABLE_KEY,
            amount: prices
        })

    } catch (error) {
        console.log(error.message);
    }

}

const payment = async (req, res) => {

    try {

        stripe.customers.create({
            email: req.body.stripeEmail,
            source: req.body.stripeToken,
            name: 'Mirth',
            address: {
                line1: '40 W 4th St',
                postal_code: '10012',
                city: 'New York',
                state: 'NY 10012',
                country: 'USA',
            }
        })
            .then((customer) => {

                return stripe.charges.create({
                    amount: prices,     // amount will be amount*100
                    description: req.body.productName,
                    currency: 'USD',
                    customer: customer.id
                });
            })
            .then((charge) => {
                res.send("success")
            })
            .catch((err) => {
                res.send("failure")
            });


    } catch (error) {
        console.log(error.message);
    }

}



module.exports = {
    renderBuyPage,
    payment,
}