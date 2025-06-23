import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, error: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, error: 'Wrong password' });
        }
       
        
        const token = jwt.sign(
            { _id: user._id,
              role: user.role
             },
            process.env.JWT_KEY,
            { expiresIn: '10d' }
        );
        // console.log('Token:', token);
        // console.log('User:', user);
        

        res.status(200).json({
            success: true,
            token,
            user: { _id: user._id, 
                name: user.name, 
                role: user.role
             },
        });
    } catch (err) {
        console.log(process.env.JWT_KEY ,'JWT_KEY');
        console.error(err);
        return res.status(500).json({ message: 'Server error', error: err.message });
    }
};

const verify = (req, res) => {
    // console.log('Verify route hit');
    // console.log('User:', req.user);
    return res.status(200).json({ success: true, user: req.user });
};

export { verify };
export { login };
