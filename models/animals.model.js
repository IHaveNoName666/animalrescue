const { Schema, model, SchemaTypes} = require("mongoose")

const AnimalSchema = new Schema({
    name: SchemaTypes.String,
    species: SchemaTypes.String,
    breed: SchemaTypes.String,
    age: SchemaTypes.Number,
    gender: SchemaTypes.String,
    color: SchemaTypes.Array,

})

module.exports = model("Animal", AnimalSchema)