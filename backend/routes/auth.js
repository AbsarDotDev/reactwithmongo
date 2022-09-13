
const express= require('express')
const bcryptjs= require('bcryptjs')
const User=require('../models/User')
const fetchUser=require('../middleware/fetchuser')

const { body, validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const JSON_SECRET_KEY="Hell0Peter"
const router=express.Router();
router.post( '/createuser',[
body('email','Enter Valid Email').isEmail(),
body('name').isLength({ min: 5 }),
body('password').isLength({ min: 5 }),

],async (req, res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const salt=await bcryptjs.genSalt(10);
const mypass=await bcryptjs.hash(req.body.password, salt);
let user =await User.findOne({email: req.body.email});
if (user){
  return res.status(400).json({error : "Already..."})
}
     user = await User.create({
      name: req.body.name,
      email:req.body.email,
      password: mypass,
    });
    const data={
      user:{
        id: user.id
      }
    }
    const authtoken=jwt.sign(data, JSON_SECRET_KEY)
    res.json({authtoken:authtoken})
    then(user => res.json(user)).catch(err=>{
      res.json(
       { error: 'asdasdasd', message: err.message}
      )
    });
    }
)
router.post( '/login',[
  body('email','Enter Valid Email').isEmail(),
  body('password','Password cannot be empty').exists(),],
  async (req, res)=>{
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
    let {email, password}=req.body;
    try {
      let user =await User.findOne({email});
      if (!user){
        return res.status(400).json({error : "Invalid Username or passsword"})
      }
      const pwd=await bcryptjs.compare(password, user.password)
      if (!pwd){
        return res.status(400).json({error : "Invalid Username or passsword"})
      }
      const data={
        user:{
          id: user.id
        }
      }
           
      const authtoken=jwt.sign(data, JSON_SECRET_KEY)
      res.json({authtoken:authtoken})
    } catch (error) {
      console.log(error.message)
      res.status(500).send('Internal Server Error')
    }



      }
  )
  router.get(
  '/getuser', fetchUser, async (req,res)=>{
    try {
      const userid= req.user.id
      const user=await User.findById(userid).select('-password')
      res.send(user);
    } catch (error) {
      console.log(error.message)
      res.status(500).send('Internal Server Error')
    }
  }  
  )
module.exports=router;