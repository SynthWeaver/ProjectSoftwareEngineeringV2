class State {

    #session;

    constructor(session) {
        this.#session = session;

        if (new.target === State) {
            throw new TypeError("Cannot construct Abstract instances directly");
        }
    }

    login(){}
    logout(){}

    getSession(){
        return this.#session;
    }
}

export { State }