const express = require('express')
const cors = require('cors')
const {connect} = require('mongoose')
require('dotenv').config()

const app = express()
app.use(express.json({extended: true}))
app.use(express.urlencoded({extended: true}))
app.use(cors({
    credentials: true,
    origin: (origin, callback) => {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin || origin === "http://localhost:3000") {
            callback(null, origin);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
}))

connect(process.env.MONGO_URI).then(app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`))).catch(error => {console.log(error)})