// MVC --> Model , View , Controller (Routers)
let mongoose = require('mongoose')
// create a model class
let bookModel = mongoose.Schema({
    Name:String,
    Amount:Number,
    Day:String,
    Month:String,
    Year:String,
    Category:String
},
{
    collection:"expenses"
}
)
module.exports = mongoose.model('Book',bookModel)