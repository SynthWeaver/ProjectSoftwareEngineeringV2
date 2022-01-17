'use strict';


const product = require("../models/product");
const {
    sequelize,
    OrderProduct,
    Order,
    Product,
    Image
} = require('../models');
const images = require("../models/images");


module.exports = {
  up: async (queryInterface, Sequelize) => {
    let date = new Date(); 

    await OrderProduct.drop();
    await Order.drop(); 
    await Image.drop();

    

    await Product.sync({ force: true });
    await queryInterface.bulkInsert('Products', [
      {name: 'Tulp Haarspeld', price: '9.95', province: 'Groningen', createdAt: date, updatedAt: date },
      {name: 'Starry Nights Haarspeld', price: '19.95', province: 'Drenthe', createdAt: date, updatedAt: date},
      {name: 'Mona Lisa Haarspeld', price: '7.95', province: 'Noord-Holland', createdAt: date, updatedAt: date},
      // {name: 'Ovaal 2', price: '7.95', province: 'Zuid-Holland',  createdAt: date, updatedAt: date},
      {name: 'Zilveren oud-Groningsche Ring', price: '18.95', province: 'Gelderland',createdAt: date, updatedAt: date},
           {name: 'Amsterdamse Wiet Collier', price: '42.00', province: 'Amsterdam',createdAt: date, updatedAt: date}
           ,
                {name: 'Friesche (G)oude Ring', price: '29.95', province: 'Gelderland',createdAt: date, updatedAt: date},
                
                          {name: 'Mystieke Haagse Kat ring', price: '69.69', province: 'Gelderland',createdAt: date, updatedAt: date}
      
    ], {});




    await Image.sync({ force: true });
    await queryInterface.bulkInsert('Images', [
    {imageUrl: 'https://i.postimg.cc/YjTszDxP/1bdc32585b8ffd16df0fdeec34823052dbfa5ab9-tulip-b.png',  createdAt: date, updatedAt: date, ProductId:1},
  
    {imageUrl: 'https://i.postimg.cc/BtPhbcGB/35ff155f22cab86af0a652679b78199e4b05761c-hgfnuitnuit.png',  createdAt: date, updatedAt: date, ProductId:2},
 
    {imageUrl: 'https://i.postimg.cc/vBvCwzQ1/71244051722b2a9de10c1d0d12027f12bb0803cetres.png',  createdAt: date, updatedAt: date, ProductId:3},

  {imageUrl: 'https://i.postimg.cc/nhQ5hZFf/thumbnail-SAM-01013-res.png',   createdAt: date, updatedAt: date, ProductId:4},
  {imageUrl: 'https://i.postimg.cc/7YRd4byN/thumbnail-SAM-0100-2-3re-1.png',   createdAt: date, updatedAt: date, ProductId:4}, //zilveren ring

    {imageUrl: 'https://i.postimg.cc/D0jD8w4n/thumbnail-collier-groen-blad-wiet-removebg.png',   createdAt: date, updatedAt: date, ProductId:5},
{imageUrl: 'https://i.postimg.cc/Jn8SFgWV/thumbnail-collier-wiet2-removebg.png',   createdAt: date, updatedAt: date, ProductId:5}, 
{imageUrl: 'https://i.postimg.cc/76TvHLz7/fdfdfd.png',   createdAt: date, updatedAt: date, ProductId:5}, 

    {imageUrl: 'https://i.postimg.cc/QM1R0DwJ/DSC-1961-2-re.png',   createdAt: date, updatedAt: date, ProductId:6}, //gouden ring
{imageUrl: 'https://i.postimg.cc/rFs37x7m/thumbnail-DSC-1954e-res.png',   createdAt: date, updatedAt: date, ProductId:6},



    {imageUrl: 'https://i.postimg.cc/7YQ8LmS0/thumbnail-bv.jpg',   createdAt: date, updatedAt: date, ProductId:7},
       {imageUrl: 'https://i.postimg.cc/d3tpsy15/thumbnail-m.jpg',   createdAt: date, updatedAt: date, ProductId:7}, //haagse kat
      
  

    ], {});
    await Order.sync({ force: true });
    await queryInterface.bulkInsert('Orders', [
      { placedAt: '2020-06-01 12:03:06', userEmail: 'tim@tterwijn.nl', status: 1,  createdAt: date, updatedAt: date },
      { placedAt: '2020-07-01 12:03:06', userEmail: 'rik@gmail.com', status: 1,  createdAt: date, updatedAt: date },
      { placedAt: '2020-08-01 12:03:06', userEmail: 'mees@gmail.com', status: 1,  createdAt: date, updatedAt: date },
      { placedAt: '2020-09-01 12:03:06', userEmail: 'adam@gmail.com',  status: 1,  createdAt: date, updatedAt: date },
      { placedAt: '2020-10-01 12:03:06', userEmail: 'luuk@gmail.com', status: 0,  createdAt: date, updatedAt: date },
      { placedAt: '2020-11-01 12:03:06', userEmail: 'youssef@gmail.com', status: 0,  createdAt: date, updatedAt: date },
      { placedAt: '2020-12-01 12:03:06', userEmail: 'yasmine@gmail.com',  status: 0,  createdAt: date, updatedAt: date },
      { placedAt: '2021-01-01 12:03:06', userEmail: 'stefan@gmail.com',  status: 0,  createdAt: date, updatedAt: date },
    ], {});


    await OrderProduct.sync({ force: true });
    await queryInterface.bulkInsert('orderproducts', [
      { orderId:1, productId:1, quantity: 1, createdAt: date, updatedAt: date },
      { orderId:1, productId:2, quantity: 2, createdAt: date, updatedAt: date },
      { orderId:2, productId:3, quantity: 3, createdAt: date, updatedAt: date },
      { orderId:2, productId:4, quantity: 4, createdAt: date, updatedAt: date },
      { orderId:3, productId:2, quantity: 3, createdAt: date, updatedAt: date },
      { orderId:3, productId:4, quantity: 2, createdAt: date, updatedAt: date },
      { orderId:4, productId:3, quantity: 1, createdAt: date, updatedAt: date },
      { orderId:4, productId:2, quantity: 2, createdAt: date, updatedAt: date },
      { orderId:5, productId:1, quantity: 3, createdAt: date, updatedAt: date },
      { orderId:5, productId:2, quantity: 4, createdAt: date, updatedAt: date },
      { orderId:6, productId:4, quantity: 3, createdAt: date, updatedAt: date },
      { orderId:6, productId:3, quantity: 2, createdAt: date, updatedAt: date },
      { orderId:7, productId:2, quantity: 3, createdAt: date, updatedAt: date },
      { orderId:7, productId:1, quantity: 4, createdAt: date, updatedAt: date },
      { orderId:8, productId:1, quantity: 3, createdAt: date, updatedAt: date },
      { orderId:8, productId:2, quantity: 2, createdAt: date, updatedAt: date },
    ], {});


    const products = await queryInterface.sequelize.query(
      `SELECT * FROM PRODUCTS;`
    );
      console.log("All products: ", products);

      
    const orders = await queryInterface.sequelize.query(
      `SELECT * FROM ORDERS;`
    );
      console.log("All orders: ", orders);

      const orderproducts = await queryInterface.sequelize.query(
        `SELECT * FROM ORDERPRODUCTS;`
      );
        console.log("All orders: ", orderproducts);
  
  


    },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('products', null, {},'orders', null, {},'orderproducts', null, {},'images', null, {}); 
    
  }

};