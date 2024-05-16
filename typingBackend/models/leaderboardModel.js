
const db = require('../config/dbconfig')


const saveResult = (rank,username,wpm,accuracy,time,punctuation,wordlist,numbers,callback) => {
    
    try{
        const created_at = new Date().toISOString();
        const query =`INSERT INTO leaderboard (rank,username, wpm, accuracy, time, punctuation, wordlist, numbers,created_at)
        VALUES (?,?, ?, ?, ?, ?, ?, ?,?);`

        db.query(query,[rank,username,wpm,accuracy,time,punctuation,wordlist,numbers,created_at],(err,result)=>{
            if(err){
                callback(err,null);
                return;
            }
            callback(null,{message:"saved successfully"})
        })
    }catch(err){
        callback(err,null);
    }
}

module.exports={saveResult}