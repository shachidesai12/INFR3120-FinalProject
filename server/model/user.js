let mongoose = require('mongoose');
const { transformAuthInfo } = require('passport');
let passportLocalMongoose = require('passport-local-mongoose');
const { collection } = require('./expense');
let user=mongoose.Schema({
    username:
    {
        type:String,
        default:"",
        trim:true,
    },
    /*password:
    {
        type:String,
        default:"",
        trim:true,
        required: 'password'
    },*/
    displayName:
    {
        type:String,
        default:"",
        trim:true,
    },
    email:
    {
        type:String,
        default:"",
        trim:true,
    },
    
    googleId: {
        type: String, // Store Google account ID
        default:"",
        trim:true,
        default: null
    },

    created:{
        type:Date,
        default:Date.now
    },
    update:{
        type:Date,
        default:Date.now
    }
},
{
    collection:"user"
}
)


//configure options for user model
let options=({MissingPasswordError: "Wrong/missing password"})
user.plugin(passportLocalMongoose,options);
module.exports.user = mongoose.model('user',user);
