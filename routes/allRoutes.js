//route
const router = require("express").Router();


//homepage
router.get("/", (req, res) => {
    res.send("hello world!");
});


module.exports = router;