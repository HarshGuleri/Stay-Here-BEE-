const mongoose = require('mongoose');

const roomSchema = mongoose.Schema({

    
    image : {
        type: String,
        required: true
    },
    title :{
        type: String,
        required: true
    },
    description :{
        type: String,
        required: true
    },
    price :{
        type: String,
        required: true
    },
    roomType :{
        type: String,
        required: true
    },
    size :{
        type: String,
        required: true
    },
    bed :{
        type: String,
        required: true
    },
    bathroom :{
        type: String,
        required: true
    },
    view :{
        type: String,
        required: true
    },
    connectivity :{
        type: String,
        required: true
    },
    entertainment :{
        type: String,
        required: true
    },
    amenities :{
        type: String,
        required: true
    },
    services :{
        type: String,
        required: true
    },

} ,{
    timestamps : true,
})

// const roomModel = mongoose.model('rooms', roomSchema)

// module.exports = roomModel;

module.exports = mongoose.model("rooms", roomSchema);