const express= require('express')
const User=require('../models/User')
const router=express.Router();
router.post( '/',(req, res)=>{
console.log(req.body);
const u=User(req.body)
u.save()
res.send("asdasd");
    }
)
module.exports=router;