const mongoose = require('mongoose')

const commentsSchema = mongoose.Schema({
    ref_id:{
        type:String,
        required:[true,'please add a ref_id']
    },
    text:{
        type:String,
        required:[true,'please add a text']
    },
},
{
    timestapms: true
})

module.exports = mongoose.model("comments",commentsSchema) 