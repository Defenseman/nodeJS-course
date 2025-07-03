// const users = [
//     {id: 1, name: 'Spongebob'},
//     {id: 2, name: 'Patrik'},
//     {id: 3, name: 'Squidward'},
// ]

const User = require('./user-model');

const getUsers = async (req, res) => {
    let users;    
    if(req.params.id) {
        users = await User.findById(req.params.id);
    } else {
        users = await User.find();
    }
    res.send(users);
}

const createUser = async (req, res) => {
    const user = await User.create(req.body)
    res.send(user);        
}

module.exports = {
    getUsers, 
    createUser,
}