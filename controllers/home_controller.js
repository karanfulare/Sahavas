const Post = require('../models/post');

module.exports.home = function (req, res) {                      //modules.exports.Actionname=callback function ;
    // res.end("<h1> This is my Controller !!! </h1>");
    // console.log(req.cookies);
    // res.cookie('user_id',22);
    //   Post.find({},function(err,posts){
    //       return res.render('home',{
    //     title : " Sahavas | Home ",
    //     posts : posts
    // });
    //   })

    // populate the user of each post 
    Post.find({})
    .populate('user')
    .populate({
        path: 'comments',
        populate:{
            path:'user'
        }
    }) 
    .exec(
        function(err, posts) {
        return res.render('home', {
            title: " Sahavas | Home ",
            posts: posts
        });

    });
}

// module.exports.homeInDark = function(req,res){
//     res.end('in dark ');
// };

