import Country from "../models/country.js"

export async function getAll(request, response) {
    try {
        const result = await Country.find()
        response.json(result)
    } catch (error) {
        response.status(500).json({ message: error.message })
    }
}

export async function createOne(request, response) {
    try {
        const newCountry = await Country.create(request.body);
        response.json(newCountry);
    } catch (error) {
        response.status(400).json({message: error.message});
    }
}

export function getOneByCC(request, response) {

}
export function updateOneByCC(request, response) {

}
export function deleteOneByCC(request, response) {

}

