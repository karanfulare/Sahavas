const Comment = require('../models/comment');
const Post = require('../models/post');
const commenstMailer = require('../mailers/comment_mailers');
const commentEmailWorker = require('../workers/comment_email_worker');
const queue = require('../config/kue');


module.exports.create = async function(req, res){

    try{
        let post = await Post.findById(req.body.post);

        if (post){
         let comment = await Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            });
                // handle error

                post.comments.push(comment);
                post.save();
                console.log("comment", comment);

                // comment = await comment.populate('user', 'name email').execPopulate();
                // commenstMailer.newComment(comment);
                let userDet = await Comment.findOne({ user: req.user._id })
                .populate("user")
                .exec(); // populating username from post
              // need to add comment
              // commentMailer.newComment(userDet,comment);
              //   let job=  queue.create('emails',comment).save(function(err){
        
              // this is being don by me t to merge userset and comment and send to job
              let newCommNadUserDetails = {
                comment: comment,
                userDet: userDet,
              };
              console.log("dasda", newCommNadUserDetails);
              // commenstMailer.newComment(comment);
             // commenstMailer.newComment(newCommNadUserDetails);
            let job= queue.create('emails', newCommNadUserDetails).save(function(err){
                 if(err){
                     console.log('error in creating queue', err)
                 }
                 console.log("job enqued",job.id);
             })
                if (req.xhr){
                    // Similar for comments to fetch the user's id!
                 //   comment = await comment.populate('user', 'name').execPopulate();
        
                    return res.status(200).json({
                        data: {
                            comment: comment,
                            userDet: userDet,
                        },
                        message: "Post created!"
                    });
                }
                req.flash('success','comment added');

                res.redirect("/");
            
        }
    } catch(err){
        req.flash('error',err);
        return;
    }
    
}


module.exports.destroy = async function(req, res){

    try{
        let comment= await Comment.findById(req.params.id);

        if (comment.user == req.user.id){

            let postId = comment.post;

            comment.remove();

          let post = await  Post.findByIdAndUpdate(postId, { $pull: {comments: req.params.id}});
           // send the comment id which was deleted back to the views
           if (req.xhr){
            return res.status(200).json({
                data: {
                    comment_id: req.params.id
                },
                message: "Post deleted"
            });
        }
          req.flash('success', 'Comment deleted!');
                return res.redirect('back');
            }
            else{
                req.flash('error', 'Unauthorized');
                return res.redirect('back');
            }
        }
        catch(err){
            req.flash('error',err);
            return;
        }
      
    } 
    
