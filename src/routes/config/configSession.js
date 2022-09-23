import bcrypt from 'bcrypt'
import passport from 'passport'
import passportLocal from 'passport-local'
import userDB from '../../models/user.js'
const localStrategy = passportLocal.Strategy

passport.serializeUser((user, done) => {
    done(null, user._id);
  });
  passport.deserializeUser(async(id, done) => {
    userDB.findById(id, done);
  });




const createHash=(password)=>{
  return bcrypt.hashSync(password,bcrypt.genSaltSync(10),null)
}
const isValidPassword = (reqPassword,hashedPassword)=>{
    return bcrypt.compareSync(reqPassword,hashedPassword)
}


export const registeStrategy = new localStrategy(
  { passReqToCallback:true },
  (req,username,password,done)=>{
    userDB.findOne({username },(err,user)=>{
      if(err){
        console.log('error in register')
        return done(err)
      }
      if(user){
        console.log('User already exists')
        return done(null,false)
      }
      const newUser = {
        username:username,
        password: createHash(password),
        email: req.body.email,
      }
      userDB.create(newUser,(err,userWithId)=>{
        if(err){
          console.log('Error in saving user '+err)
          return done(err)
        }
        console.log(user)
        console.log('User registration succesful')
        return done(null,userWithId)
      })
    })
  }

)

export const loginStrategy = new localStrategy(
    async(username,password,done)=>{
        const user = await userDB.findOne({username})
        if(!user || !isValidPassword(password,user.password)){
            return done(null,false)
        }
        return done(null,user)
    }
)
