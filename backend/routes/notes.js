const express= require('express')
const User=require('../models/User')
const Notes=require('../models/Notes')

const fetchUser=require('../middleware/fetchuser')

const { body, validationResult } = require('express-validator')
// const jwt = require('jsonwebtoken')
// const JSON_SECRET_KEY="Hell0Peter"
const router=express.Router();
router.get(
    '/allnotes', fetchUser, async (req,res)=>{
      try {
        const user_id= req.user.id
        const notes=await Notes.find({userid : user_id})

        res.json(notes);
      } catch (error) {
        console.log(error.message)
        res.status(500).send('Internal Server Error')
      }
    }  
    )
    router.post( '/createnote', fetchUser,[
        body('title',).isLength({min: 5}),
        body('description').isLength({ min: 5 }),
        
        ]
        ,async (req, res)=>{
           try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
              return res.status(400).json({ errors: errors.array() });
            }
            const {title, description, tag}=req.body
            let notes = await Notes.create({
                title,description,tag,userid: req.user.id,
           });
           let n=await notes.save()
         res.send(n)
            then(user => res.json(user)).catch(err=>{
              res.json(
               { error: err.message, message: err.message}
              )
            });
           } catch (error) {
            console.log(error.message)
            res.status(500).send('Internal Server Error')
           } 
            }
        )
  module.exports=router;