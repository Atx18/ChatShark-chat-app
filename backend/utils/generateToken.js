import jwt from "jsonwebtoken" 
 
const generateTokenandSetCookie = ( userId , res )=>{
   const token =jwt.sign({ userId },process.env.JWT_SECRET,{
    expiresIn:'15d',
   })
   res.cookie("jwt",token,{// storing the jwt formed during login /signup page in the form of cookie 
    maxAge:15*24*60*60*1000, //format of miliiseconds
    httpOnly:true,//prevent XSS attcks cross-site scripting attacks ,javascript cannot access it
    sameSite:"strict",//CSRF ATTCKS cross site
    secure:process.env.NODE_ENV !=="development"
    
   }) ;

};
export default generateTokenandSetCookie;