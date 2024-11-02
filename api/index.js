const express = require('express')
const router = require('../routes/index')
const connectDB  = require('../config/connectDB')
require('dotenv').config()
const app = express()


const cors = require('cors');
app.use(cors({
  origin: ['https://your-netlify-url.com', 'https://your-vercel-url.com'],
  methods: ['GET', 'POST'],
}));

// app.use(express.json())
// app.use(cookiesParser())

const PORT = process.env.PORT || 8080

app.get('/',(req,res)=> {
    res.json({
        message:"Server running at " + PORT
    })  
})

app.use('/api',router)

connectDB().then(()=>{
    app.listen(PORT,()=> {
        console.log(`Server running at the port ${PORT}`)
    })
})
