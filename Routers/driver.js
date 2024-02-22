const express = require('express');
const Controller = require('../Controllers/Controller');
const router = express.Router();

router.get('/',Controller.showDriverPage);

module.exports = router;