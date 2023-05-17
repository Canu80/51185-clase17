import chatsModel from "./models/chats.models.js"

export default class ChatsManagerMongo {

  // Recibo los chats
  getChats = async () => {
    const chats = await chatsModel.find();
    return chats;
  };

  // Agregamos un chat
  addChat = async (data) => {
    const chats = await this.getChats();

    const newChat = {
        user: data.user,
        message: data.message
    };
    chats.push(newChat);
    try {
        await chatsModel.create(chats);
        return "Mensaje agregado";
    } catch (error) {
        return error;
    }
  };  
};