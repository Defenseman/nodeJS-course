// Здесь описываем маршруты связанные с /USERS

const Router = require('../framework/Router');

const router = new Router();

const users = [
    {id: 1, name: 'Spongebob'},
    {id: 2, name: 'Patrik'},
    {id: 3, name: 'Squidward'},
]

router.get('/users', (req, res) => {
    res.send(users);
})

router.post('/users', (req, res) => {
    const user = req.body;
    users.push(user);
    res.send(users);        
})

module.exports = router;