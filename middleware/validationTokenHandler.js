const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');

const validateToken = asyncHandler(async (req, res, next) => {
    let token;
    let authHeader = req.headers.authorization || req.headers.Authorization; // Case-insensitive

    if (authHeader && authHeader.startsWith("Bearer ")) {
        token = authHeader.split(" ")[1];
    }

    if (!token) {
        res.status(401);
        throw new Error("User is not Authorized");
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            res.status(401);
            throw new Error("User is not Authorized");
        } else {
            req.user = decoded.user; // Save the decoded payload to the request object
            next(); // Pass control to the next middleware
        }
    });
});

module.exports = validateToken;
