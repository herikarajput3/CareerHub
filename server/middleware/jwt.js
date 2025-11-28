const jwt = require('jsonwebtoken')

const jwtAuthMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'No token provided' });
    }

    const token = req.headers.authorization.split(' ')[1];

    try {

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();

    } catch (error) {
        res.status(401).json({ message: 'Invalid token' });
    }

}

const generateToken = (user) => {
    const payload = {
        id: user._id, 
        name: user.name,
        email: user.email,
        role: user.role,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE || '1d' });
    
    return token;
}

module.exports = { jwtAuthMiddleware, generateToken }