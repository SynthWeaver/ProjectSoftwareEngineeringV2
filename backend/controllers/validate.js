function string(string){
    
    //check if string is not empty
    if(!string){
        return false;
    }

    //check if string has bad characters
    const regex = /^[a-zA-Z0-9 ]*$/;
    if(!regex.test(string)){
        return false;
    }

    //string is safe
    return true;
}

module.exports = {
    string
};