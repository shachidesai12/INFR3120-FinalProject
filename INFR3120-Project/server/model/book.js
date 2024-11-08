// MVC --> Model , View , Controller (Routers)
let mongoose = require('mongoose')
// create a model class
let bookModel = mongoose.Schema({
    name:String,
    Author:String,
    published:String,
    description:String,
    price:Number
},
{
    collection:"books"
}
)
module.exports = mongoose.model('Book',bookModel)