const express = require('express');
const router = express.Router();






router.get('/', (req, res)=>{
    res.send('VIEW ROUTE')
})



module.exports = router;