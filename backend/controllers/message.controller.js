import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js"


export  const sendMessage= async (req,res) =>{
  try{
     const  { message }=req.body;
     const  receiverId =req.params.id;
     //sender id
     const senderId=req.user._id;

     let conversation= await Conversation.findOne({
        participants:{$all :[senderId,receiverId]}
     });

     if(!conversation){
        conversation=await Conversation.create({
            participants:[senderId,receiverId],
        })
     }
    

     const newMessage= await Message.create({
        senderId,
        receiverId,
        message,
     })
     
     if(newMessage){
        conversation.messages.push(newMessage._id);
     }
   // socket io functionality
    //  await conversation.save();
    //  await newMessage.save();
    await Promise.all([conversation.save(),newMessage.save()]); ///thsi will run in paralle

      res.status(201).json(newMessage);
  }



  catch(error){
    console.log( "error in sending message controller");
    res.status(500).json({ error: "Internal sever error"})

  }
};


export const getMessages = async(req,res)=>{
    try{
        const  userToChatId =req.params.id;
        //sender id
        const senderId=req.user._id;
        
        let conversation= await Conversation.findOne({
            participants:{$all :[senderId,userToChatId]}
         }).populate("messages"); //not refernece but actual messages ,,,,instead of sending the id it will send the message of particular id


   if(!conversation) return res.status(200).json([]);

   const messages=conversation.messages;



   res.status(200).json(messages);
    }
    catch(error){
        console.log("error in getting message controller");
        res.status(500).json({ error: "Internal sever error"});

    }
};


