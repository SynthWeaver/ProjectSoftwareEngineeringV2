const express = require('express');
const middleware = require("./middleware.js");
const router = express.Router();
const path = require('path');
const userController = require('../controllers/userController.js');
const productController = require('../controllers/productController.js');
const orderController = require('../controllers/order.controller.js');
const placesController = require('../controllers/placesController.js');
const orderProductController = require('../controllers/orderProduct.controller.js');
const transactionController = require('../controllers/transactionController.js');


const mailController = require('../mail/mail.js');
const session = require('express-session');
// var cors = require('cors')

// Use the session middleware
router.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 } }))


//PUBLIC ROUTES

// GET home page.
router.get('/', function (req, res, next) {
  res.sendFile(path.join(__dirname, '../../frontend/dis/index.html'));
});

/* POST register. */
router.post('/api/register', async function (req, res, next) {
  const email = req.body.email;
  const password = req.body.password;
  const admin = true;

  const user = await userController.createUser(email, password, admin);

  if (user == null) {
    res.send({ hasUser: false });
  } else {
    res.send({ hasUser: true });
  }

  res.end();
});

async function checkAdmin(){
  const userId = req.session.user;
  if(userId != null){
    const user = await userController.findUserById(userId);
    if(user){
      if(user.admin){
        return true;
      }
    }    
  }

  return false;
}

/* GET admin list. */
router.get('/api/admin/adminlist', middleware.checkAdmin, async function (req, res, next) {
  const adminList = await userController.getAllAdmins();

  res.send({ adminList: adminList });
  res.end();
});

/* POST adminChangeEmail. */
router.post('/api/admin/changeEmail', async function (req, res, next) {
  //check if current user is admin
  if(!checkAdmin()){
    res.send({ hasUser: false });
    res.end();
    return;
  }
  
  const oldEmail = req.body.oldEmail;
  const newEmail = req.body.newEmail;
  const password = req.body.password;

  const user = await userController.updateUser(oldEmail, newEmail, password, password);

  if (user == null) {
    res.send({ hasUser: false });
  } else {
    res.send({ hasUser: true });
  }

  res.end();
});

/* POST admin changePassword. */
router.post('/api/admin/changePassword', async function (req, res, next) {
  //check if current user is admin
  if(!checkAdmin()){
    res.send({ hasUser: false });
    res.end();
    return;
  }
  
  const userId = req.session.user;
  let user = await userController.findUserById(userId);
  const email = user.email;
  const oldPassword = req.body.oldPassword;
  const newPassword = req.body.newPassword;
  const newPassword2 = req.body.newPassword2;

  if(newPassword != newPassword2){
    res.send({ hasUser: false });
    res.end();
    return
  }

  user = await userController.updateUser(email, email, oldPassword, newPassword);

  if (user == null) {
    res.send({ hasUser: false });
  } else {
    res.send({ hasUser: true });
  }

  res.end();
});


/* POST login. */
router.post('/api/login', async function (req, res, next) {
  const email = req.body.email;
  const password = req.body.password;

  const user = await userController.validateUser(email, password);

  if (user == null) {
    res.send({ hasUser: false });
  } else {
    //save id for login purposes
    req.session.user = user.id;
    res.send({ hasUser: true });
  }
  res.end();
});

/* POST logout. */
router.post('/api/logout', async function (req, res, next) {
  if(req.session.user){
    req.session.user = null;
    res.send({ logout: true });
  }else{
    res.send({ logout: false });
  } 
  
  res.end();
});

/* POST login. */
router.post('/api/catalog-items', async function(req, res, next) {  
  const word = req.body.word;

  const product = await productController.findByName(word);

  res.send({ product: product });
  res.end();
});

router.get('/api/allProducts', async function(req, res, next){
  const catalogue = await productController.findAllProductsWithImages();
  res.send({products: catalogue});
  res.end();
});

/* GET api page. */
router.get('/api/test', function (req, res, next) {
  console.log("ye");
  res.write('<h1>Hello, World!</h1>');
  res.end();
});

router.post("/api/mail", async (req, res) => {
  // return mailController.sendGmail.sendEmail(res);
  return mailController.sendGmail.sendEmail(req, res);
})

//Retrieves the current user from the session
router.get("/api/user", async (req, res) => {
  const userId = req.session.user;
  if (userId != null) {
    const user = await userController.findUserById(userId);
    res.send({ user: user });
    res.end();
  } else {
    res.send(false)
    res.end()
  }
})

/* GET orders. */
router.get('/api/orders/new', middleware.checkAdmin, async function (req, res, next) {
  const orders = await orderController.getNewOrders();

  res.send({ orders: orders });
  res.end();
});

/* GET orders. */
router.get('/api/orders/old', middleware.checkAdmin, async function (req, res, next) {
  const orders = await orderController.getOldOrders();
  
  res.send({ orders: orders });
  res.end();
});

router.post("/api/product", async (req, res) => {
  console.log(req.body)
  return productController.createProduct(req, res);
})


router.post("/api/province", async (req, res) => {
  return placesController.createProvince(req, res);

})

router.post("/api/region",  async(req,res)=>{
  return placesController.createRegion(req,res);
})

router.get("/api/region", async (req, res) => {
  return placesController.findRegions(req, res);

})

router.get("/api/regions",  async(req,res)=>{
  return placesController.findAllRegions(req,res);

})

router.post("/api/transactionurl", async(req,res)=>{
  // transactionController.getTransactionUrl(req,res)
  // return res.send({"test":"ds"})
  return res.send(( await transactionController.transactionHandler(req,res)))
})



router.get("/api/product", async (req, res) => {
  console.log(req.body)
  return productController.findAll(req, res);
})


router.post("/api/productOrder", async (req, res) => {
  console.log(req.body)
  return orderProductController.createOrderProduct(req, res);

})

router.get("/api/productOrder",  async(req,res,next)=>{
  console.log(req.body)
  return orderProductController.getProductsOfOrder(req,res,next);
})

router.get('/api/error', function (req, res) {
  throw new Error('BROKEN') // Express will catch this on its own.
})

router.get('/api/syncerror',  function (req, res, next) {
    return orderController.createOrder(req,res);

  fs.readFile('/file-does-not-exist', function (err, data) {
    if (err) {
      next(err) // Pass errors to Express.
    } else {
      res.send(data)
    }
  })
})

router.get("/api/aerror", async function(req,res,next){
  fs.readFile('/file-does-not-exist', function (err, data) {
    if (err) {
      next(err) // Pass errors to Express.
    } else {
      res.send(data)
    }
  })

  // throw new Error('BROKEN',function (err, data) {

  //   if (err) {
  //     next(err) // Pass errors to Express.
  //   } else {
  //     res.send(data)
  //   }
  // }) // Express will catch this on its own.
})

router.post("/api/order", async (req, res) => {
  return await orderController.createOrder(req, res);
})


router.post("/api/realorder", async (req, res) => {
  return await orderController.createRealOrder(req, res);
})

router.get("/api/order", async (req, res) => {
  console.log('Create Order called')
  orderController.createOrder(req, res);
})

router.post("/api/transaction", async (req, res) => {
  return transactionController.createTransaction(req, res);
})

router.get("/api/directories", async(req,res)=>{
  return res.send(( await transactionController.issuerDirectories()))
})

router.get("/api/findimages/:id", async(req, res)=>{
  return res.send( await productController.findImageByProduct(req.params.id)); 
});
router.get("/api/findimages", async(req, res)=>{
  return res.send( await productController.getAllImages()); 
});




module.exports = router;


