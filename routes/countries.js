import Router from 'express';
const countriesRouter = Router();
import {isString} from "../utilities.js"
import {
    getAll,
    createOne,
    getOneByCC,
    updateOneByCC,
    deleteOneByCC } from "../controllers/countries.js"

countriesRouter
    .route("/")
    .get(getAll)
    .post(createOne)

countriesRouter
    .route("/:cc")
    .get((request,response) => {
        console.log(request.params)
        const {cc} = request.params;
        const condition1 = countries.find(c => c.alpha2Code === cc)
        const condition2 = countries.find(c => c.alpha3Code === cc)
        if(condition1 || condition2){
            response.json(condition1 || condition2)
        } else {
            response.status(404).json({message: "Country not found"})
        }
    })
    .put((request,response) => {
        console.log(request.params)
        const {cc} = request.params;
        const condition1 = countries.findIndex(c => c.alpha2Code === cc)
        const condition2 = countries.findIndex(c => c.alpha3Code === cc)
        if(condition1 > -1 || condition2 > -1){
            if([name, alpha2Code, alpha3Code].every(isString)){
                const index = condition1 || condition2
                countries[index] = {...countries[index], ...request.body}
                response.json(countries[index])
            } else {
                response.status(400).json({message: "Field types were invalid"})
            }
        } else {
            response.status(404).json({message: "Document does not exist"})
        }
    })

export default countriesRouter;