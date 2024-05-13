
const db = require('../config/dbconfig');
const bcrypt = require('bcrypt');
const userModel = require('../models/userModel')




const signup = async (req, res, next) => {
    const { username, email, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        userModel.signup(username,email,hashedPassword,(err,result)=>{
            if(err){
                console.error(err);
                res.status(500).json({error:"An error occured durin g signup"})
                return;
            }
            res.status(200).json({message:"Signup successfull"})
        })
    } catch (error) {
        console.error('Error in signup:', error); 
        res.status(500).json({ error: 'An error occurred while signing up.' });
    }
};


const login = async(req,res,next) => {
    const {email,password} = req.body;

    try{
        userModel.login(email,password,(err,result)=>{
            if(err){
                console.error(err);
                res.status(500).json({error:"An error occured during login"})
                return;
            }
            
            res.status(200).json(result)
        })

    }catch(err){
        console.error("Error in login: ",err);
        res.status(500).json({error:"Error occured while log in"})    
    }
}
module.exports = { signup,login };
