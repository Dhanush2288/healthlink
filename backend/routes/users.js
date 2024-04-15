var usercontroller = require('../controllers/user.controller')
const orderController = require('../controllers/orders.controller'); // Replace with the actual path
const authcontroller = require('../controllers/auth.controller'); // Replace with the actual path

let express = require("express");
var router = express.Router();

router.post('/signup',async(req,res,next)=>{
    usercontroller.registerUser(req, res);

})

router.get('/pooo',async(req,res,next)=>{
  authcontroller.createConversation(req, res);

})
router.post('/login',async(req,res,next)=>{
    usercontroller.loginUser(req, res);

})

router.post('/createorder', async (req, res, next) => {
  await orderController.createorder(req, res);
});
router.post('/updateOrder', async (req, res, next) => {
  await orderController.updateOrder(req, res);
});

router.get('/getorders', async (req, res, next) => {
  await orderController.getorders(req, res);
});

router.post('/createFuelType', async (req, res, next) => {
  await orderController.createFuelType(req, res);
});

router.get('/getFuelTypes', async (req, res, next) => {
  await orderController.getFuelTypes(req, res);
});

router.post('/createFuelPrice', async (req, res, next) => {
  await orderController.createFuelPrice(req, res);
});

router.get('/getFuelPrices', async (req, res, next) => {
  await orderController.getFuelPrices(req, res);
});

router.post('/createDeliveryRoute', async (req, res, next) => {
  await orderController.createDeliveryRoute(req, res);
});

router.get('/getDeliveryRoutes', async (req, res, next) => {
  await orderController.getDeliveryRoutes(req, res);
});


module.exports= router