// const asyncHandler = require('express-async-handler');
// const jwt = require('jsonwebtoken');

// const validateToken = asyncHandler(async (req, res, next) => {
//     let token;
//     const authHeader = req.headers.authorization || req.headers.Authorization; // Case-insensitive

//     if (authHeader && authHeader.startsWith("Bearer ")) {
//         token = authHeader.split(" ")[1];   
//     } else {
//         res.status(401);
//         throw new Error("Authorization header is missing or malformed");
//     }

//     jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
//         if (err) {
//             res.status(401);
//             throw new Error("Invalid token");
//         }

//         req.user = decoded.data; // Save the decoded payload to the request object
//         next(); // Pass control to the next middleware
//     });
// });

// module.exports = validateToken;
