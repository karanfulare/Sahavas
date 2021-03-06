const express=require('express');
const cookieParser = require('cookie-parser');
const app =express();
// const cors = require('cors');
// app.use(cors({
//     origin:"http://localhost:8000"
// }));
const port =8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');

//authentication and session creation using 
const session =require('express-session');
const passport=require('passport');
const passportLocal = require('./config/passport-local-strategy');
const passportJWT = require('./config/passport-jwt-strategy');
const passportGoogle = require('./config/passport-google-oauth2-strategy');
const MongoStore = require('connect-mongo');

const flash = require('connect-flash');
const customMware = require('./config/middlewareForFlash');

// // setup the chat server to be used with socket.io
const chatServer = require('http').Server(app);
const chatSockets = require('./config/chat_sockets').chatSockets(chatServer);
chatServer.listen(5000);
console.log('chat server is listening on port 5000');


app.use(express.urlencoded());

app.use(cookieParser());

app.use(express.static('./assests'));
// making the uploads path available to browser
app.use('/uploads',express.static(__dirname + '/uploads'));
app.use(expressLayouts);

// EXTRACT sTYLES AND SET THEM IN LAYOUT EJS at proper place
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);




//set up view engine 
app.set('view engine', 'ejs');
app.set('views','./views');

app.use(session({
    name:'sahavas',
    // TODO change secret before deployment 
    secret:'god-knows',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge: (1000 * 60 * 100)
    },
    store:MongoStore.create ({
        mongoUrl:'mongodb://localhost:27017/sahavas_developement',
        autoRemove: 'diabled'
    },
    {
        function(err){
            console.log(err || 'connect-mongodb setup ok');
        }
    })
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(customMware.setFlash);
// using express router 
app.use('/' , require('./routes'));

app.listen(8000,function(err){
    if(err){
        console.log(`error:${err}`);
    };
    console.log(`Server running on port: ${port} sucessfully !`);
});