const nodeMailer = require('../config/nodemailer');


// this is another way of exporting a method
exports.newComment = (comment) => {
    let htmlString = nodeMailer.renderTemplate(
        {comment: comment.comment}, '/comments/commentsMailer.ejs');

    nodeMailer.transporter.sendMail({
       from: 'karan22fulare@gmail.com',
       to: comment.userDet.user.email,
       subject: "New Comment Published!",
       html: htmlString,
    }, (err, info) => {
        if (err){
            console.log('Error in sending mail', err);
            return;
        }

        console.log('Message sent', info);
        return;
    });
}