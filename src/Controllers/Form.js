const form = require("../models/Form")
exports.addForm = async (req, res) => {
    try {
        const { name, phone, email, message, interest } = req.body
        const _form = new form(req.body)
        await _form.save()
        res.status(201).json({ message: "Form has been submitted" })
    } catch (error) {
        console.log(error)
        return res.status(401).json({ mesage: "error" })

    }

}










// const eUser= await user.findOne({email})
// if(!eUser)
// {
//   _user.save().then(newuser => {
//     return res.status(201).json({newuser, message:"successful"})
//  }).catch(error =>{
//    return res.status(400).json({error, message:"error is caught"})
//  })
// }
// else{
//   return res.status(400).json({ message:"user already exist" })
//   console.log(req.body)
// }
