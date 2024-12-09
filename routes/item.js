const express = require('express');
const router = express.Router();
const itemController = require('../controller/item');


router.post('/item', itemController.addItem);


router.get('/item', itemController.getItems);


router.put('/item/:itemId', itemController.editItem);


router.delete('/item/:itemId', itemController.deleteItem);


router.put('/item/:itemId/quantity', itemController.updateQuantity);

module.exports = router;
