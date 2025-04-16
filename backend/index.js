const express = require('express')
const bodyParser = require('body-parser')
var mongodb = require('mongodb').MongoClient
const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
const mailer = require('./utils/mailconfig/mailer')
const cors = require("cors");
// var dbconstr = require('./utils/config')

app.use(cors());
let loginroute = require('./routes/login_routes')


app.get('/healthcheck', async (req, res) => {
    console.log('welcome');
    mailer.sendEmail()
    res.send({ test: 'welcome' })
})

app.use('/app', loginroute)

const port = "8000"

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
})