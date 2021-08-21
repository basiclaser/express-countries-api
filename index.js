import express  from "express";
import {isString} from "./utilities.js"

const app = express();
const PORT = process.env.PORT || 8080;

const countries = [
    {id: 0, name: "Afghanistan", alpha2Code: "AF", alpha3Code:"AFG"},
    {id: 1, name: "Albania", alpha2Code: "AL", alpha3Code:"ALB"},
    {id: 2, name: "Algeria", alpha2Code: "DZ", alpha3Code:"DZA"},
    {id: 3, name: "American Samoa", alpha2Code: "AS", alpha3Code:"ASM"},
    {id: 4, name: "Andorra", alpha2Code: "AD", alpha3Code:"AND"},
    {id: 5, name: "Angola", alpha2Code: "AO", alpha3Code:"AGO"},
    {id: 6, name: "Anguilla", alpha2Code: "AI", alpha3Code:"AIA"},
    {id: 7, name: "Antarctica", alpha2Code: "AQ", alpha3Code:"ATA"},
    {id: 8, name: "Antigua and Barbuda", alpha2Code: "AG", alpha3Code:"ATG"},
    {id: 9, name: "Argentina", alpha2Code: "AR", alpha3Code:"ARG"},
    {id: 10, name: "Armenia", alpha2Code: "AM", alpha3Code:"ARM"},
    {id: 11, name: "Aruba", alpha2Code: "AW", alpha3Code:"ABW"},
    {id: 12, name: "Australia", alpha2Code: "AU", alpha3Code:"AUS"}
]

// PLEASE ANTICIPATE JSON BODIES
// MIDDLEWARE
app.use(express.json())
app
    .route("/api/countries")
    .get((req,res) => {
        res.json(countries)
    })
    .post((req,res) => {
        const newCountry = req.body;
        const {name, alpha2Code, alpha3Code} = newCountry;

        const condition1 = countries.find(c => c.alpha2Code === alpha2Code)
        const condition2 = countries.find(c => c.alpha3Code === alpha3Code)

        if(condition1 || condition2){
            res.status(400).json({message: "Country already exists"})
        } else {
            // validation
            if([name, alpha2Code, alpha3Code].every(isString)){
                countries.push({...newCountry, id: Math.floor(Math.random() * 10000)})
                res.json(countries)
            } else {
                res.status(400).json({message: "Field types were invalid"})
            }
        }
        
        res.json(countries)
    })
    
    app
        .route("/api/countries/:cc")
        .get((req,res) => {
            console.log(req.params)
            const {cc} = req.params;
            const condition1 = countries.find(c => c.alpha2Code === cc)
            const condition2 = countries.find(c => c.alpha3Code === cc)
            if(condition1 || condition2){
                res.json(condition1 || condition2)
            } else {
                res.status(404).json({message: "Country not found"})
            }
        })
        .put((req,res) => {
            console.log(req.params)
            const {cc} = req.params;
            const condition1 = countries.findIndex(c => c.alpha2Code === cc)
            const condition2 = countries.findIndex(c => c.alpha3Code === cc)
            if(condition1 > -1 || condition2 > -1){
                if([name, alpha2Code, alpha3Code].every(isString)){
                    const index = condition1 || condition2
                    countries[index] = {...countries[index], ...req.body}
                    res.json(countries[index])
                } else {
                    res.status(400).json({message: "Field types were invalid"})
                }
            } else {
                res.status(404).json({message: "Document does not exist"})
            }
        })
    

app.listen(PORT, () => {
    console.log("Server is running on port " + PORT)
})