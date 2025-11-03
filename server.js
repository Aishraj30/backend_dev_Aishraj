const express = require('express')
require('dotenv').config();
const {createclient} = require('redis')
const useroutes = require('./src/routes/user.routes')
const connectMongoDB  = require('../backend/src/config/db')
const redisInstance = require('./src/config/redis')
const errorHandler = require('./src/middleware/errorHandler');
const cookieParser = require('cookie-parser');
const logger = require('./src/utils/logger');

const app = express() // call express too intiate
app.use(express.json()); // 
app.use(cookieParser()); 








const connectDB = async(req ,res)=>{
  
  connectMongoDB();
  await redisInstance.connectRedis();

  logger.info("Both DB connnected ")

}

connectDB();



app.get('/',  (req,res)=>{
    res.send("hello")
})

app.use('/api/user' , useroutes )
app.use(errorHandler);

 
 PORT = process.env.PORT
app.listen( PORT  , ()=>{
    logger.info(`Server is running on http://localhost:${PORT}`)
});
