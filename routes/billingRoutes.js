const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);

module.exports = app => {
    app.post('/api/stripe', async (req, res) => {
        const charge = await stripe.charges.create({
            amount: 500,
            currency: 'usd',
            description: '$5 for 5 credits',
            source: req.body.id
            // ^^ this is the id token passed back from stripe that associates 
            // the charge to a specific credit card
        });

        req.user.credits += 5;
        // ^^ this is given automatically by passport session
        const user = await req.user.save();

        res.send(user);
    });
};