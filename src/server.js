import express from "express";
import session from "express-session";
import cookieParser from "cookie-parser";
import MongoStore from "connect-mongo";
import http from "http";
import { Server } from "socket.io";
import path from "path";
import socketsEventsChat from "./sockets/chat.socket.js";
import __dirname from "./utils.js";
import login from "./routes/login.js";
import api from './routes/api.js'
import { config } from "dotenv";
import passport from "passport";
import mongoose from "mongoose";
import parseArgs from 'minimist'

//INITIALIZATIONS
config()
const HttpServer = http.Server;
const IOserver = Server;
const app = express();
const httpServer = new HttpServer(app);
const io = new IOserver(httpServer);
const args = parseArgs(process.argv.slice(2),{ alias:{ p:'port' } })

//SETTINGS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./views"));
app.set("port", args.port || 8080);
const PORT = app.get("port");
const mongoConf = { useNewUrlParser: true, useUnifiedTopology: true };

//STATIC FILES
app.use("/static", express.static(__dirname + "/public"));

//MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  session({
    store: MongoStore.create({
      mongoUrl:process.env.MONGO_URI,
      mongoConf,
    }),
    cookie:{
      httpOnly:false,
      secure:false,
      maxAge: 10000
    },
    secret: "coderHouse",
    resave: true,
    saveUninitialized: false,
    rolling: true,
  })
);
app.use(passport.initialize())
app.use(passport.session())

//ROUTES
app.use("/", login);
app.use('/api',api)
//info
app.get('/info',(req,res)=>{
  const info = {
    argumento_de_entrada: args ,
    nombre_de_plataforma:process.platform,
    version_de_node:process.version,
    memoria_total_reservada:process.memoryUsage().rss,
    path_de_ejecucion:process.execPath,
    process_id:process.pid,
    carpeta_del_proyecto:process.cwd(),
  }
  res.send({info})
})


socketsEventsChat(io);


mongoose.connect(process.env.MONGO_URI,{
  useNewUrlParser: true,
  useUnifiedTopology: true
},()=>{
  console.log('database conect')
  httpServer.listen(PORT, (err) => {
    if (err) {
      console.log(`server error: ${err}`);
    }
    console.log(`Server listen PORT : ${PORT}`);
  });
});

