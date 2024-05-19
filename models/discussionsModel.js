const mongoose = require('mongoose')

const discussionsSchema = mongoose.Schema({
    owner_id:{
        type:String,
        required:[true,'please add a title']
    },
    title:{
        type:String,
        required:[true,'please add a URL']
    },
    content:{
        type:String,
        required:[true,'please add a URL']
    },
},
{
    timestapms: true
})

module.exports = mongoose.model("discussions",discussionsSchema) 