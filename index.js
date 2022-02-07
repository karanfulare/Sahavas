const express=require('express');
const app =express();
const port =8000;

// using express router 
app.use('/' , require('./routes'));



app.listen(8000,function(err){
    if(err){
        console.log(`error:${err}`);
    };
    console.log(`Server running on port: ${port} sucessfully !`);
});