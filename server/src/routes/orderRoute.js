const { createOrder, listOrders } = require('../controllers/orderController');
const { authenticateToken } = require('../middlewares/auth');

const router = require('express').Router();


router
    .post('/order', authenticateToken, createOrder)

    .get('/orders', authenticateToken, listOrders)


module.exports = router;