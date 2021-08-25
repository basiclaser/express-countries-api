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
    .get(getOneByCC)
    .put(updateOneByCC)
    .delete(deleteOneByCC)

export default countriesRouter;