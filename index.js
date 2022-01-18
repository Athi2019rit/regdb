var express = require("express")
var bodyParser=require("body-parser")
var mongoose=require("mongoose")
const e = require("express")

const app = express()

app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended:true
}))

mongoose.connect('mongodb://localhost:27017/sample',{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

var db = mongoose.connection;

db.on('error',()=>console.log("Error in connecting to the database"));
db.once('open',()=>console.log("Successful connection"));

app.post("/signup",(req,res)=>{
    var name=req.body.name;
    var email=req.body.email;
    var phno=req.body.phno;
    var pswd=req.body.pswd;

    var data={
        "name" : name,
        "email": email,
        "phno" : phno,
        "pswd": pswd
    }
    db.collection('users').insertOne(data,(err,collection)=>{
        if(err)
        {
            throw err;
        }
        console.log("Record Inserted Successfuly");
    });

    return res.redirect('signup_success.html');
})

app.get("/",(req,res)=>{
    res.set({
        "Allow-access-Allow-Origin": '*'
    })
    return res.redirect('index.html');
}).listen(4000);

console.log("Listening on port 3000");