const queue = require('../config/kue');

const commentsmailer = require('../mailers/comment_mailers');

queue.process('emails', function(job,done){
    console.log('emails worker is processing a job', job.data);

    commentsmailer.newComment(job.data);
    
    done();

});