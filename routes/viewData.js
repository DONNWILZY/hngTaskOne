const express = require('express');
const router = express.Router();
const myDataModel = require('../model/data');
const dataController = require('../controllers/dataControllers')


///// save to db
router.post('/save', dataController.saveData);

//// view
router.get('/view/:id', dataController.viewById);

/////
router.get('/viewall', dataController.viewAllData);

/////
router.get('/query', dataController.queryData);

module.exports = router;
