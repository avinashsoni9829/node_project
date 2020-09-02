const express=require('express');
const app=express();
const port=3000;
app.listen(port,()=>{
    console.log(`listening to the port: ${port}`);
});

//setting view engine

app.set('view engine','ejs');


// manage requests

app.get('/',(req,res)=>{
    const blogs=[
       {author:"avinash",title:"welcome to node js ", subcategory:"node js",snippet:"hello ! welcome to node js "},
       {author:"avinash",title:"welcome to express js ", subcategory:"express js",snippet:"hello ! welcome to expres js "},
       {author:"avinash",title:"welcome to mongo db ", subcategory:"mongo db",snippet:"hello ! welcome to mongodb"},
       
       

    ];
    
    res.render('index',{title:'HOME',blogs});

});

app.get('/about',(req,res)=>{
    res.render('about',{title:'About Us'});
});

app.get('/blogs/create',(req,res)=>{
    res.render('create',{title:'New Blog'});
})




//404 middleware

app.use((req,res)=>{

    res.status(404).render('404',{title:'error | 404'});
    
    
});








