const express = require('express');
const Controller = require('../Controllers/Controller');
const router = express.Router();

router.get('/:id', Controller.showDriverPage);
router.get('/:id/order/:UserId',Controller.findCustomer)
router.get('/:id/profile/add', Controller.addDriverProfile);
router.post('/:id/profile/add', Controller.createDriverProfile);
router.get('/:id/profile/edit', Controller.editDriverProfile);
router.post('/:id/profile/edit', Controller.updateDriverProfile);
router.get('/:id/profile/delete', Controller.deleteDriverAccount);

module.exports = router;