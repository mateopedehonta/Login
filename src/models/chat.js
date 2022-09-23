import mongoose from 'mongoose'

export default mongoose.model('chats',{
    author: {
        id: { type: String, required: true },
        name: { type: String, required: true },
        lastName: { type: String, required: true },
        age: { type: Number, required: true },
        alias: { type: String, required: true },
        avatar: { type: String, required: true },
      },
      text: { type: String, required: true },
      fecha: { type: String, required: true },
})