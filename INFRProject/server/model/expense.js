// MVC --> Model , View , Controller (Routers)
let mongoose = require('mongoose')
// create a model class
let expenseModel = mongoose.Schema({
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
<<<<<<< Updated upstream:INFRProject/server/model/book.js
module.exports = mongoose.model('Book',bookModel)
=======
module.exports = mongoose.model('Expense',expenseModel)
>>>>>>> Stashed changes:INFRProject/server/model/expense.js
