//Checks if the user is logged in (if they are not false is returned)
//  if they are logged in retrieve current user based on ID
//  And checks whether the user is of type admin
async function getCurrentUserById() {
    let response = await fetch("/api/user") 
    if( await response != false){
        let userType = await response.json()
        return await userType.user.admin
    } else {
        return await response
    }
}

export { getCurrentUserById }