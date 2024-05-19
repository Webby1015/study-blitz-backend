const mongoose = require('mongoose')

const notesSchema = mongoose.Schema({
    title:{
        type:String,
        required:[true,'please add a title']
    },
    URL:{
        type:String,
        required:[true,'please add a URL']
    },
},
{
    timestapms: true
})

module.exports = mongoose.model("notes",notesSchema) 