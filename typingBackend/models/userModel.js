const db = require('../config/dbconfig');
const bcrypt = require('bcrypt');
require('dotenv').config();
const jwt = require('jsonwebtoken')

const secret_key = process.env.SECRET_KEY
// console.log("Process.env: ",process.env.SECRET_KEY);


let counter = 0;

const generateUniqueId = () => { 
    const timestamp = Date.now();
    const randomNum = Math.floor(Math.random() * 1000);
    counter++;
    const uniqueId = `${timestamp}${randomNum}${counter}`;
    return uniqueId;
}

const getUserByEmail = (email, callback) => {
    const query = 'select * from user where email = ? limit 1';
    db.query(query, [email], (err, result) => {
        if (err) {
            callback(err, null);
            return;
        }
        callback(null, result);
    });
}

const signup = (username, email, password, callback) => {
    try {
        const userId = generateUniqueId();
        const createdAt = new Date().toISOString();
    
        getUserByEmail(email, (err, existingUser) => {
            if (err) {
                callback(err, null);
                return;
            }
            if (existingUser.length > 0) {
                const error = new Error("Email is already signed in");
                callback(error, null);
                return;
            }
            const query = 'INSERT INTO user (id, username, email, password, created_at) VALUES (?, ?, ?, ?, ?)';
    
            db.query(query, [userId, username, email, password, createdAt], (err, res) => {
                if (err) {
                    callback(err, null);
                    return;
                }
                callback(null, res);
            });
        });
    } catch (err) {
        callback(err, null);
    }
}

const login = (email, password, callback) => {
    try {
        const query = 'select * from user where email = ?';
    
        db.query(query, [email], (err, result) => {
            if (err) {
                callback(err, null);
                return;
            }
            if (result.length === 0) {
                const error = new Error("User not found");
                callback(error, null);
                return;
            }
            const user = result[0];
    
            bcrypt.compare(password, user.password, (err, passwordMatch) => {
                if (err) {
                    callback(err, null);
                    return;
                }
                if (!passwordMatch) {
                    const error = new Error("Wrong Password");
                    callback(error, null);
                    return;
                }
                const token = jwt.sign({userId:user.id , userEmail:user.email},secret_key);
                const response = { message: "Login Successful", token:token ,username:user.username};
                callback(null, response);
            });
        });
    } catch (err) {
        callback(err, null);
    }
}

module.exports = {generateUniqueId, signup, login };
