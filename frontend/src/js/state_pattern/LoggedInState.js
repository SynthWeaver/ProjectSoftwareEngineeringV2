import { State } from './State';
import { LogoutState } from './LogoutState.js';

class LoggedInState extends State {
    constructor(session) {
        super(session);
    }

    login(){
        alert("Je bent al ingelogd.");
        return false;
    }

    logout(){
        //set state
        const session = super.getSession();
        const logoutState = new LogoutState(session);
        session.setState(logoutState);

        //show login button
        const logoutButton = document.getElementById("logout-button");
        logoutButton.classList.add("hidden");
        const loginButton = document.getElementById("login-button");
        loginButton.classList.remove("hidden");
        
        return true;
    }
}

export { LoggedInState }