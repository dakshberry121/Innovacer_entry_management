const app = (require('express'))();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
var path = require('path');
var express = require('express');

mongoose.connect("mongodb://localhost/innovacer", {useNewUrlParser : true});

const visitorRoutes = require("./routes/visitor_routes");
const hostRoutes = require("./routes/host_routes");

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static(path.join(__dirname, '')));

app.get("/", (req, res) => {
  res.render('index');
});



app.use("/api/visitor", visitorRoutes);
app.use("/api/host", hostRoutes);

app.get("*", (req, res) => {
    res.send("This route doesn't exist");
})

app.listen(process.env.PORT || 5000, (err) => {
    if(err){
        console.error(err);
    }
    else
        console.log("Working fine");
})