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

var dataImage = require("../models/imageModel")

var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');


app.use(bodyParser.json());

var multer = require('multer')

 






var upload = multer({ dest: './public/uploads' })






//endimgae


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
        message: req.body.message,
        category: req.body.category

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
            message: req.body.message,
            category: req.body.category
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

// router.post("/", upload.any(), function (req, res, next) {
//     console.log('Image upload')
//     var dataRequest = {imageData: req.files,
//     metaData: req.body}
//
//     res.json(dataRequest)
//
//
// })


// save image to mongodb

router.get("/save", function (req, res) {
    var newData = new dataImage({
        
        img: {data: fs.readFileSync('./public/uploads/8df6948370dcebafbfc2bd22f96c4ed4'),
        contentType: 'image/png'}
        
    })

    newData.save(function (err, newData) {
        if (err) {
            return next(err)
        }
        res.json(201, newData)
        console.log("Dodano zdjecie.")
    })
})

router.get("/display/:imgId", function (req, res) {

    var dataGet = {_id: req.params.imgId}


    dataImage.findOne(dataGet).exec(function (err, doc) {
        if (err) {
            return next(err)
        }
        res.contentType(doc.img.contentType);
        res.send(doc.img.data);

    })



    // res.json("test")

})

//////////////////////////////////////////////////////////////////////////

router.get('/api/dataModel', function (req, res, next) {
    dataPost.find()
        .sort('-date')
        .exec(function (err, posts) {
            if (err) {
                return next(err)
            }
            res.json(posts)
        })
})

router.get('/api/dataModel/:category', function (req, res, next) {

    var dataGet = {category: req.params.category}
    
    
    dataPost.find(dataGet)
        .sort('-date')
        .exec(function (err, posts) {
            if (err) {
                return next(err)
            }
            res.json(posts)
        })
})


router.post("/", upload.any(), function (req, res, next) {
    console.log('Image upload')

    var newData = new dataPost({

        
        fieldname: req.files[0].fieldname,
        originalname:  req.files[0].originalname,
        encoding:  req.files[0].encoding,
        mimetype:  req.files[0].mimetype,
        destination:  req.files[0].destination,
        filename:  req.files[0].filename,
        path:  req.files[0].path,
        size:  req.files[0].size,


        owner: req.body.owner,
        number: null,
        category: req.body.category,
        description: req.body.description
    })

    newData.save(function (err, newData) {
        if (err) {
            return next(err)
        }
        res.json(201, newData)
        console.log("Dodano zdjecie.")
    })


})

router.get('/:imageId', function (req, res, next) {
    var dataGet = {_id: req.params.imageId}


    dataPost.findOne(dataGet).exec(function (err, doc) {
        if (err) {
            return next(err)
        }
        // res.contentType(doc.img.contentType);
        // res.send(doc.img.data);
        console.log(" sciezka "+doc.path)

        res.sendfile('./' +  doc.path);
        // res.sendfile('./public/uploads/de898816bd6068e034ee430f57d13f2d');
    })

  

});

// display image

router.get('/image.png', function (req, res) {
    res.sendfile('./public/uploads/6dc87f7df87da34524a4fead8d80cf0c');

});
//
// var formidable = require('formidable')
// var util = require("util");
//
// router.post("/", function (req, res, next) {
//     var form = new formidable.IncomingForm();
//
//     form.parse(req, function(err, fields, files) {
//         // res.writeHead(200, {'content-type': 'text/plain'});
//         // res.write('received upload:\n\n');
//         // res.end(util.inspect({fields: fields, files: files}));
//         console.log(files)
//         console.log(fields)
//         res.json(req.files)
//     });
//
// })
// var Busboy = require('busboy');
// router.post('/', function (req, res, params) {
//
//
//         // Create an Busyboy instance passing the HTTP Request headers.
//         var busboy = new Busboy({ headers: req.headers });
//
//         // Listen for event when Busboy finds a file to stream.
//         busboy.on('file', function (fieldname, file, filename, encoding, mimetype) {
//
//             // We are streaming! Handle chunks
//             file.on('data', function (data) {
//                 // Here we can act on the data chunks streamed.
//                 var złom = { binaryDataImage : data};
//                 res.json(złom)
//             });
//
//             // Completed streaming the file.
//             file.on('end', function () {
//                 console.log('Finished with ' + fieldname);
//             });
//         });
//
//         // Listen for event when Busboy finds a non-file field.
//         busboy.on('field', function (fieldname, val) {
//             // Do something with non-file field.
//         });
//
//         // Listen for event when Busboy is finished parsing the form.
//         busboy.on('finish', function () {
//             res.statusCode = 200;
//             res.end();
//         });
//
//         // Pipe the HTTP Request into Busboy.
//         req.pipe(busboy);
//         console.log(busboy)
//
// });







//

module.exports = router;