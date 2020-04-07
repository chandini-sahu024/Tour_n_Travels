const mongoose = require('mongoose');

const bookingSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    Place: { type: String, required: true },
    ModeOfTravelling: { type: String, required: true },
    TravellingDate: { type: Number, required: true },
    Persons: { type: String, required: true },
    TotalCost: { type: Number, required: true },
    StayCost: { type: Number, required: true },
    FoodCost: { type: Number, required: true },
    TravellingCost: { type: Number, required: true },
    TotalCost: { type: Number, required: true },
    Paid: { type: Number, required: true },
    Name: { type: Number, required: true },
    MobileNo: { type: Number, required: true },
    EmailId: { type: String, required: true }

});

module.exports = mongoose.model('Booking', bookingSchema);