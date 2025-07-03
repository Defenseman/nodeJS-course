// Здесь описываем маршруты связанные с /USERS

const Router = require('../framework/Router');
const { getUsers, createUser } = require('./user-controllers')
const router = new Router();

router.get('/users', getUsers)

router.post('/users', createUser)

module.exports = router;