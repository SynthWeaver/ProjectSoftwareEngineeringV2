const { response } = require('express');
const nodemailer = require('nodemailer');
const log = console.log;


   

var sendGmail = {
    
    sendEmail : function sendEmail(req, res) {
        var options = {
            service: 'Gmail',
            auth: {
                user: 'lucasambucaatje@gmail.com',
                pass: 'HiYoussef123'
            }
        };
        var transport =  nodemailer.createTransport(options);
        var temp = res;
        transport.sendMail({
            from: 'lucasambucaatje@gmail.com', 
            to: 'lucasambucaatje@gmail.com',
            subject: 'Order confirmatie',
            text: "Bedankt voor uw bestelling!",
            
            // html: html
        }
        , function(err) {
            var val; 
            if (err) {
                console.log("Failed!")
                val = false;
                console.log("error: ", err);
                return res.json({mailstatus:false})

            } else {
                console.log("Succes!")
                val = true;
                return res.json({mailstatus:true})

            }
        });
    }

};




module.exports = { sendGmail };

