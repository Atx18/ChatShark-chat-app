import  bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import generateTokenandSetCookie from "../utils/generateToken.js";



export const signup = async (req, res) => {
  try {
    const { fullName, username, password, confirmPassword, gender } = req.body;
    if (password != confirmPassword) {
      return res.status(400).json({ error: "Password don't match" });
    }

    const user =await User.findOne({username});
    if(user){
        return res.status(400).json({error:"Username alraedu exists"})
    }
    //hash paasword
   const salt =await bcrypt.genSalt(10);
   const hashedPassword=await bcrypt.hash(password,salt);
   //avatar
   const  boyProfilePic='https://i.pravatar.cc/200';
   const girlProfilePic='https://i.pravatar.cc/200';

   const newUser=new User({
      fullName,
      username,
      password:hashedPassword,
      gender,
      profilePic:gender== 'male'? boyProfilePic:girlProfilePic
    })

    if(newUser){
    generateTokenandSetCookie(newUser._id,res);
    await newUser.save();
    res.status(201).json({
        id:newUser._id,
        fullName:newUser.fullName,
        username:newUser.username,
        profilePic:newUser.profilePic
    })
}
 else{
    res.status(400).json({error: " Invalid user "})
 }
  } catch (error) {
     console.log("error in setup controller ");
     res.status(500).json({error: "Internal server error"});
  }
};





export const login = async (req, res) => {
    try{
        const { username, password }=req.body; 
        const user=await User.findOne({username});
        const isPasswordCorrect=await bcrypt.compare(password,user?.password || "");//if user is not found then it is compared with the empty eith  the empty string to prrevent internal serevr sseeor

        if(!user || !isPasswordCorrect) {
            return res.status(400).json({error :"Invalid credentials"});
        }

        generateTokenandSetCookie(user._id,res);

        res.status(200).json({
            id:user._id,
            fullName:user.fullName,
            username:user.username,
            profilePic:user.profilePic
        });
        
    }
    catch(error){
        console.log("error in login controller ");
        res.status(500).json({error: "Internal server error"});
    }
  
};






 
export const logout = async (req, res) => {
   try{
     res.cookie("jwt","",{maxAge: 0});
     res.status(200).json({message:"Logged out successfully"});
   }
   catch(error){
    console.log("error in logout controller ");
    res.status(500).json({error: "Internal server eroor"});
   }
};
