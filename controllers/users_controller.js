const User = require ('../models/user');

module.exports.profile=function(req,res){
    res.end("<h1> This is Users Profile !!! </h1>");
};


module.exports.edit=function(req,res){
    res.end("<h1> Edit Function in users controller</h1>");
};


// render the sign up page
module.exports.signUp=function(req,res){
  return  res.render ('user_sign_up',{
      title:"Sahavas | Register"
  });
};

// render the sign in page 
module.exports.signIn = function(req,res){
    return res.render ('signIn',{
        title:"Sahavas | Sign In"
    });
};

//get the sign up data
module.exports.create=function(req,res){
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }

    User.findOne({email: req.body.email}, function(err,user){
        if(err){console.log('Error finding user '); return}

        if(!user){
            User.create(req.body, function(err,user){
                if(err){console.log('Error creating user '); return}

                return res.redirect('/users/signin');
            })
        } else{
            return res.redirect('back');
        }
    });
}
// sign in and create a session 
module.exports.createSession=function(res,req){
    // TODO
}