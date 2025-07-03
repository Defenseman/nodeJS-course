// Здесь создаём сервер и обрабатываем middleware и роуты.

const http = require('http');
const EventEmitter = require('events'); // На соответсвующий запрос необходимо генерировать соответсвующее событие 
                                        // (нужен для кастомной маршрутизации (типа роутов).)
module.exports = class Application {
    constructor() {
        this.emitter = new EventEmitter();
        this.server = this._createServer();
        this.midlewares = []; // сюда сохраняем все midlewares
    }

    use(midleware) {
        this.midlewares.push(midleware);
    }

    listen(port, callback) {
        this.server.listen(port, callback); // Запускаем сервер
    }

    addRouter(router) {             // Добавление роутера: 1️⃣ Получили роутер проетерировались по каждому эндпоинту. 
        Object.keys(router.endpoints).forEach(path => { // 2️⃣ Для каждого эндпоинта создали событие
            const endpoint = router.endpoints[path];    // 3️⃣ И это событие генерируем в _createServer()
            Object.keys(endpoint).forEach(method => {
                this.emitter.on(this._getRouteMask(path, method), (req, res) => {
                    const handler = endpoint[method];
                    handler(req, res);
                });
            })
        })
    }

    _createServer() {
        return http.createServer((req, res) => {
            let body = "";
            req.on('data', (chunk) => {
                body += chunk;
            })
            req.on('end', () => {
                if(body) {
                    req.body = JSON.parse(body);
                }
                this.midlewares.forEach(midleware => midleware(req, res)); // вызываем перед генерацией события
                const emitted = this.emitter.emit(this._getRouteMask(req.pathname, req.method), req, res); // генерируем событие нам возвр-ся true или false
                    if(!emitted) { // Если обратились по не существующему эндпоинту то закрываем стрим(чтобы он бесконечно не грузился)
                        res.end();
                    }
            })
        })
    }

    _getRouteMask(path, method) {
        return `[${path}]:[${method}]`
    }
}