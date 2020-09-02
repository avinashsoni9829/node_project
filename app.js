const express=require('express');
const app=express();
const port=3000;
app.listen(port,()=>{
    console.log(`listening to the port: ${port}`);
});

// manage requests

app.get('/',(req,res)=>{
    res.sendFile('./views/index.html',{root:__dirname});
});

app.get('/about',(req,res)=>{
    res.sendFile('./views/about.html',{root:__dirname});
});

//404 middleware

app.use((req,res)=>{
    res.status(400).sendFile('./views/404.html',{root:__dirname});
});








