import chatDB from '../models/chat.js'

const socketsEventsChat = (io) => {
  io.on("connection",  (socket) => {

    const emit =async()=>{
      const chat = await chatDB.find({})
      // console.log(c)
      // const chat = await DAO.chatDB.getAll()
      io.sockets.emit('chat',chat)
      socket.emit('chat',chat)
    }

    console.log(`New connection ID: ${socket.id}`);

    emit()

    socket.on("new-message", async (newMessage) => {
      await DAO.chatDB.addObject(newMessage);
      emit()
    });

  });
};
export default socketsEventsChat;
