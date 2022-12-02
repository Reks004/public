const mongoose = (require('mongoose'));
const Schema = mongoose.Schema;

//Creating the database schema

const userSchema = new Schema({
    id: {

    },
    firstName:{
        type: String,
        required: true,
        trim: true
    },
    lastName:{
        type: String,
        required: true,
        trim: true
    },
    gender:{
        type: String,
        required: true,
    
    },

    date_of_birth: {
        type: Date,
        required: true
    }
    

}, {timestamps: true});

const User = mongoose.model('User', userSchema);

module.exports = User;