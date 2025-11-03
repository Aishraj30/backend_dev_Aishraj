const mongoose = require('mongoose')
const bcrypt = require('bcrypt');
const { required } = require('joi');

const userschema = new mongoose.Schema({

    fullname:{
        required:true,
        type:String,

    },
    
     email:{
        required:true,
        type:String,
        unique:true,
        lowercase: true,
        trim: true,
        
    },
  
    password:{
        type:String,
        required:true
    },


   
     role: {
      type: String,
      enum: ["candidate", "client","admin"],
      default: "client",
      required:true,
    },


},{
    timestamps:true,
}
)

userschema.pre('save' , async function (next ){
    let hashpass = await bcrypt.hash(this.password , 10);
    this.password = hashpass;
    (next)  
})

userschema.methods.comparepassword = async function(password) {
    let comparePass = await bcrypt.compare(password , this.password);
    return comparePass;
}




const usermodel = mongoose.model('users' , userschema);

module.exports = usermodel ;