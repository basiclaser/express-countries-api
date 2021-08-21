import dotenv from 'dotenv'
dotenv.config()

import express  from "express";
import cors from 'cors'
import countriesRouter from "./routes/countries.js";
import connectToDatabase from "./models/index.js"

const app = express();
const PORT = process.env.PORT || 8080

// PLEASE ANTICIPATE JSON BODIES
// MIDDLEWARE
app.use(express.json())

app.use(cors());

// app.get("/", (req, res) => { res.sendFile(process.cwd() + "/index.html") })

app.use("/api/countries", countriesRouter)

connectToDatabase().then((err) => {
    if(err) {
        return console.log(err)
    }
    app.listen(PORT, () => {
        console.log("Server is running on port " + PORT)
    })
})
