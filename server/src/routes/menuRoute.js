const { listMenu, createMenuItem, editMenuItem, deleteMenuItem } = require('../controllers/menuController');
const { authenticateToken } = require('../middlewares/auth');
const router = require('express').Router();


router
    .get('/menu', listMenu)

    .post('/menu', authenticateToken, createMenuItem)
    
    .put('/menu/:id', authenticateToken, editMenuItem)

    .delete('/menu/:id', authenticateToken, deleteMenuItem)

module.exports = router;