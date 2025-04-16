const express = require('express')
const bodyParser = require('body-parser')
var mongodb = require('mongodb').MongoClient
const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

var globurl = "mongodb+srv://um1305:11307142001@learning.h7kligz.mongodb.net/";
var sampleurl = "mongodb://localhost:27017/";

module.exports = {
    mainurl: globurl,
    sampleutl: sampleurl
}