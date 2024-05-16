
const db = require('../config/dbconfig')
const leaderboardModel = require('../models/leaderboardModel')


const saveResult = (req,resp,next) => {
    const {rank,username,wpm,accuracy,time,punctuation,wordlist,numbers} = req.body

    try{
        leaderboardModel.saveResult(rank,username,wpm,accuracy,time,punctuation,numbers,wordlist,(err,result)=>{
            if(err){
                console.error(err);
                resp.status(500).json({error:"An error occured during result save"})
                return;
            }
            resp.status(200).json(result)
        })
    }catch(err){
        console.log(err);
    }
}

module.exports={
    saveResult
}