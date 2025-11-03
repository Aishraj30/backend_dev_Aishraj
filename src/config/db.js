const mongoose = require('mongoose');

const connectMongoDB = async () => {
    try {
         
        const URL = process.env.MONGO_URI;

         const res = await mongoose.connect(URL);
       

       if(res){ console.log("MongoDB connected successfully");}
    } catch (error) {
        console.log("error connecting to MongoDB:", error.message);
        process.exit(1); 
    }
};

module.exports = connectMongoDB;


