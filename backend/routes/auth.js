const express = require('express')
const User = require('../models/User')
const router = express.Router()
const { body, validationResult } = require('express-validator');

//Create a User using: POST "/api/authcreateuser". No login required
router.post('/createuser',[
    body('name',"Enter a valid name").isLength({ min: 3 }),
    body('email','Enter a valid email').isEmail(),
    body('password',"Password needs to be at least 5 characters").isLength({ min: 5 }),
    
], async (req,res) =>{
        //If there are errors, return bad request and errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        try {
                //Check whether the user with this email already exist
                let user = await User.findOne({email: req.body.email});
                if(user){
                  return res.status(400).json({error:"Sorry a user with this email already exists"})
                }
                user = await User.create({
                name: req.body.name,
                password: req.body.password,
                email: req.body.email
                
              })
              res.json(user)

        } catch (error) {
          console.error(error.message)
          res.status(500).send('Some error')
        }
        
     
})

module.exports = router