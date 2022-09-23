import mongoose from 'mongoose'

export default mongoose.model('users-chat',{
    username:{ type: String, require: true},
      password:{ type: String, require: true},
      email:{ type: String, require: true},
})