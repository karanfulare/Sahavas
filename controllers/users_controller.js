const User = require ('../models/user');

module.exports.profile=function(req,res){
    
    if(req.cookies.user_id){
      User.findById(req.cookies.user_id,function(err,user){
           if(user){
                  res.render('user_profile',{
                   title :"Sahavas | User-Profile",
                   user:user});
                   }
              // return res.redirect('/users/signIn');  // async error cannot sent headers to client 
          });
       }
    else{return res.redirect('/users/signIn'); }
}

module.exports.signout=function(req,res){
         console.log("You have logged out !!")
        return res.redirect('/')
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
module.exports.createSession=function(req,res){
    // find the user
    User.findOne({ email: req.body.email }, function(err, user){
        console.log(req.body);
        if(err){console.log('error finding user'); return}
        // if found 

        if(user){
           // 
           if(user.password != req.body.password){
               return res.redirect('back');
           }

           res.cookie('user_id', user.id);
           return res.redirect('/users/profile');
        }
        else{
            return res.redirect('back');
        }

    });
};