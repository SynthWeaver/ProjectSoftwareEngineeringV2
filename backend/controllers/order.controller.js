const {
    sequelize,
    Order,
    OrderProduct,
    Product
} = require('../models');
const orderProductController = require('../controllers/orderProduct.controller.js');


/**
 */
async function createOrder(req, res) {
    try {
        if (req == null) {
            return;
        }
        await Order.sync({
            force: false
        });
        const {
            userEmail,
            placedAt,
            status
        } = req.body
        const order = await Order.create({
            userEmail,
            placedAt,
            status

        })
        return res.json(order)
    } catch (error) {
        console.log(error)
        return res.status
    }

}

/**
 * This method checks and creates an order with products. A transaction object is not made, however.
 * this method checks whether an Order is acceptable.
 * If it is acceptable it creates the order and adds the products to the order.
 */
async function createRealOrder(req, res) {
    let {
        userEmail,
        placedAt,
        products
    } = req.body

    
    // The products variable should be an array of ProductId's with quantities.
    let valid = await orderProductController.checkProducts(products)
    if (valid) {
        try {
            await Order.sync({
                force: false
            });
            let status = 1; 
            const order = await Order.create({
        
                userEmail,
                placedAt,
                status
            })

            orderProductController.addProducts(products, order.id)

        } catch (error) {

        }
    }

    return res.json({
        "Status": "Success"
    })
}

async function getNewOrders() {
    const newOrders = await Order.findAll({
        include: Product,
        where: {
            status: 1
        }
    });

    return newOrders;
};

async function getOldOrders() {
    const oldOrders = await Order.findAll({
        include: Product,
        where: {
            status: 0
        }
    });

    return oldOrders;
};


module.exports = {
    createOrder,
    getNewOrders,
    createRealOrder,
    getOldOrders,
};