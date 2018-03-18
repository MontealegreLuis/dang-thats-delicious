const express = require('express');
const router = express.Router();

router.get('/', (request, response) => {
    response.send('Hey! It works!');
});

module.exports = router;
