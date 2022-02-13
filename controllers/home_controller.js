module.exports.home = function(req,res){                      //modules.exports.Actionname=callback function ;
    // res.end("<h1> This is my Controller !!! </h1>");
    // console.log(req.cookies);
    // res.cookie('user_id',22);
    return res.render('home',{
        title : "Sahavas"
    });
};

// module.exports.homeInDark = function(req,res){
//     res.end('in dark ');
// };

