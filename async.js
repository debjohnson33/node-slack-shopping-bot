var axios = require('axios');
var fs = require('fs');
var _ = require('lodash');
const camelCase = require('camelcase');

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
    let products = res.products;
    // Iterate through the json data's products array
    _.forEach(products, function(product, index){ 
        // Make each product object in product array into a separate json file with product name 
        // as the file name - using fs function
        let fileName = camelCase(product.name);
        try {
            fs.writeFileSync('data/' + fileName + '.json', JSON.stringify(product));
        } catch (err) {
            console.log("Cannot write file ", e)
        }
        //console.log(JSON.stringify(product.name));
    });
});





module.exports = {asyncFetchData};
 