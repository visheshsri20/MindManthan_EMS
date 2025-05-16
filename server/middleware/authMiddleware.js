import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const verifyUser = async (req, res, next) => {
    try {
        console.log('Authorization Header:', req.headers.authorization);

        const token = req.headers.authorization?.split(' ')[1];
        console.log('Extracted Token:', token); 

        if (!token) {
            return res.status(401).json({ success: false, error: "Token not found" });
        }

        const decoded = jwt.verify(token, process.env.JWT_KEY);
        console.log('Decoded Token:', decoded);

        
        if (!decoded) {
            return res.status(401).json({ success: false, error: "Token not valid" });
        }

        const user = await User.findById(decoded._id).select('-password');
        if (!user) {
            return res.status(404).json({ success: false, error: "User not found" });
        }

        req.user = user;
        next();
    } catch (error) {
        console.error('Error in verifyUser middleware:', error);
        return res.status(500).json({ success: false, error: "Server error" });
    }
};

export default verifyUser;