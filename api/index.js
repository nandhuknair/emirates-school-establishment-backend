const express = require('express')
const router = require('../routes/index')
const connectDB  = require('../config/connectDB')
require('dotenv').config()
const app = express()


// app.use(cors({
//   origin: process.env.FRONTEND_URL,
//   methods: ["POST", "GET", "PUT", "DELETE"],
//   credentials: true,
//   allowedHeaders: ['Content-Type', 'Authorization'], 
// }));

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
