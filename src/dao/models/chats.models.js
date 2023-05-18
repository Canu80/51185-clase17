import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const chatCollection = "chat";
const chatSchema = new mongoose.Schema({
    user: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    } 
  },{ collection: "Messages" });

chatSchema.plugin(mongoosePaginate);
const chatsModel = mongoose.model(chatCollection, chatSchema);

export default chatsModel;