const express = require('express')
const User = require('../models/User')
const router = express.Router()
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
var takeuserdata = require('../middleware/takeuserdata');

const JWT_SECRET = "ASECRETSTRING"

//Route 1:Create a User using: POST "/api/auth/createuser". No login required.
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
                
                const salt= await bcrypt.genSalt(10);
                const secPass = await bcrypt.hash(req.body.password,salt);

                //create a new user
                user = await User.create({
                name: req.body.name,
                password: secPass,
                email: req.body.email
                
              });
              const data ={
                user:{
                  id:user.id
                }
              }

              const authtoken = jwt.sign(data, JWT_SECRET);

              res.json({authtoken})

        } catch (error) {
          console.error(error.message)
          res.status(500).send('Internal Server error')
        }
        
     
})

//Route 2:Authenticate a User using: POST "/api/auth/login". No login required.
router.post('/login',[
  body('email','Enter a valid email').isEmail(),
  body('password','Password cannot be blank').exists()
  
], async (req,res) =>{
      //If there are errors, return bad request and errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const {email,password}= req.body;
      try {
            let user = await User.findOne({email});
            if (!user){
              return res.status(400).json({error:"Please try to login with correct information"})
            }
            
            const passwordcompare = await bcrypt.compare (password, user.password)
            if (!passwordcompare){
              return res.status(400).json({error:"Please try to login with correct information"})
            }

            const data ={
              user:{
                id:user.id
              }
            }

            const authtoken = jwt.sign(data, JWT_SECRET);

            res.json({authtoken})
 

      } catch (error) {
            console.error(error.message)
            res.status(500).send('Internal Server error')
      }


})

// ROUTE 3: Get loggedin User Details using: POST "/api/auth/getuser". Login required
router.post('/getuser', takeuserdata,  async (req, res) => {

  try {
    userId = req.user.id;
    const user = await User.findById(userId).select("-password")
    res.send(user)
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
})
module.exports = router