const express = require('express')
const bodyParser = require('body-parser')
var mongodb = require('mongodb').MongoClient
const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const mailer = require('../utils/mailconfig/mailer')
const dbconfig = require('../utils/dbconfig/config')

exports.dbHealthCheck = (req, res, err) => {
    try {
        mongodb
            .connect(dbconfig.sampleutl)
            .then(() => {
                console.log("Connected to the database!");
                res.send({ message: "Connected to the database!" });
            })
            .catch(err => {
                console.log("Cannot connect to the database!", err);
                res.send({ message: "Cannot connect to the database!" });
                process.exit();
            });

    } catch (error) {
        console.log(error);
    }
}


exports.getData = (req, res, err) => {
    try {
        mongodb.connect(dbconfig.sampleutl).then((client) => {
            const connect = client.db("reactjs")
            const connection = connect.collection("NPRCET")
            connection
                .find()
                // .limit(10)
                .toArray()
                .then((result) => {
                    res.send(result);
                })
        })
    } catch (error) {
        console.log(error);
    }
}

exports.getLoginData = (req, res, err) => {
    try {
        console.log('username', req.body.user_name, 'password', req.body.password);
        mongodb.connect(dbconfig.sampleutl).then(async (client) => {
            const connect = client.db("login")
            const connection = connect.collection("student_login")
            let value = await connection.findOne({ name: req.body.user_name, password: parseInt(req.body.password) })
            console.log('value', value);
            if (value) {
                res.send({ exists: true })
            } else {
                res.send({ exists: false })
            }


        })
    } catch (error) {
        console.log(error);
    }
}

exports.getGrievanceStatus = (req, res, err) => {
    try {
        console.log(req.body);

        mongodb.connect(dbconfig.sampleutl).then(async (client) => {
            const connect = client.db("reactjs")
            const connection = connect.collection("NPRCET")
            let value = await connection.findOne({ regNumber: req.body.password })
            console.log('value', value);
            if (value?.status === 'P') {
                res.send({ status: "Pending", sucess: true })
            } else if (value?.status === 'X') {
                res.send({ status: "Processing", sucess: true })
            }
            else if (value?.status === 'S') {
                res.send({ status: "Processed", sucess: true })
            }
            else if (value?.status === 'D') {
                res.send({ status: "Declined", sucess: true })
            }
            else {
                res.send({ status: "Complaint not found", sucess: false })
            }


        })
    } catch (error) {
        console.log(error);
    }
}

exports.addData = (req, res, err) => {
    try {
        console.log('req --.', req.body);
        mongodb.connect(dbconfig.sampleutl).then((client) => {
            const connect = client.db("reactjs")
            const connection = connect.collection("NPRCET")
            const newData = req.body;
            connection.insertOne(newData)
                .then((result) => {
                    mailer.sendEmail(newData)
                    res.status(201).send({ message: "Record added successfully", data: result });
                })
                .catch((err) => {
                    res.status(500).send({ message: "Error inserting record", error: err });
                });
        })
    } catch (error) {
        console.log(error);
    }
}

exports.getData = (req, res, err) => {
    try {
        // console.log('username',req.body);
        mongodb.connect(dbconfig.sampleutl).then(async (client) => {
            const connect = client.db("reactjs")
            const connection = connect.collection("NPRCET")
            connection
                .find()
                // .limit(10)
                .toArray()
                .then((result) => {
                    res.send(result);
                })
            // let value = await connection.findOne({ name: req.body.user_name, password: req.body.password })
            // console.log('value', value);
            // if (value) {
            // res.send({ exists: true })
            // } else {
            // res.send({ exists: false })
            // }
        })
    } catch (error) {
        console.log(error);
    }
}

exports.submitData = (req, res, err) => {
    try {
        // console.log('username',req.body);
        mongodb.connect(dbconfig.sampleutl).then(async (client) => {
            const connect = client.db("reactjs")
            const connection = connect.collection("NPRCET")
            const complaints = req.body.complaints;

            for (const complaint of complaints) {
                const { regNumber, category, status } = complaint;

                await connection.updateOne(
                    { regNumber, category },
                    { $set: complaint },
                    { upsert: true }
                );
            }

            res.status(200).json({ message: "Complaints submitted successfully" });


        })
    } catch (error) {
        console.log(error);
    }
}