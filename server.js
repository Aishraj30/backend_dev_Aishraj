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



app.get('/', (req, res) => {
  // simple inline HTML
  res.send(`
   <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Backend API Documentation</title>
  <style>
    body {
      font-family: "Poppins", sans-serif;
      background-color: #0d1117;
      color: #e6edf3;
      margin: 0;
      padding: 30px;
      line-height: 1.6;
    }
    h1, h2 {
      color: #58a6ff;
    }
    h1 {
      text-align: center;
      border-bottom: 2px solid #30363d;
      padding-bottom: 10px;
      font-size: 70px;
    }
    ul {
      background: #161b22;
      padding: 20px;
      border-radius: 10px;
      list-style: none;
    }
    li {
      margin: 10px 0;
      padding-left: 15px;
      border-left: 4px solid #58a6ff;
      font-size: 50px;
    }
    code {
      background-color: #30363d;
      padding: 2px 6px;
      border-radius: 4px;
      color: #ff7b72;
    }
    .footer {
      text-align: center;
      margin-top: 40px;
      font-size: 40px;
      color: #8b949e;
    }
  </style>
</head>
<body>
  <h1>🛠️ Backend Users Module API</h1>

  <h2>📘 Project Overview</h2>
  <ul>
    <li>Register users with <strong>role-based access</strong> — <code>Admin</code>, <code>Candidate</code>, and <code>Client</code>.</li>
    <li>Authenticate users securely using <strong>JWT Tokens</strong>.</li>
    <li>Retrieve and update user details through RESTful APIs.</li>
    <li>Store passwords securely using <strong>bcrypt hashing</strong>.</li>
    <li>Validate and sanitize inputs using <strong>Joi validation</strong>.</li>
    <li>Integrate <strong>Redis caching</strong> for faster user data retrieval.</li>
    <li>Maintain clean error handling with <strong>AppError utility</strong>.</li>
    <li>Followed <strong>MVC + Repository pattern</strong> for scalability and maintainability.</li>
  </ul>

  <div class="footer">
    <p>© 2025 Backend Authentication Service | Built with ❤️ using Node.js, Express, and MongoDB</p>
  </div>
</body>
</html>

  `);
});

app.use('/api/user' , useroutes )
app.use(errorHandler);

 
 PORT = process.env.PORT
app.listen( PORT  , ()=>{
    logger.info(`Server is running on http://localhost:${PORT}`)
    console.log(`Server is running on http://localhost:${PORT}`)
});
