const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name :{
        type : String,
        required: [true, "Please add name"]
    },
    collage :{
        type : String,
        required: [true, "Please add collage"]
    },
    course :{
        type : String,
        required: [true, "Please add course"]
    },
    major :{
        type : String,
        required: [true, "Please add major"]
    },
    year :{
        type : Number,
        required: [true, "Please add year"]
    },
    email :{
        type : String,
        required: [true, "Please Fill of fields"],
        unique:[true, "Email Address already taken"]
    },
    password :{
        type : String,
        required: [true, "Please add password"]
    },
    
},
{
    timestapms: true
})

module.exports = mongoose.model("user",userSchema) 