const { json } = require("express")
const usermodel = require("../models/user.model")
const userService = require("../services/user.services")

// const registercontroller  = async (req , res) =>{
//     try {
        

// let {fullname , username , phonenumber , email , password } = req.body 

// if ( !fullname || !username || !phonenumber || !email || !password) {
//     return res.status(400).json({
//         message:'all fields are required'
//     })
// }

// let extinguser = await usermodel.findOne({email})

// if(extinguser) {
//     return res.status(404).json({
//         message:"user already exist"
//     })
// }

// const newuser = await usermodel.create({
//     fullname,
//     username,
//     phonenumber,
//     email,
//     password

// })

// console.log(newuser)

// return res.status(200).json({
//     message:" user registered ",
//     users : newuser
// })
// }

        
//      catch (error) {
//         console.log("error in registration" , error)
        
//     }


// }

class usercontroller {

  
    async register (req , res , next) {
        try {

            const userdata = req.body;
            const result = await userService.register(userdata);


     
            res.status(201).json({succes : true , data:result})


            
        } catch (error) {
            next(error)
            
        }
    }

    async login (req , res,next){
        try {
             const {user , token} = await userService.login(req.body);


    res.cookie('token', token, {
    
      secure: process.env.NODE_ENV === 'production',
      
 
    });



             res.status(200).json({
      success: true,
      message: 'Login successful',
      user,
    });

            
        } catch (error) {
            next(error)
            console.log("controller ++++",error)
            
        }
    }



    async getuser (req , res , next){
        try {

            const{id} = req.params;
            const userdata = req.body;
            const user  = await userService.getuser(id);
               res.status(200).json({ success: true, data: user });

            
        } catch (error) {
            next(error)
            
        }
    }


     async updateUser(req, res, next) {
    try {
      const { id } = req.params;
      const userData = req.body;
      const user = await this.userService.updateUser(id, userData);
      res.status(200).json({ success: true, data: user });
    } catch (error) {
      next(error);
    }
  }

}




module.exports =     new usercontroller();




