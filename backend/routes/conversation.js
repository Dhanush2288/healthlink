var converstion = require('../controllers/converstion.controller')
let express = require("express");
var router = express.Router();
const authenticate = require('../middleware/authenticate');

router.post('/',async(req,res,next)=>{
     try {
        var data = await converstion.createConversation(req.body);
        res.send({ success: true, message: "created", datas: data })
    } catch (error) {
        res.send({ success: false, message: "error", data: error })
    }
})
router.get('/',async(req,res,next)=>{
    try {
       var data =await converstion.getconverstionuser(req.query);
       res.send({ success: true, message: "success", response: data })
   } catch (error) {
       res.send({ success: false, message: "error", response: error })
   }
})
router.get('/secc',async(req,res,next)=>{
    try {
       var data =await converstion.getconverstionusersec(req.query);
       res.send({ success: true, message: "success", response: data })
   } catch (error) {
       res.send({ success: false, message: "error", response: error })
   }
})
module.exports= router