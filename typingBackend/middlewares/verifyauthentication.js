const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
    const token = req.headers['authorization']?.split(' ')[1];
    // console.log("I am here");
    if (!token) {
        return res.sendStatus(401);
    }

    try {
        const decoded = jwt.decode(token);
        // console.log(decoded+" "+decoded.exp);
        const currentTime = Math.floor(Date.now() / 1000);

        if (decoded.exp <= currentTime) {
            return res.sendStatus(401);
        }

        jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
            if (err) {  
                return res.sendStatus(403);
            }
            req.user = user;
            next();
        });
    } catch (error) {
        console.error('Error decoding token:', error);
        return res.sendStatus(403);
    }
}

module.exports = authenticateToken;
