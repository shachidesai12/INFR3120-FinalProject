var express = require('express');
var router = express.Router();
let Book = require('../model/book')
let bookController = require('../controllers/book.js')


/*Read Operation --> Get route for displaying the books list*/
router.get('/',async(req,res,next)=>{
    try{
        const BookList = await Book.find();
        res.render('Book/list',{
            title:'Books',
            BookList:BookList
        })
    }
    catch(err){
        console.error(err)
        res.render('Book/list',{
            error:'Error on Server'})
    }
})

/*Create Operation --> Get route for displaying add page*/
router.get('/add',async(req,res,next)=>{
    try{
        res.render('Book/add',{
            title: 'Add Book'});
    }
    catch(err){
        console.error(err)
        res.render('Book/list',{
            error:'Error on Server'})
    }
});

/*Create Operation --> Post route for processing the Add Page*/
router.post('/add',async(req,res,next)=>{
    try{
        let newBook = Book({
            "name":req.body.name,
            "Author":req.body.Author,
            "published":req.body.published,
            "description":req.body.description,
            "price":req.body.price
        });
        Book.create(newBook).then(()=>{
            res.redirect('/bookslist') /*Once created route back to books*/
        })
    }
    catch(err){
        console.error(err)
        res.render('Book/list',{
            error:'Error on Server'})
    }
});
/*Update Operation --> Get route for displaying edit page*/
router.get('/edit/:id',async(req,res,next)=>{
    try{
        const id = req.params.id;
        const bookToEdit=await Book.findById(id);
        res.render('Book/edit',
            {
                title: 'Edit Book',
                Book:bookToEdit
            }
        )
    }
    catch(err){
        console.error(err)
        next(err); //Keep passing the error
        res.render('Book/list',{
            error:'Error on Server'})
    }
});
/*Update Operation --> Post route for processing the edit Page*/
router.post('/edit/:id',async(req,res,next)=>{
    try{
        let id=req.params.id;
        let updatedBook = Book({
            "_id":id,
            "name":req.body.name,
            "Author:":req.body.Author,
            "published":req.body.published,
            "description":req.body.description,
            "price":req.body.price
        })
        Book.findByIdAndUpdate(id,updatedBook).then(()=>{
            res.redirect('/bookslist')
        })

    }
    catch(err){
        console.error(err)
        res.render('Book/list',{
            error:'Error on Server'})
    }

});
/*Delete Operation --> Ge route to perform lead opertion*/
router.get('/delete/:id',async(req,res,next)=>{
try{
    let id=req.params.id;
    Book.deleteOne({_id:id}).then(()=>{
        res.redirect('/bookslist')
    })
    
}
catch(err){
    console.error(err)
    res.render('Book/list',{
        error:'Error on Server'})
}
});


module.exports = router;