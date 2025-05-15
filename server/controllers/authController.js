import User from '../models/User.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const login = async(requestAnimationFrame, res)=>
{
try {
  const {email,password} = requestAnimationFrame.body;
  const user = await User.findOne({email})
  if(!user)
  {
    res.status(404).json({success:false, error:"User not found"})
  }
 const isMatch = await bcrypt.compare(password, user.password)
 if(!isMatch)
 {
    res.status(404).json({succes: false, error:"Wrong Password"})
 }

 const token = jwt.sign({_id:user._id,role:user.role},process.env.JWT_KEY,{expiresIn:"10d"})
 res.status(200).json({success:true, token, user:{_id:user._id,name:user.name,role:user.role}})
}
catch(err){
    console.log(err);
    res.status(err).json({message:'Server error'});
}
}

const verify = (req,res)=>{
  return res.status(200).json({success:true ,user: req.user});
}

export {login,verify}