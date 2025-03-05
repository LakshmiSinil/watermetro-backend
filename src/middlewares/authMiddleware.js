const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
    const authHeader = req.header('Authorization');
    const token = authHeader.split(" ")[1]
    if (!token) return res.status(401).json({ message: 'Access Denied' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(400).json({ message: 'Invalid Token' });
    }
};
// middlewares/authMiddleware.js

function checkRole(allowedRoles = []) {
    return (req, res, next) => {
        const user = req.user;  // assuming `req.user` is set after authentication (like JWT auth)

        if (!allowedRoles.includes(user.role)) {
            return res.status(403).json({ message: "Forbidden. You do not have access to this resource." });
        }

        next();
    };
}

const adminOnly = checkRole(['admin']);
const adminOrEmployee = checkRole(['admin', 'employee']);




module.exports = {
    adminOnly,
    adminOrEmployee,
    authenticate
};
