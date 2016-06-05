/**
 * Created by krzysztof on 04.06.16.
 */
/**
 * Created by Lenovo on 2016-06-01.
 */
var express = require("express");
var router = express.Router();
var http = require("http");


// Add
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());

router.get("/test", function (req, res) {
   console.log("Test")
});



router.get("/test/:zmienna", function (req, res) {
    
    var dataGet = {id: req.params.zmienna}
    res.json(201, dataGet)
});

router.post("/test/", function (req, res) {
    var dataPost = {
        number: req.body.number,
        message: req.body.message }
    res.json(201, dataPost)
})

router.post("/test/:post", function (req, res) {
    var dataPost = {
        post: req.params.zmienna,
        number: req.body.number,
        message: req.body.message }
    res.json(201, dataPost)
})


router.put("/test/", function (req, res) {

    var dataPut = {
        post: req.params.zmienna,
        number: req.body.number,
        message: req.body.message
    }
    console.log("działa")
    res.json(201, dataPut)
})

router.put("/test/:put", function (req, res) {

    var dataPut = {
        post: req.params.put,
        number: req.body.number,
        message: req.body.message
    }

    res.json(201, dataPut)
})

router.delete("/test/", function (req, res) {

    var dataPut = {
        post: req.params.put,
        number: req.body.number,
        message: req.body.message
    }

    res.json(201, dataPut)
})

router.delete("/test/:delete", function (req, res) {

    var dataPut = {
        post: req.params.delete,
        number: req.body.number,
        message: req.body.message
    }

    res.json(201, dataPut)
})


module.exports = router;