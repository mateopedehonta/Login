import { btnChat , btnLogout} from '../selectors.js'
import {sendMessage,logout} from './../fuctions.js'
class App {
    constructor() {
        this.initApp();
    }
    initApp() {
        // Eventos
        eventListeners();
        function eventListeners() {
            btnLogout.addEventListener('click',logout)
            btnChat.addEventListener('click',sendMessage)
        }

    }
}

export default App;