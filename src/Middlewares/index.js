const jwt = require("jsonwebtoken")
const {check,validationResult}=require("express-validator")
exports.verifyToken = (req, res, next) => {
    try {
        const token = req.headers.authorization

        if (token) {
            const data = jwt.verify(token, "MYSECERTKEY@")
            // console.log(data);
            const {id}=data;   
            req.id=id; 
            next();

           // return res.status(200).json({ data })

        } else {
            return res.status(401).json({ message: "token is missing" })
        }
    } catch (err) {
        return res.status(401).json({ err })
    }

}

exports.validateForm=[
    check("name").notEmpty().withMessage("please Enter Name"),
    check("phone").isMobilePhone().withMessage("please Enter  validPhone No."),
    check("email").isEmail().withMessage("please Enter email"),
    check("message").notEmpty().withMessage("please Enter message"),
    check("interest").notEmpty().withMessage("please Enter interest"),
    

]
exports.isValidated=(req,res,next)=>{
    const errors=validationResult(req)
    if(errors.isEmpty()){
        next()
    }else{
        res.status(400).json({message:errors.array()[0]})
    }
}
