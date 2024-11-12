var express = require('express');
var router = express.Router();
let Expense = require('../model/expense.js')
let expenseController = require('../controllers/expense.js')


/*Read Operation --> Get route for displaying the books list*/
router.get('/',async(req,res,next)=>{
    try{
        const ExpenseList = await Expense.find();
        res.render('Expense/list',{
            title:'Transactions',
            ExpenseList:ExpenseList
        })
    }
    catch(err){
        console.error(err)
        res.render('Expense/list',{
            error:'Error on Server'})
    }
})

/*Create Operation --> Get route for displaying add page*/
router.get('/add',async(req,res,next)=>{
    try{
        res.render('Expense/add',{
            title: 'Add Expense'});
    }
    catch(err){
        console.error(err)
        res.render('Expense/list',{
            error:'Error on Server'})
    }
});

/*Create Operation --> Post route for processing the Add Page*/
router.post('/add',async(req,res,next)=>{
    try{
        let newExpense = Expense({
            "Name":req.body.Name,
            "Amount":req.body.Amount,
            "Day":req.body.Day,
            "Month":req.body.Month,
            "Year":req.body.Year,
            "Category":req.body.Category

        });
        Expense.create(newExpense).then(()=>{
            res.redirect('/transactions') /*Once created route back to books*/
        })
    }
    catch(err){
        console.error(err)
        res.render('Expense/list',{
            error:'Error on Server'})
    }
});
/*Update Operation --> Get route for displaying edit page*/
router.get('/edit/:id',async(req,res,next)=>{
    try{
        const id = req.params.id;
        const expenseToEdit=await Expense.findById(id);
        res.render('Expense/edit',
            {
                title: 'Edit Expense',
                Expense:expenseToEdit
            }
        )
    }
    catch(err){
        console.error(err)
        next(err); //Keep passing the error
        res.render('Expense/list',{
            error:'Error on Server'})
    }
});
/*Update Operation --> Post route for processing the edit Page*/
router.post('/edit/:id',async(req,res,next)=>{
    try{
        let id=req.params.id;
        let updatedExpense = Expense({
            "_id":id,
            "Name":req.body.Name,
            "Amount:":req.body.Amount,
            "Day":req.body.Day,
            "Month":req.body.Month,
            "Year":req.body.Year,
            "Category":req.body.Category
        })
        Expense.findByIdAndUpdate(id,updatedExpense).then(()=>{
            res.redirect('/transactions')
        })

    }
    catch(err){
        console.error(err)
        res.render('Expense/list',{
            error:'Error on Server'})
    }

});
/*Delete Operation --> Ge route to perform lead opertion*/
router.get('/delete/:id',async(req,res,next)=>{
try{
    let id=req.params.id;
    Expense.deleteOne({_id:id}).then(()=>{
        res.redirect('/transactions')
    })
    
}
catch(err){
    console.error(err)
    res.render('Expense/list',{
        error:'Error on Server'})
}
});


module.exports = router;