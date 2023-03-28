require("dotenv").config()

const express = require("express") //<-- common js

// import express from "express" <-- ex & import¨

const cors = require ("cors")

const app = express()
const animals = require("./routes/animals.routes")

//serve docs
app.use("/", express.static("docs") )


// accept requests from anywhere
app.use(cors())


// expect incoming data to be json
app.use(express.json())

app.use("/api/v1", animals)



    app.listen(4000, () => {
        console.log("Listening for requests on port 4000")
    })
// import db-connection
    require ("./database")
