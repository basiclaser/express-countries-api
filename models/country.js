import mongoose from "mongoose";

// OBJECT RELATIONAL MAPPING
const CountrySchema = new mongoose.Schema(
    {
        name:  {required: true, type: String},
        alpha2Code: {index: true, required:true, type:String, unique: true},
        alpha3Code: {index: true, required:true, type:String, unique: true},
    },
    { timestamps: true }
);

const Country = mongoose.model("Country", CountrySchema);
export default Country;
