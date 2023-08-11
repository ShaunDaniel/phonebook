const mongoose = require("mongoose")
const dotenv = require("dotenv")
dotenv.config()
const url = process.env.MONGO_URI


mongoose.connect(url).catch((err)=>{
    console.log(err)
})

const PersonSchema = mongoose.Schema({
    name: {
        type:String,
        minLength:3,
        required:true
    },
    number:{
        type: Number,
        required:true
    }
})

PersonSchema.set("toJSON", { 
    transform: (document,object_returned)=>{
        object_returned.id = object_returned._id.toString()
        delete object_returned._id
        delete object_returned.__v
    }
})

const Person = mongoose.model("Person",PersonSchema)

module.exports = Person


