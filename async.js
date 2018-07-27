var axios = require('axios');
var fs = require('fs');
var _ = require('lodash');

async function asyncFetchData() {
    try {
        let res = await axios({
        url: 'http://localhost:3001/api/products',
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'X-Spree-Token': 'd67d939bf4a50f5dcdf31cf3b45a9890e2ff34b45a67dde9'
        }
    })
    if(res.status == 200) {
        console.log(res.status);
    }
    return res.data;
    }
    catch (err) {
        console.error(err);
    }
}

asyncFetchData().then(res => {
    let products = JSON.stringify(res.products)
    console.log(products);
});
// Iterate through the json data's products array - Maybe with lodash
// Make each product object in product array into a separate json file with product name 
// as the file name - using fs function


module.exports = {asyncFetchData};
 