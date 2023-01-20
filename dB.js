const express = require("express")
const ejs = require("ejs")
const bodyParser = require("body-parser")


const app = express()

const homeContent = "Welcome to Schoolbook"

app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static("public"))

app.get("/", function(req, res) {
    res.render("firstpage", {content: homeContent})
})

app.get("/home", function(req, res) {
    res.render("home")
})

app.get("/post", function(req, res) {
    res.render("post")
})


app.post("/post", function(req, res) {
    
    const name = req.body.username
    const nicky = req.body.nickname
    const nameOfClass = req.body.nameOfClass

    console.log(name, nicky, nameOfClass)
})

app.listen(3000, function(req, res) {
    console.log("Server started on port 3000")
})

