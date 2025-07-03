const users = [
    {id: 1, name: 'Spongebob'},
    {id: 2, name: 'Patrik'},
    {id: 3, name: 'Squidward'},
]

const getUsers = (req, res) => {
    if(req.params.id) {
        return res.send(users.filter(user => user.id == req.params.id))
    }
    res.send(users);
}

const createUser = (req, res) => {
    const user = req.body;
    users.push(user);
    res.send(users);        
}

module.exports = {
    getUsers, 
    createUser,
}