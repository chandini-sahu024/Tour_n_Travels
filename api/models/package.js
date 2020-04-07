const mongoose = require('mongoose');

const packageSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    packageId: { type: Number, required: true },
    placeName: { type: String, required: true },
    noofAdults: { type: Number, required: true },
    noofChildren: { type: Number, required: true },
    description: { type: String, required: true },
    stayAmount: { type: Number, required: true },
    foodAmount: { type: Number, required: true },
    busAmount: { type: Number, required: true },
    trainAmount: { type: Number, required: true },
    airlinesAmount: { type: Number, required: true },
    noofDays: { type: Number, required: true },
    noofNights: { type: Number, required: true }



    
});

module.exports = mongoose.model('Package', packageSchema);