const user= require("../models/user")
const jwt= require("jsonwebtoken")

//const register =()=>({


   
// server.post("/register",(req,res)=>{
//     const{ name, phoneNumber ,email } = req.body
//     const _user = new users(req.body)
// _user.save()
//console.log(req.body)
// })



exports.register= async(req,res)=>{

    const{ name, pNo ,password,email } = req.body
   // const hash_password=bcrypt
    const _user = new user({
        name,
        pNo,
        password,
        email
    })
    const eUser= await user.findOne({pNo})
    if(!eUser)
    {
      _user.save().then(newuser => {
        return res.status(201).json({newuser, message:"successful"})
     }).catch(error =>{
       return res.status(400).json({error, message:"error is caught"})
     })
}
    else{
      return res.status(400).json({ message:"user already exist" })
      console.log(req.body)
    }
}

exports.Login =async (req,res)=>{
const {email,password}=req.body
const eUser= await user.findOne({email})
if (eUser){
    //login code

if (eUser.authenticate(password)){

    const token=jwt.sign({
        id:eUser._id
    },"MYSECERTKEY@",{
        expiresIn:"1y"
    })
res.status(200).json({token,message:"Login Successfull"})
}
else{
    return res.status(401).json({ message:"incorrect email or password"})   //401-unauthorized access
}

}
else{
    return res.status(404).json({message:"user not found"})  
}
}


exports.findUser=async(req, res) =>{
    const users= await user.findById(req.id) //only find one data
    return res.status(200).json({ users })
}
 


