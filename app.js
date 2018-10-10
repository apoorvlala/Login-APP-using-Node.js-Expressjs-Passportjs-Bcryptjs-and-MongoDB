var express=require('express');
var path=require('path');
var cookiParser=require('cookie-parser');
var bodyParser=require('body-parser');
var exphbs=require('express-handlebars');
var expressValidator=require('express-validator');
const { check, validationResult } = require('express-validator/check');
var flash=require('connect-flash');
var session=require('express-session');
var passport=require('passport');
var LocalStrategy=require('passport-local').Strategy;

var routes=require('./routes/index');
var users=require('./routes/users');

//Init app
var app=express();

//View Engine
app.set('views',path.join(__dirname,'views'));
app.engine('handlebars',exphbs({defaultLayout:"layouts"}));
app.set('view engine','handlebars');

//Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cookiParser());

//Set static folder
app.use(express.static(path.join(__dirname,'public')));

//Express session
app.use(session({secret:'secret',saveUninitialized:true,resave:true}));

//Passport init
app.use(passport.initialize());
app.use(passport.session());

//Connect Flash
app.use(flash());
//Global vars
app.use((req,res,next)=>{
    res.locals.success_msg=req.flash('success_msg');
    res.locals.error_msg=req.flash('error_msg');
    res.locals.error=req.flash('error');

    res.locals.user=req.user || null;
    next();
});

app.use('/',routes);
app.use('/users',users);

//setting port
app.set('port',(process.env.PORT || 3000));
app.listen(app.get('port'),()=>{
    console.log('Server started on port= '+app.get('port'));
});