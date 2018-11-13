const mongoose= require('mongoose');
const orgSchema= mongoose.Schema({
    name: String,
    country: String,
    employees: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee'
    }]
})

module.exports= mongoose.model('Organisation', orgSchema);