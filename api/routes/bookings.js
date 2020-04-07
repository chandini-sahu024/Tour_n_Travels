const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Booking =  require('../models/booking');
const Package = require('../models/package');


router.get("/", (req, res, next) => {
    Order.find()
    .exec()
    .then(docs =>{
        res.status(200).json({
            count: docs.length,
            orders: docs.map(doc =>{
                return {
                    _id: doc._id,
                    product: doc.product,
                    quantity: doc.quantity,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/orders' + doc._id
                    }
                }
            })
            
        });
    })
    .catch(err => {
        res.status(500).json({
            error: err
        });
    });
});


    
router.get("/:orderId", (req, res, next) => {
    Order.findById(req.params.orderId)
    .exec()
    .then(order => {
        res.status(200).json({
            order: order,
            request: {
                type: 'GET',
                url: 'http://localhost:3000/orders'
            }
        });
    })
    .catch(err => {
        res.status(500).json({
            error:err
        });
    });
});
router.delete("/:orderId", (req, res, next) => {
   console.log("order deting" + req.params.orderId);
   Order.deleteOne({_id: req.params.orderId })
   .exec()
   .then(result => {
    res.status(200).json({
       message: "Order deleted",
        request: {
            type: 'POST',
            url: 'http://localhost:3000/orders',
            body: {productId: "ID", quantity: "Number"}

        }
    });
   })
   .catch(err => {
    res.status(500).json({
        error:err
    });
});
});


router.post("/:packageId", (req, res, next) => {
    pkgId = req.params.packageId;
    console.log("bookings adding for this package " + req.params.packageId);
    
    Package
        .find({packageId : pkgId})
        .exec()
        .then(doc => {
            console.log("from database", doc);
            console.log('Booking complete');
            res.status(200).json({message: "booking done without asking user details ...."});
        })
        .catch(err => {
            console.log(err);
            console.log("Invalid package id", pkgId);
            res.status(500).json({error: err});
        });
 
});



module.exports = router;