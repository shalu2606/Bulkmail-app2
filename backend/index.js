const express = require("express")//install express to use it 
const cors = require("cors")//install cors to use it
const nodemailer = require("nodemailer");
const mongoose = require("mongoose")


const app = express()

app.use(cors())
app.use(express.json())
//install
mongoose.connect("mongodb+srv://shalini:shalu123@cluster0.papat.mongodb.net/passkey?retryWrites=true&w=majority&appName=Cluster0").then(function(){
    console.log("Connected to DB")
}).catch(function(){console.log("Failed to Connect")})


const credential= mongoose.model("credential",{},"ulkmail")



app.post("/sendemail",function(req,res){


    var msg=req.body.msg
    var emailList=req.body.emailList

    

credential.find().then(function(data){

    console.log(data[0].toJSON())

    const transporter = nodemailer.createTransport({
        service:"gmail",
        auth: {
            user: data[0].toJSON().user,
            pass: data[0].toJSON().pass,
        },
      });

      new Promise( async function(resolve,reject){
        try{
            for(var i=0;i<emailList.length;i++)
                {
                  await  transporter.sendMail(
                        {
                            from:"shalinivijay1626@gmail.com",
                            to:emailList[i],
                            subject:" A Message from bulkmail App",
                            text:msg
                        },
                        
                    )
                    console.log("Email sent to:"+emailList[i])
                }
        
                resolve("Sucesss")
        }
        
        
            catch(error)
        {
            reject("Failed")
        }
            
        }).then(function(){
            res.send(true)
        }).catch(function(){
            res.send(false)
        })
    }).catch(function(error){
        console.log(error)
    })
        
        })

    


app.listen(5000,function(){
    console.log("Server Started...")
})