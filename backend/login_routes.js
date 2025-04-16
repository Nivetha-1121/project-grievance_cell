const express = require('express')
const bodyParser = require('body-parser')
const router = express.Router()
var mongodb = require('mongodb').MongoClient
const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

var loginservice = require('../services/login_services')

router.get('/databasehealth', (req, res, err) => {
    try {
        loginservice.dbHealthCheck(req, res, err)
    } catch (error) {
        console.log(error);
    }
}) 

router.get('/getdata', (req, res, err) => {
    try {
        loginservice.getData(req, res, err)
    } catch (error) {
        console.log(error);
    }
})

router.post('/getLoginData', (req, res, err) => {
    try {
        loginservice.getLoginData(req, res, err)
    } catch (error) {
        console.log(error);
    }
})

router.post('/grievancestatus', (req, res, err) => {
    try {
        loginservice.getGrievanceStatus(req, res, err)
    } catch (error) {
        console.log(error);
    }
}) 

router.post('/adddata', (req, res, err) => {
    try {
        loginservice.addData(req, res, err)
    } catch (error) {
        console.log(error);
    }
})  

router.post('/submitComplaints', (req, res, err) => {
    try {
        loginservice.submitData(req, res, err)
    } catch (error) {
        console.log(error);
    }
}) 



module.exports = router




