const validate = require('./validate.js');

const {
    sequelize,
    Product,
    Image
} = require('../models')

async function createImage(passedUrl, passedId) {
    try {
        await Image.sync({
            force: false
        });
        const imageUrl = passedUrl
        const productId = passedId
        const image = await Image.create({
            imageUrl: imageUrl,
            ProductId: productId
        })
    } catch (error) {
        console.log(error)
    }
}

async function createProduct(req, res) {
    try {
        if (req == null) {
            return;
        }
        await Product.sync({
            force: false
        });

        const {
            name,
            category,
            price,
            description,
            province,
            region,
            imageUrl,
        } = req.body

        const product = await Product.create({
            name,
            category,
            price,
            description,
            province,
            region,
        })

        await createImage(imageUrl, product.id)

        return res.json(product)
    } catch (error) {
        console.log(error)
        return res.status
    }
}

async function getHeaderImageOfProduct() {
    return imageUrl; 
}

async function findAll() {
    try {
        const products = await Product.findAll();
        return products;
    } catch (error) {
        console.log(error)
    }
};

async function getProductByProvince(province){
    const products = this.findAll();
    const productsMatchingProvince = [];  
    for(let i = 0; i < products.len(); i++  ){
        if(products[i].province = province){
            productsMatchingProvince.push(products[i]);
        }
    }
    return productsMatchingProvince; 
}

async function findProductByName(name) {
    //validate if string is safe
    if (!validate.string(name)) {
        return null;
    }
    try {
        const product = await Product.findOne({
            where: {
                name: name
            }
        });

        return product;
    } catch (error) {
        console.log(error)
    }
};

async function findProductsByKeyword(keyword) {
    //validate if keyword is a safe string
    if (!validate.string(keyword)) {
        return null;
    }

    const Sequelize = require('sequelize');
    const Op = Sequelize.Op;
    const products = await Product.findAll({
        where: {
            [Op.or]: [{
                    name: {
                        [Op.like]: `%${keyword}%`,
                    }
                },
                {
                    description: {
                        [Op.like]: `%${keyword}%`,
                    }
                },
            ]
        }
    });

    return products;
};

async function findImageByProduct(productId) {

    const imageUrls = await Image.findAll({
        where: {
            ProductId: productId
        }
    });
    // console.log(imageUrls)
    return imageUrls;
};

async function getAllImages() {

    const imageUrls = await Image.findAll({
        
    });
    // console.log(imageUrls)
    return imageUrls;
};

async function returnAllProductsWithImages(req,res){
    return await findAllProductsWithImages()
}

async function findAllProductsWithImages() {
    const products = await Product.findAll();
    let productArray = []
    let imageUrls = []

    for (record in products) {
        ProductId = products[record].dataValues.id

        let productObj = products[record].dataValues
        productObj.imageUrls=[]

        imageUrls = await findImageByProduct(ProductId)
        for (regionRecord in imageUrls) {
            productObj.imageUrls.push(imageUrls[regionRecord].imageUrl)
        }
        productArray.push(productObj)
    }
    // res.send(productArray)
    return productArray
}

module.exports = {
    createProduct,
    findAll,
    findProductByName,
    findProductsByKeyword,
    returnAllProductsWithImages,
    findAllProductsWithImages, 
    findImageByProduct,
    getAllImages

}