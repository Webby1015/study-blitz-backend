const mongoose = require('mongoose')

const discussionsSchema = mongoose.Schema({
    owner_id:{
        type:String,
        required:[true,'please add a owner_id']
    },
    title:{
        type:String,
        required:[true,'please add a title']
    },
    content:{
        type:String,
        required:[true,'please add a content']
    },
},
{
    timestapms: true
})

module.exports = mongoose.model("discussions",discussionsSchema) 