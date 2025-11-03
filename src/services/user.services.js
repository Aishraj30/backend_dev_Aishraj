const joi = require('joi');

const userRepo = require('../repositories/implementation/mongouserRepo');
const MongoUserRepo = require('../repositories/implementation/mongouserRepo')
const jwt  = require('jsonwebtoken');
const AppError = require('../utils/error');
const { JWT_SECRET_KEY } = process.env;


const registerschema = joi.object({
    fullname:joi.string().min(2).required(),
    email:joi.string().email().required(),
    password:joi.string().min(6).required(),
    role:joi.string().valid('admin' , 'client' , 'candidate')
});

const loginschema = joi.object({
    email:joi.string().email().required(),
    password:joi.string().required()
})


class userService {

     constructor() {
    this.mainrepo = new MongoUserRepo; // store repository instance
  }

    //register service
    async register(userdata){
        const{error} = registerschema.validate(userdata)
         if(error){ throw new AppError ( error.message,400) }

     
// const cachekey = `user:email:${userdata.email}`
    const exist = await this.mainrepo.findByEmail(userdata.email);
    if(exist){ throw new AppError('email already exist' , 409)}



        const user = await this.mainrepo.create(userdata);
           
        const token = jwt.sign
        ({id : user._id , role :  user.role},
        JWT_SECRET_KEY,
        {   expiresIn:'1h'}
    )


  

        return {
            user:
            {id:user._id ,
            fullname : user.fullname ,
             email:user.email ,
              role: user.role,
            },
              token,
                };
                

      



    
        }
    //loginservice



    async login({email , password}){


        const {error} = loginschema.validate({email , password});
        if (error)  { throw  AppError ( error.message ,400 )} 

    

    const user = await this.mainrepo.findByEmail(email);
    if(!user) {  throw new AppError(401 , "user now found" ) }
     
    // const valid = await user 

    const matchpass = await user.comparepassword(password);
    if(!matchpass)throw new AppError("invalid credential" , 401)



    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET_KEY , { expiresIn: '1h' });
        console.log(user)
       
    
    return { user: { id: user._id, email: user.email, role: user.role, name: user.name }, token};

}

    //getuser

    async getuser(id){
        const user = await this.mainrepo.findById(id);
        if(!user)throw new AppError('user not found ' , 404);

 return {
    id:user._id,
    fullname:user.fullanme,
    role: user.role,
    email:user.email
 }

    }

    //update user 
    async updateuser(id , userdata){
        const error = userRepo.validate(userdata);
        if(error)throw new AppError(error.message , 400)

            const user = await userRepo.updateuser(id , userdata);
            if(!user) throw new AppError ('user not found' , 404 );

            return{
                id: user._id,
                email:user.email,
                role :  user.role,
                fullanme:  user.fullanme

            }


    }
}


module.exports = new userService(userRepo);







