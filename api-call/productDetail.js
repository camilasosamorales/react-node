const axios = require('axios');
const api_URLBase = 'https://api.mercadolibre.com/items';


const productDetail = (id) => {
    return axios.all([
        axios.get(`${api_URLBase}/${id}`),
        axios.get(`${api_URLBase}/${id}/description`)
    ])
        .then(axios.spread((product, description) => {
            return transformDataResult(product.data, description.data);
        }));
};

function transformDataResult(itemProduct, itemProductDetail) {
    const response = {};

    var decimals = 0;
    var stringNumber = (itemProduct.price + '').split('.');
    if (stringNumber.length > 1) {
        decimals = stringNumber[1].length;
    }


    response.author = { name: 'Camila', lastname: 'Sosa Morales' };
    response.picture = itemProduct.pictures[0].secure_url;
    response.condition = itemProduct.condition === 'new' ? 'Nuevo' : 'Usado';
    response.free_shipping = itemProduct.shipping.free_shipping;
    response.sold_quantity = itemProduct.sold_quantity;
    response.description = itemProductDetail.plain_text;
    response.item = {
        id: itemProduct.id,
        title: itemProduct.title,
        price: {
            currency: itemProduct.currency_id,
            amount: itemProduct.price.toLocaleString('es-ES'),
            decimals: decimals
        }
    }


    return response;
}


module.exports = productDetail;