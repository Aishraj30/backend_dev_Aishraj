const { json } = require("express")
const usermodel = require("../models/user.model")
const userService = require("../services/user.services");
const AppError = require("../utils/error");



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



}


  async function updateUser(req, res) {
  try {
    const { id } = req.params;
    const updateData = req.body;

 
    if (!req.user || req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: "Access denied: Only admin can update users"
      });
    }

 
    const updatedUser = await User.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true
    });

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: updatedUser
    });

  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({
      success: false,
      message: "Error updating user",
      error: error.message
    });
  }
} 



module.exports = new usercontroller()




