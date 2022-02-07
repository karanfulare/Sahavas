module.exports.home = function(req,res){                      //modules.exports.Actionname=callback function ;
    // res.end("<h1> This is my Controller !!! </h1>");
    return res.render('home',{
        title : "Sahavas"
    });
};

// module.exports.homeInDark = function(req,res){
//     res.end('in dark ');
// };