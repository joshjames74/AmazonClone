export const pattern = {
    host: 'http:\/\/localhost:3000',
    api: '\/api'
}

export const url = {
    host: 'http://localhost:3000',
    api: '/api'
};

const api_pattern = pattern.host + pattern.api;
const api_url = url.host + url.api;
const product_url = api_url + '/product';
const basket_url = api_url + '/basket';
const order_url = api_url + '/order';

const id_match = '[0-9]+'

// const base_api = base_routes.host + base_routes.api;
// const base_api_pattern = base_routes.host + base_routes.api;
// const base_user = base_api + `\/user\/${id_match}`;
// const base_product = base_api + `\/product\/${id_match}`;
// const base_basket = base_api + `\/basket\/${id_match}`;
// const base_order = base_api + `\/order\/${id_match}`;
// const base_currency = base_api + '/currency';

// const patterns: Object = {
//     user: `\/user\/${id_match}`,
//     product: `\/product\/${id_match}`,
//     basket: `\/basket\/${id_match}`,
//     order: '\/order',
//     currency: '\/currency'
// };

// const urls = {
//     user: '/user/{user_id}',
//     product: '/product/{product_id}',
//     basket: '/basket/{basket_id}',
//     order: '/order',
//     currency: '/currency',
// }

// Add base api pattern to each pattern url
// const set_patterns = (patterns) => {
//     const base_patterns = {}
//     for (const [key, value] of Object.entries(patterns)) {
//         base_patterns[key] = base_api_pattern + value;
//     }
//     return base_patterns;
// }

// // Add base api to each url
// const set_urls = (urls) => {
//     const base_urls = {}
//     for (const [key, value] of Object.entries(urls)) {
//         base_urls[key] = base_api + value;
//     }
//     return base_urls;
// }

// const set_base = (urls, patterns) => {
//     const blank_values = {
//         url: null,
//         pattern: null,
//     }
//     const base = {
//         user: blank_values,
//         product: blank_values,
//         basket: blank_values,
//         order: blank_values,
//         currency: blank_values,
//     }

//     urls = set_urls(urls);
//     console.log(urls);
//     for (const [key, value] of Object.entries(urls)) {
//         console.log(key, value);
//         base[key].url = value;
//     }

//     console.log(base);
//     patterns = set_patterns(patterns);
//     for (const [key, value] of Object.entries(patterns)) {
//         base[key].pattern = value;
//     }

//     return base;
// }
// To do: change api_routes so that every route has a
// url and match

const base_api = 'http://localhost:3000/api'

export const routes = {
    product: {
        post: base_api + '/product',
        product: base_api + '/product/:id',
        reviews: base_api + '/product/:id/reviews',
        all: base_api + '/product'
    },
    user: {
        user: base_api + '/user/:id',
        currency: base_api + '/user/:id/currency',
        basket: base_api + '/user/:id/basket',
        orders: base_api + '/user/:id/orders',
        add: base_api + '/user/add',
        add_order: base_api + '/user/:id/order',
        add_review: base_api + '/user/:id/review/add'
    },
    currency: {
        currency: base_api + '/currency/:id',
        all: base_api + '/currency'
    }
}

export const api_routes = {
    // basket: {
    //     // get_basket: base_basket,
    //     // add_to_basket: `${base_basket}\/add\/${id_match}$`,
    //     // delete_from_basket: `${base_basket}\/delete\/${id_match}$`
    //     get_basket: {
    //         url: product_url,
    //         pattern: base_product
    //     },
    //     add
    // },
    // user: {
    //     // get_user: base_user,
    //     // currency: `${base_user}/currency$`,
    //     // basket: `${base_user}/basket$`,
    //     // order: `${base_user}/order$`,
    //     // add_product: `${base_user}/product/add$`
    // },
    user: {
        get_user: {
            url: api_url + `/user/{user_id}`,
            pattern: api_pattern + `\/product\/${id_match}`
        },
        orders: {
            url: api_url + `/user/{user_id}/order`,
            pattern: api_pattern + `\/user\/${id_match}\/order`
        }
    },
    product: {
        //get_product: `${base_product}`,
        // get_product: 'http:\/\/localhost:3000\/api\/product\/[^\/]+',
        // // get_product: '.+/gm',
        // reviews: `${base_product}`
        get_product: {
            url: api_url + `/product/:id`,
            pattern: api_pattern + `\/product\/${id_match}`
        },
        reviews: {
            url: api_url + `/product/{product_id}/review`,
            pattern: api_pattern + `\/product\/${id_match}\/review`
        }
    },
    order: {
        get_order: {
            url: api_url + `/order/{order_id}`,
            pattern: api_pattern + `\/order\/${id_match}`
        }
    },
    currency: {
        get_currency: {
            url: api_url + `/currency/{currency_id}`,
            pattern: api_pattern + `\/currency\/${id_match}`
        }
    }
};