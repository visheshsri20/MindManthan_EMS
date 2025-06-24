import User from '../models/User.js';
import bcrypt from 'bcrypt';

const changePassword = async (req , res)=>
{
   try {
   const {userId , oldPassword, newPassword} = req.body;  
     //console.log('Received:', { userId, oldPassword, newPassword });
   const user = await User.findById(userId);
   if (!user) {
       return res.status(404).json({ success: false, error: "User not found" });
   }

    const isMatch = await bcrypt.compare(oldPassword, user.password);
   if (!isMatch) {
       return res.status(400).json({ success: false, error: "Old password is incorrect" });
    }
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    const newUser = await User.findByIdAndUpdate({ _id: userId }, { password: hashedNewPassword }, { new: true });
   return res.status(200).json({ success: true, message: "Password changed successfully", user: newUser });
   } catch (error) {
      console.error("Error changing password:", error);
      return res.status(500).json({ success: false, error: "Internal server error" });
   }
}

export {changePassword}