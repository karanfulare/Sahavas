const express=require('express');
const app =express();
const port =8000;
const expressLayouts = require('express-ejs-layouts');


app.use(express.static('./assests'));
app.use(expressLayouts);
// EXTRACT sTYLES AND SET THEM IN LAYOUT EJS at proper place
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

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