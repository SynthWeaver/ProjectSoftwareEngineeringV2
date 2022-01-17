import { LoggedInState } from './state_pattern/LoggedInState.js';
import { LogoutState } from './state_pattern/LogoutState.js';

class Session {

    #state;

    constructor() {
        //create state
        const logoutState = new LogoutState(this);
        
        //set state
        this.setState(logoutState);
    }

    setState(state){
        this.#state = state;
    }

    isLoggedIn(){
        return this.#state instanceof LoggedInState;
    }

    login(){
        return this.#state.login();
    }

    logout(){
        return this.#state.logout();
    }
}

export { Session }