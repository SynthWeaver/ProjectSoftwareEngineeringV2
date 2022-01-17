// Video for admin view https://www.youtube.com/watch?v=jI4K7L-LI58
let {ROLE} = require('')

function canViewCreateProduct(){
    return{
        user.role == ROLE.ADMIN
        // If this is the orderpage from the specific user, or the admin
        orderpage.userID == userID
    }

}