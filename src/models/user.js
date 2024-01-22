const mongoose =require("mongoose") //import mongoose
const bcrypt= require("bcrypt")
const user = new mongoose.Schema({
    name:{
        type:String,
        required:true  

    },
    email:{
      type:String,
      required:true  
    },
    hash_password: {
      type:String,
      required:true
    },
    pNo:{        
        type:Number,
      required:true ,
      unique:true
    }
})

user.virtual("password").set(function(password){   
  this.hash_password=bcrypt.hashSync(password,10)
})

// user define function
user.methods={
  authenticate: function (password){
      return bcrypt.compareSync(password,this.hash_password)

  }
}
module.exports=mongoose.model("users",user)