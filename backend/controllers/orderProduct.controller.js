const {
    sequelize,
    OrderProduct,
    Product
} = require('../models');

async function createOrderProduct(req, res, next) {
    try {
        if (req == null) {
            return;
        }
        await OrderProduct.sync({
            force: false
        });
        const {
            quantity,
            OrderId,
            ProductId
        } = req.body
        console.log(req.body)
        const holdProduct = await OrderProduct.create({
            quantity,
            OrderId,
            ProductId
        })
        return res.json(holdProduct)
    } catch (error) {
        console.log(error)
        res.status = 500;
        return res.json({
            "error": "something went wrong"
        })
    }
}


async function getProductsOfOrder(req, res, next) {
    console.log('test')
    const {
        orderId
    } = req.body;
    const products = await retreiveProducts(orderId, function (err, data) {
        if (err) {
            return next(err) // Pass errors to Express.
        } else {
            res.send(data)
        }
    })
    return res.json(products);
    // } catch (error) {
    //     console.log(error)

    // }
}

async function retreiveProducts(orderId) {
    try {
        const products = await OrderProduct.findAll({
            where: {
                OrderId: orderId,
            }
        })
        console.log(products)
        return products
    } catch (error) {
        console.log(error)
    }
}

async function checkProducts(products) {
    console.log('products =', products)
    products.forEach(element => {
        console.log('productElement:' + element)
    });

    return true;
}

async function addProducts(products, OrderId) {
    try {

        await OrderProduct.sync({
            force: false
        });


        /**
         * This method should actually check the products 
         */
        let total = 0;

        products.forEach(async product => {
            let dbProduct = await Product.findOne({
                where: {
                    id: product.ProductId
                }
            });
            //todo verplaats quantity met juiste stuff
            let quantity = product.quantity
            let ProductId = dbProduct.id
            let amount = dbProduct.amount
            const holdProduct = await OrderProduct.create({
                quantity,
                OrderId,
                ProductId,
                amount
            })

            total += (product.price)
        });

        if (total > 50) {
            return true;
        }
        //TODO return false
        else {
            console.log('amount is actually less than 50')
            return true;
        }
    } catch (error) {
        console.log(error)
    }
}



module.exports = {
    createOrderProduct,
    getProductsOfOrder,
    checkProducts,
    addProducts
};