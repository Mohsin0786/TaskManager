const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
firstName:{
    type:String,
},
lastName:{
    type:String,
},
googleId: String,
displayName: String,
email:{
    type:String,
    required:true,
    unique:true
},
password:{
    type:String,
    required:true
}
})

module.exports = mongoose.model('User', userSchema);

