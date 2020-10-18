const express=require('express');
const morgan=require('morgan');
const mongoose=require('mongoose');
const Blog=require('./models/blog');
const { result } = require('lodash');
const port=3000;
const app=express();

const dbURI="mongodb+srv://avinash9829:avinashjee@blog.mybv2.mongodb.net/node_proj?retryWrites=true&w=majority"
//mongodb+srv://avinash9829:<password>@blog.mybv2.mongodb.net/<dbname>?retryWrites=true&w=majority
mongoose.connect(dbURI,{useNewUrlParser:true,useUnifiedTopology:true})
        .then(result=> app.listen(port,()=>{
            console.log(`listening to the port: ${port}`);
        }))
        .catch(err=>console.log(err));



//setting view engine

app.set('view engine','ejs');

//middleware and static files
// this is used to create seperate style.css file so we can add all the style.css there !

app.use(express.static('public'));
app.use(express.static('images'));
app.use(express.urlencoded({extended:true}));

//using morgan dev middle ware
app.use(morgan('dev'));

app.use((req,res,next) =>{
    res.locals.path=req.path;
    next();
});





// manage requests

app.get('/',(req,res)=>{
    res.redirect('/blogs');
});

app.get('/about',(req,res)=>{
    res.render('about',{title:'About Us'});
});

app.get('/blogs/create',(req,res)=>{
    res.render('create',{title:'New Blog'});
});

// get request for blog
app.get('/blogs',(req,res)=>{
    Blog.find().sort({createdAt:-1})
    .then(result => {
        res.render('index',{blogs:result,title:'All Blogs'});
    })
    .catch(err =>{
        console.log(err);
    });
});

//post request for blog


app.post('/blogs',(req,res) =>{
    const blog=new Blog(req.body);
    blog.save()
        .then(result =>{
            res.redirect('/blogs');
        })
        .catch(err =>{
            console.log(err);
        });
});

// get particular id 


app.get('/blogs/:id',(req,res) =>{
    const id=req.params.id;
    Blog.findById(id)
    .then(result =>{
        res.render('details',{blog:result,title:'Blog details'});
    })
    .catch(err =>{
        console.log(err);
    });
});

//delete any page 


app.delete('/blogs/:id',(req,res) =>{
    const id =req.params.id;
    Blog.findByIdAndDelete(id)
    .then(result=>{
        res.json({redirect:'/blogs'});
    })
    .catch(err =>{
        console.log(err);
    });
});


//404 middleware

app.use((req,res)=>{

    res.status(404).render('404',{title:'error | 404'});
    
    
});








