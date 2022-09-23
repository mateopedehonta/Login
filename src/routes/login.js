import { Router } from "express";
import passport from 'passport'
import { loginStrategy, registeStrategy} from './config/configSession.js'
import passportLocal from 'passport-local'
import { getHomeMiddleware, getLoginMiddleware } from "./middleware/login.js";
import { getFailLogin, getFailRegister, getHome, getLogin, getLogout, getRegister, postLogin, postRegister } from "./controllers/controllersLogin.js";
const localStrategy = passportLocal.Strategy

const login = Router();

passport.use('login',loginStrategy)

passport.use('register',registeStrategy)


login.get("/",getHomeMiddleware,getHome);

login
  .route("/login")
  .get(getLoginMiddleware,getLogin)
  .post(passport.authenticate('login',{ failureRedirect: "/faillogin/?alert=Invalid credentials" }),postLogin);

login.get("/logout",getLogout);

login
  .route('/register')
  .get(getLoginMiddleware, getRegister)
  .post(passport.authenticate('register',{ failureRedirect: "/failregister/?alert=Invalid credentials" }),
  postRegister)

login.get('/faillogin',getFailLogin)
login.get('/failregister',getFailRegister)

export default login;
