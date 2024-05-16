const express = require('express')
const router = express.Router()
const leaderboardController = require('../controllers/leaderboardController')

router.post('/saveresult',leaderboardController.saveResult)



module.exports=router