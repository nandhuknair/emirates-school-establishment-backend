const studentDetails = require("../controller/studentDetails")
const express = require('express')
const router = express.Router()

router.get('/studentDetails/:id', studentDetails);



module.exports = router