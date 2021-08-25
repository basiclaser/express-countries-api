import Router from 'express';
import {
    getAll,
    createOne,
    getOneByCC,
    updateOneByCC,
    deleteOneByCC } from "../controllers/countries.js"
    
const countriesRouter = Router();
countriesRouter
    .route("/")
    .get(getAll)
    .post(createOne)

countriesRouter
    .route("/:cc")
    .get(getOneByCC)
    .put(updateOneByCC)
    .delete(deleteOneByCC)

export default countriesRouter;