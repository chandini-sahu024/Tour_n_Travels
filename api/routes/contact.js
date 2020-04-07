const express = require('express');
const router = express.Router();

router.get("/", (req, res, next) => {
    console.log("Came to contact us page");
    res.render('contact.ejs');
    
});

module.exports = router;