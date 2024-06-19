import mongoose from 'mongoose';

const messageSchema=new mongoose.Schema({
    senderId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    receiverId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    message:{
        type:String,
        default:"",
    }

},{ timestamps: true });//createdAt,upadted mongoose willa automatically create a createdAt  message.createdAt:


const Message=mongoose.model("Message",messageSchema);
export default Message;
