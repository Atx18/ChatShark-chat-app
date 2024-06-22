import User from "../models/user.model.js";


export const getUsersforSidebar=async(req,res)=>{
    try{
        const loggedInUserId=req.user._id;

        const allUsers=await User.find({_id: { $ne: loggedInUserId}}).select("-password"); // finds all users except the logged in user ne is equal to not equal to
     
        return res.status(200).json(allUsers);
    }
    catch(error){
        console.log("error in getuser for sidebar controller ");
        res.status(500).json({error: "Internal server error"});
    }

}
