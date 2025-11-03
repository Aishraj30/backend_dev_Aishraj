const express = require('express')
require('dotenv').config();
const {createclient} = require('redis')
const useroutes = require('./src/routes/user.routes')
const connectMongoDB  = require('./src/config/db')
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


// ...existing code...
app.get('/', (req, res) => {
  // responsive HTML
  res.send(`
   <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Backend API Documentation</title>
  <style>
    :root{
      --bg:#0d1117;
      --card:#0f1720;
      --muted:#8b949e;
      --accent:#58a6ff;
      --text:#e6edf3;
      --pad:1.25rem;
      --radius:12px;
    }

    *{box-sizing:border-box;margin:0;padding:0}
    body{
      font-family: Inter, Poppins, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial;
      background:var(--bg);
      color:var(--text);
      line-height:1.5;
      -webkit-font-smoothing:antialiased;
      -moz-osx-font-smoothing:grayscale;
      padding:clamp(16px,4vw,32px);
      display:flex;
      align-items:center;
      justify-content:center;
      min-height:100vh;
    }

    .wrap{
      width:100%;
      max-width:1100px;
      background:linear-gradient(180deg, rgba(255,255,255,0.02), transparent);
      border:1px solid rgba(255,255,255,0.04);
      padding:clamp(20px,3.5vw,40px);
      border-radius:var(--radius);
      box-shadow:0 6px 30px rgba(2,6,23,0.6);
    }

    header{
      display:flex;
      align-items:center;
      gap:16px;
      margin-bottom:clamp(18px,3vw,28px);
      flex-wrap:wrap;
    }

    .logo{
      width:64px;
      height:64px;
      border-radius:10px;
      background:linear-gradient(135deg,var(--accent),#7dd3fc44);
      display:flex;
      align-items:center;
      justify-content:center;
      font-size:28px;
      font-weight:700;
      color:#021022;
      box-shadow:0 4px 18px rgba(0,0,0,0.5);
    }

    h1{
      color:var(--accent);
      font-size:clamp(24px,5.5vw,48px);
      line-height:1.05;
      margin:0;
    }

    .meta{
      color:var(--muted);
      font-size:clamp(13px,2.4vw,18px);
      margin-top:6px;
    }

    .content{
      display:grid;
      grid-template-columns:1fr;
      gap:18px;
      margin-top:16px;
    }

    .card{
      background:var(--card);
      padding:16px;
      border-radius:10px;
      border:1px solid rgba(255,255,255,0.03);
    }

    ul.features{
      list-style:none;
      display:grid;
      grid-template-columns:repeat(2, minmax(0,1fr));
      gap:12px;
    }

    .features li{
      padding:12px;
      border-radius:8px;
      background:linear-gradient(90deg, rgba(88,166,255,0.04), transparent);
      display:flex;
      align-items:flex-start;
      gap:12px;
      font-size:clamp(14px,2.6vw,20px);
      color:var(--text);
    }

    .features li::before{
      content:"•";
      color:var(--accent);
      font-weight:700;
      margin-top:2px;
      font-size:18px;
      line-height:1;
    }

    code{
      background:rgba(255,255,255,0.04);
      padding:4px 8px;
      border-radius:6px;
      color:#ffb4b4;
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, "Roboto Mono", monospace;
      font-size:0.95rem;
    }

    .footer{
      text-align:center;
      margin-top:18px;
      font-size:clamp(12px,2vw,16px);
      color:var(--muted);
    }

    /* responsive adjustments */
    @media (max-width:800px){
      .features{
        grid-template-columns:1fr;
      }
      .logo{width:56px;height:56px;font-size:24px}
    }

    @media (max-width:420px){
      .wrap{padding:16px}
      h1{font-size:clamp(20px,8vw,32px)}
      .features li{font-size:16px;padding:10px}
      .logo{width:48px;height:48px}
    }

  </style>
</head>
<body>
  <div class="wrap" role="main">
    <header>
      <div class="logo">API</div>
      <div>
        <h1>Backend Users Module</h1>
        <div class="meta">Secure authentication · role-based access · Redis caching · MongoDB</div>
      </div>
    </header>

    <section class="content">
      <div class="card">
        <h2 style="color:var(--accent);margin-bottom:10px;font-size:1.25rem">Overview</h2>
        <ul class="features" aria-label="Project features">
          <li>Register users with <code>Admin</code>, <code>Candidate</code>, <code>Client</code> roles.</li>
          <li>Authenticate users securely using <strong>JWT</strong> tokens.</li>
          <li>Retrieve and update user details via RESTful APIs.</li>
          <li>Store passwords securely with <strong>bcrypt</strong>.</li>
          <li>Validate inputs using <strong>Joi</strong>.</li>
          <li>Use <strong>Redis</strong> for faster user retrieval.</li>
          <li>Centralized error handling with <strong>AppError</strong>.</li>
          <li>MVC + Repository pattern for maintainability.</li>
        </ul>
      </div>

      <div class="card">
        <h2 style="color:var(--accent);margin-bottom:10px;font-size:1.25rem">Quick Links</h2>
        <p style="color:var(--muted);margin-bottom:12px">API base: <code>/api/user</code></p>
        <p style="color:var(--muted);margin-bottom:6px">Try:</p>
        <ul style="list-style:none;padding-left:0;color:var(--text);line-height:1.6">
          <li><code>POST /api/user/register</code> — create user</li>
          <li><code>POST /api/user/login</code> — login</li>
          <li><code>GET /api/user/:id</code> — get user (auth)</li>
          <li><code>PUT /api/user/:id</code> — update user (auth/role)</li>
        </ul>
      </div>
    </section>

    <div class="footer">
      © 2025 Backend Authentication Service — Built with Node.js, Express & MongoDB
    </div>
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
