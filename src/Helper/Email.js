const nodemailer = require("nodemailer")
exports.sendEmail=async(req,res)=>{
    try {
        const transport = nodemailer.createTransport({
            service:"gmail",
            host:"smtp.gmail.com",
            port:465,
            auth:{
                user:"shw1172003@gmail.com",
                pass:"pqim nqmb lbih fajv"
            }
        })
        const data ={
            from:"shw1172003@gmail.com",
            to:req.body.email,
            subject:req.subject,
            text:req.text
        }

        transport.sendMail(data,(error,info)=>{
           if(error){
            console.log(error);
            res.status(400).json({message:"email delivery error"})
           }else{
            console.log(info);
            res.status(200).json({message:"Success"})
           }
        })
    } catch (error) {
        
    }

}