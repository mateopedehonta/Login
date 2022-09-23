import { container,message,email,name,lastName,age,alias,avatar,divChat } from './selectors.js'
import { socket } from './index.js';
export const sendMessage = (e) => {
  e.preventDefault();
  const newMessage = {
    author: {
      id: email.value,
      name: name.value,
      lastName: lastName.value,
      age: age.value,
      alias: alias.value,
      avatar: avatar.value,
    },
    text: message.value,
    fecha: new Date().toISOString(),
  };
  // console.log(newMessage);
  socket.emit("new-message", newMessage);
  return false;
};

export const renderChat = (chat) => {

  limpiarHTML(divChat);
  chat.forEach((newMessage) => {
    const { author, text, fecha } = newMessage;
    const messageDiv = document.createElement("div");
    messageDiv.innerHTML = `
              <div>
                  <strong style="color: blue;" >${author.id}</strong>[
                  <span style="color: brown;">${fecha}</span>]:
                  <em style="color: green;font-style: italic;">${text}</em>
              </div>
          `;
    divChat.appendChild(messageDiv);
  });
};

export const logout = (e)=>{
  e.preventDefault()
  limpiarHTML(container)
  const div = document.createElement("div");
    div.innerHTML = `<h1> Hasta luego </h1>`;
    container.appendChild(div);
    setTimeout(()=> window.location.replace("http://localhost:3000/logout"),3000)
}


const limpiarHTML = (element) => {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
};
