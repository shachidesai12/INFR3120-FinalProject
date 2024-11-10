// MVC --> Model , View , Controller (Routers)
let mongoose = require('mongoose')
// create a model class
let bookModel = mongoose.Schema({
    Name:String,
    Amount:Number,
    Date:String,
},
{
    collection:"expenses"
}
)
module.exports = mongoose.model('Book',bookModel)