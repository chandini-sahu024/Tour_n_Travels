const express = require('express');
const router = express.Router();

router.get("/", (req, res, next) => {
    console.log("Came to about us page");
    res.render('about.ejs');
    
});

module.exports = router;