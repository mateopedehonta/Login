import App from './modules/app.js'
import { renderChat } from './fuctions.js'
export const socket = io.connect();

const app = new App

socket.on("chat", (chat) => renderChat(chat));
