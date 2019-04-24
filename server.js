const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

const searchProducts = require('./api-call/searchProducts');
const productDetail = require('./api-call/productDetail');

// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));


//calling de ML API
app.get('/items', function (req, res, next) {
    const q = req.query.search;

    if (!!q) {
        searchProducts(q)
            .then((response) => {
                res.json(response);
            })
    } else {
        res.status(400).send({
            error: 'Param \'search\' not found on the query URL.'
        });
    }

});

app.get('/items/:id', function (req, res, next) {
    const id = req.params.id;
    if (!!id) {
        productDetail(id)
            .then((response) => {
                res.json(response);
            })
    } else {
        res.status(400).send({
            error: 'Param \'search\' not found on the query URL.'
        });
    }

});