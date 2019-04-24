const axios = require('axios');
const api_BaseURL = "https://api.mercadolibre.com/sites/MLA";


const searchProducts = (query) => {
    return axios.get(`${api_BaseURL}/search?q=${query}&limit=4`)
        .then((response) => {
            return transformDataResponse(response.data);

        })
        .catch((error) => {
            return error;
        });

};

const transformDataResponse = (data) => {
    const response = {};
    response.author = { name: 'Camila', lastname: 'Sosa Morales' };
    response.items = transformItemsResponse(data.results);
    response.categories = transformCategoriesResponse(data.filters);

    return response;

}

const transformItemsResponse = (items) => {
    return items.map((item) => {
        var decimals = 0;
        var stringNumber = (item.price + '').split('.');
        if (stringNumber.length > 1) {
            decimals = stringNumber[1].length;
        }
        return {
            id: item.id,
            title: item.title,
            price: {
                amount: item.price.toLocaleString('es-ES'),
                currency: item.currency_id,
                decimals: decimals
            },
            picture: item.thumbnail,
            condition: item.condition,
            free_shipping: item.shipping.free_shipping,
            address: item.address.state_name
        };
    });

}

const transformCategoriesResponse = (filters) => {
    let categories = []

    categories = filters.map((category) => {
        return category.name;

    });

    return categories
}

module.exports = searchProducts;