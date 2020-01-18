const express = require('express');
// const { body } = require('express-validator');

const adminController = require('../controllers/admin');

const router = express.Router();

//  /admin/
router.get('/', adminController.getAdminInfo);


module.exports = router;
