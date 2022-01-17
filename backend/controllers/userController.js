const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);

const {
    sequelize,
    User
} = require('../models')


async function createUser(email, password, admin) {
    try {
        if(!email || !password || admin == null){ 
            return;
        }

        // Store hash in your password DB.        
        const passwordHash = bcrypt.hashSync(password, salt);

        await User.sync({ force: false });
        const user = await User.create({
            passwordHash,
            email,
            admin,
        })
        return user
    } catch (error) {
        console.log(error);
    }
}

async function updateUser(oldEmail, newEmail, oldPassword, newPassword) {
    try {
        if(!oldEmail || !newEmail || !oldPassword || !newPassword){ 
            return;
        }

        // Store hash in your password DB.        
        const oldPasswordHash = bcrypt.hashSync(oldPassword, salt);
        const newPasswordHash = bcrypt.hashSync(newPassword, salt);

        let user = await findUserByMail(oldEmail);

        if(!user){
            return;
        }

        const hash = user.passwordHash;
        const passwordCorrect = bcrypt.compareSync(oldPassword, hash);

        if(!passwordCorrect){
            return;
        }

        await User.sync({ force: false });
        user = await User.update({
            passwordHash: newPasswordHash,
            email: newEmail,
        },{ where: { email: oldEmail }})

        console.log(user);
        
        return user
    } catch (error) {
        console.log(error);
    }
}

async function findUserById(id) {
    const user = await User.findOne({
        where: {
            id: id
        }
    });
     
    return user;
 };

async function findUserByMail(email) {
    const user = await User.findOne({
        where: {
            email: email
        }
    });
    
    return user;
};

//todo: make it more clean
async function validateUser(email, password) {
    if(!email || !password){
        return null;
    }

    const user = await findUserByMail(email);

    if(!user){
        return null;
    }

    const hash = user.passwordHash;
    const login = bcrypt.compareSync(password, hash);

    if(login){
        return user;
    }
}

async function getAllAdmins() {
    const adminList = await User.findAll({
        where: {
            admin: 1
        }
    });

    return adminList;
};

module.exports = { 
    createUser,
    validateUser,
    findUserByMail,
    findUserById,
    updateUser,
    getAllAdmins,
};