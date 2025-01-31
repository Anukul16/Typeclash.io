const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')
const authenticateToken = require('../middlewares/verifyauthentication')

router.use(express.json())

router.post('/signup',userController.signup)
router.post('/login',userController.login)


module.exports=router 