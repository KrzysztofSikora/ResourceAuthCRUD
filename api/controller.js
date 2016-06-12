/**
 * Created by krzysztof on 04.06.16.
 */
/**
 * Created by Lenovo on 2016-06-01.
 */
var express = require("express");
var router = express.Router();
var http = require("http");

var dataPost = require("../models/dataModel"); // model
// Add




//endimgae

var app = express();
var bodyParser = require('body-parser');



app.use(bodyParser.json());


//image
var multer = require('multer')
var upload = multer({ dest: '../public/uploads' })


router.get("/test", function (req, res) {
    console.log("Test")
});


// router.get("/test/:zmienna", function (req, res) {
//
//     var dataGet = {id: req.params.zmienna}
//     res.json(201, dataGet)
// });
//
// router.post("/test/", function (req, res) {
//     var dataPost = {
//         number: req.body.number,
//         message: req.body.message }
//     res.json(201, dataPost)
// })
//
// router.post("/test/:post", function (req, res) {
//     var dataPost = {
//         post: req.params.zmienna,
//         number: req.body.number,
//         message: req.body.message }
//     res.json(201, dataPost)
// })
//
//
// router.put("/test/", function (req, res) {
//
//     var dataPut = {
//         post: req.params.zmienna,
//         number: req.body.number,
//         message: req.body.message
//     }
//     console.log("działa")
//     res.json(201, dataPut)
// })
//
// router.put("/test/:put", function (req, res) {
//
//     var dataPut = {
//         post: req.params.put,
//         number: req.body.number,
//         message: req.body.message
//     }
//
//     res.json(201, dataPut)
// })
//
// router.delete("/test/", function (req, res) {
//
//     var dataPut = {
//         post: req.params.put,
//         number: req.body.number,
//         message: req.body.message
//     }
//
//     res.json(201, dataPut)
// })
//
// router.delete("/test/:delete", function (req, res) {
//
//     var dataPut = {
//         post: req.params.delete,
//         number: req.body.number,
//         message: req.body.message
//     }
//
//     res.json(201, dataPut)
// })

// show all
router.get("/show/all", function (req, res) {


    dataPost.find().exec(function (err, data) {
        if (err) {
            return next(err)
        }
        res.json(201, data)
    })

});

// showw by number
router.get("/show/:zmienna", function (req, res) {


    var dataGet = {number: req.params.zmienna}


    dataPost.findOne(dataGet).exec(function (err, data) {
        if (err) {
            return next(err)
        }
        res.json(201, data)
    })

});

//add

router.post("/add/", function (req, res) {
    var newData = new dataPost({
        owner: req.body.owner,
        number: req.body.number,
        message: req.body.message
    })

    newData.save(function (err, dataPost) {
        if (err) {
            return next(err)
        }
        res.json(201, dataPost)
        console.log("Dodano post.")
    })
})

// update

router.put("/edit/:zmienna", function (req, res) {


    dataPost.update(
        {number: req.params.zmienna},
        {
            owner: req.body.owner,
            number: req.body.number,
            message: req.body.message
        })
        .exec(function (err, data) {
            if (err) {
                return next(err)
            }
            res.json(201, data)
        })

})


router.delete("/delete/:zmienna", function (req, res) {


    dataPost.remove({
        number: req.params.zmienna
    }).exec(function (err, data) {
        if (err) {
            return next(err)
        }
        res.json(201, data)
    })

})

router.delete("/delete/id/:id", function (req, res) {


    dataPost.remove({
        _id: req.params.id
    }).exec(function (err, data) {
        if (err) {
            return next(err)
        }
        res.json(201, data)
    })

})

// add image

router.post("/", upload.any(), function (req, res, next) {
    console.log('Image upload')
    var dataRequest = {imageData: req.files,
    metaData: req.body}
    res.json(dataRequest)
    
})

// display image

router.get('/image.png', function (req, res) {
    res.sendfile('./public/uploads/6dc87f7df87da34524a4fead8d80cf0c');

});


module.exports = router;