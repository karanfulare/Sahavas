const Post = require('../models/post');
const User = require('../models/user');

module.exports.home = async function (req, res) {                      //modules.exports.Actionname=callback function ;
    // res.end("<h1> This is my Controller !!! </h1>");
    // console.log(req.cookies);
    // res.cookie('user_id',22);
    //   Post.find({},function(err,posts){
    //       return res.render('home',{
    //     title : " Sahavas | Home ",
    //     posts : posts
    // });
    //   })
    
  try{
    // populate the user of each post 
    let posts = await Post.find({})
    .sort('-createdAt')
    .populate('user')
    .populate({
        path: 'comments',
        populate:{
            path:'user'
        }
    });
    let users = await User.find({});

            return res.render('home', {
                title: " Sahavas | Home ",
                posts: posts,
                all_users: users
            });
    
        } catch(err){
            console.log('Error'.err);
        }
    
}

