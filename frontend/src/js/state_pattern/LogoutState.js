import { State } from './State';
import { LoggedInState } from './LoggedInState.js';

class LogoutState extends State {
    constructor(session) {
        super(session);
    }

    login(){
        //set state
        const session = super.getSession();
        const loggedInState = new LoggedInState(session);
        session.setState(loggedInState);
        
        //show logout button
        const loginButton = document.getElementById("login-button");
        loginButton.classList.add("hidden");
        const logoutButton = document.getElementById("logout-button");
        logoutButton.classList.remove("hidden");

        return true;
    }

    logout(){
        alert("Je bent al uitgelogd.");
        return false;
    }
}

export { LogoutState }