const express=require('express');
const app =express();
const port =8000;

// using express router 
app.use('/' , require('./routes'));

//set up view engine 
app.set('view engine', 'ejs');
app.set('views','./views');



app.listen(8000,function(err){
    if(err){
        console.log(`error:${err}`);
    };
    console.log(`Server running on port: ${port} sucessfully !`);
});