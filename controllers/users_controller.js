module.exports.profile=function(req,res){
    res.end("<h1> This is Users Profile !!! </h1>");
};


module.exports.edit=function(req,res){
    res.end("<h1> Edit Function in users controller</h1>");
};

module.exports.register=function(req,res){
  return  res.render ('register',{
      title:"Register"
  })
};

module.exports.signin = function(req,res){
    return res.render ('signIn',{
        title:"Sign In"
    });
};