const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const checkAuth = require('../middleware/check-auth');
const multer = require('multer');

const Package = require('../models/package');


const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(null, true);
    } else {
      cb(null, false);
    }
  };
const storagedata = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, 'uploads');
    },
    filename : function(req, file, cb) {
       cb(null,  file.originalname);
    }
});
const upload = multer(
    {
        storage: storagedata,
        limits: {
            fileSize: 1024 * 1024 * 5
        },
        fileFilter: fileFilter
    });
//const upload = multer({dest: "uploads/"});



router.get("/add", (req, res, next) => {
    console.log('Request received from client for get all packages');
    res.render('addpackages.ejs');
    
});

router.get("/", (req, res, next) => {
    console.log('Request received from client for get all packages');
    Package
        .find()
        .exec()
        .then(doc => {
            console.log("from database", doc);
            res.render("viewpackages.ejs", { 
                packageList : doc
            });
            // res.status(200).json(doc);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err});
        });
    
});

router.get("/:packageId", (req, res, next) => {
    console.log('Request received from client to get a package info');
    const pkgId = req.params.packageId;
    console.log('Request received from client '+ pkgId)
    Package
        .find({packageId : pkgId})
        .exec()
        .then(doc => {
            console.log("from database", doc);
            res.render("viewpackagedetails.ejs", { 
                package : doc[0]
            });
            //res.status(200).json(doc);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err});
        });
});

router.post("/", (req, res, next) => {
    console.log('Request received from client to add a package');
    console.log("Package id " + req.body.packageId);
    console.log("Place Name " + req.body.placeName);


    
    // Filling the schema
    const package = new Package({
        _id: new mongoose.Types.ObjectId(),
        packageId: req.body.packageid,
        placeName: req.body.placename,
        noofAdults: req.body.noofadults ,
        noofchildren: req.body.noofchildren,
        description:req.body.description,
        stayAmount:req.body.stayamount ,
        foodAmount:req.body.foodamount,
        busAmount: req.body.busamount,
        trainAmount: req.body.trainamount,
        airlinesAmount: req.body.airlinesamount,
        noofDays: req.body.noofdays,
        noofNights: req.body.noofnights
    });
    
    // Saving to mongodb
    package
        .save()
        .then(result => {
            console.log(result);
            console.log('Request received from client');
            res.redirect("/packages");
        })
        .catch(err => { 
            console.log(err)
        });
 
});

router.delete("/:packageId", (req, res, next) => {
    console.log("packages delting " + req.params.packageId);
    Package.deleteOne({packageId: req.params.packageId })
    .exec()
    .then(result => {
        console.log("deleting");
        res.redirect("/packages");
    })
    .catch(err => {
        console.log("deleting error");
        res.status(500).json({
         
         error:err
     });
 });
 });

 router.post("/search", (req, res, next) => {
    console.log('Request received from client to get a package info');
    const location = req.body.location;
    console.log('Packages relation ', location);
    Package
        .find({placeName : location})
        .exec()
        .then(doc => {
            console.log("from database", doc);
            res.render("viewpackages.ejs", { 
                packageList : doc
            });
            
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err});
        });
        
});


module.exports = router;