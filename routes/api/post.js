const express = require('express'),
    router = express.Router();





router.get('/', (req, res) => {
    res.status(200).json({ msg: 'THis is post page' })
})




module.exports = router;