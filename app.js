const express = require("express")
const bodyParser = require("body-parser")
const ejs = require("ejs")
const mongoose = require("mongoose")


const app = express()

const homeContent = "Welcome to Schoolbook"



app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static("public"))

mongoose.set('strictQuery', false)
mongoose.connect("mongodb://127.0.0.1:27017/bookDB")

//////////REGISTER SCHEMA////////////////

const booksSChema = {
    username: String,
    password: {
        type: String,
        required: true
    },
    email: String
}

const Book = mongoose.model("Book", booksSChema)

///////////////HOME SCHEMA/////////////////

const homeSchema = {
    name: String,
    nicky: String,
    nameClass: String,
    text: String
}

const Home = mongoose.model("Home", homeSchema)




// //////////////////GET RENDERING/////////////////////////////////////////


app.get("/", function(req, res) {
    res.render("firstpage", {
        content: homeContent,
    })
})

app.get("/home", function(req, res) {
    Home.find({}, function(err, foundItems) {
        res.render("home", {postContent: foundItems})   
})
})

app.get("/post", function(req, res){
    res.render("post")
})

app.get("/profile", function(req, res) {
    res.render("profile")
})

app.get("/register", function(req, res) {
    res.render("register")
})

app.get("/login", function(req, res) {
    res.render("login")
})

////////////POST RENDERING////////////////////

app.post("/register", function(req, res) {
    const user = new Book ({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email
    })
    user.save()
    res.redirect("home")
})

app.post("/post", function(req, res) {

    const name = req.body.username
    const nicky = req.body.nickname
    const nameClass = req.body.nameOfClass
    const text = req.body.textarea

    const postName = new Home ({
        name: name,
        nicky: nicky,
        nameClass: nameClass,
        text: text
    })
    postName.save()
    res.redirect("home")
})




app.listen(3000, function() {
    console.log("Server started on port 3000")
})