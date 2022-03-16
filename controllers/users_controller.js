const User = require ('../models/user');

module.exports.profile=function(req,res){
    User.findById(req.params.id , function (err,user){
        return res.render('user_profile', {
            title: 'User Profile',
            profile_user: user
        });
    });
  
}

module.exports.update = function(req,res){
    if(req.user.id == req.params.id){
        User.findByIdAndUpdate(req.params.id, req.body, function(err,user){
            req.flash('success','Updated!');
            return res.redirect('back');
        });
    }
    else{
       return res.status(401).send('Unauthorized');
    }
}


// render the sign up page
module.exports.signUp=function(req,res){
   if(req.isAuthenticated()){
       return res.redirect('users/profile');
   }

  return  res.render ('user_sign_up',{
      title:"Sahavas | Register"
  });
};


// render the sign in page 
module.exports.signIn = function(req,res){

if(req.isAuthenticated()){
    return res.redirect('users/profile');
}

    return res.render ('signin',{
        title:"Sahavas | Sign In"
    });
};

//get the sign up data
module.exports.create=function(req,res){
    if(req.body.password != req.body.confirm_password){
        req.flash('error', 'Passwords do not match');
        return res.redirect('back');
    }

    User.findOne({email: req.body.email}, function(err,user){
        if(err){req.flash('Error finding user ',err); return}

        if(!user){
            User.create(req.body, function(err,user){
                if(err){req.flash('Error finding user ',err); return}

                return res.redirect('/users/signin');
            })
        } else{
            req.flash('success', 'You have signed up, login to continue!');
            return res.redirect('back');
        }
    });
}

// sign in and create a session 
module.exports.createSession=function(req,res){
    req.flash('success','logged in successfully');
    return res.redirect('/')
};

module.exports.destroySession = function(req,res){
    req.logout();
    req.flash('success',' you have logged out !');
    return res.redirect('/');
}