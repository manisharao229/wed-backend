const express = require("express")
const { default: mongoose } = require("mongoose")
const server = express()
//const users = require("./src/Models/user")
const { register,Login, findUser } = require("./src/Controllers/auth")
const http= require("http")
const {Server}=require("socket.io")
const cors= require ("cors");
const { verifyToken, validateForm, isValidated } = require("./src/Middlewares");
const { addForm } = require("./src/Controllers/Form")
//const {log}=require("console")


const app= http.createServer(server)

const io= new Server(app)


server.use(express.json())
server.use(cors())

server.get("/",(req,res)=>{

//    res.send("Success")
res.status(200).json({
  name:"manisha",
  age:50
})
})
// server.post("/register",async(req,res)=>{
    
//     // to save
//   })
require('dotenv').config()

server.post("/register",register)
server.post("/Login",Login)
server.get("/get-user",verifyToken,findUser)
server.post("/add-form",validateForm,isValidated,addForm)


// io.on("connection",socket=>{
// console.log("new user connect");
// socket.on("message",(message,room)=>{       // on is used  to recieve msg
//   console.log(`New mesaage recieved in ${room} and message is ${message}`)
//   socket.to(room).emit("message",message)   // emit is used  to send msg
// })
//  socket.on("join",(room)=>{
//   console.log(room)
//   socket.join(room)
//   socket.emit("joined")
//  })

// })



io.on("connection",socket =>{
  console.log("new user connected");
  socket.on("message",(message,room)=>{
    console.log(`new message recieved in ${room} and message is ${message}`);
    socket.to(room).emit("message",message)
  }) // socket p koi trigger krega toh ye run ho jayega


  socket.on("join",(room)=>{ // 2 
    console.log(room);
    socket.join(room)
    socket.emit("joined") // emit msg ko bjehne  e k liye on msg receive krne k liye
  })
})
app.listen(process.env.PORT,function(){
  console.log("Connect to port")
})

// for connecting database 
mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("Database Connected")
}).catch((error)=>{
    console.log(error)
})




