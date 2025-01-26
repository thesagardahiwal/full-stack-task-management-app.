const { registerUser, loginUser } = require('../controllers/authController');
const router = require('express').Router();
const { check } = require('express-validator');


router
    .post('/register', [
        check('username').notEmpty().withMessage('Username is required'),
        check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    ], registerUser)


    .post('/login', [
        check('username').notEmpty().withMessage('Username is required'),
        check('password').notEmpty().withMessage('Password is required'),
    ], loginUser);
    

module.exports = router;
    