module.exports = class Router {
    constructor() {
        this.endpoints = {};
    }

    request(method = 'GET', path, handler ) {
        if(!this.endpoints[path]) {
            this.endpoints[path] = {};
        }
        // /users [GET, POST, PUT] /posts [GET, POST, PUT, DELETE]
        const endpoint = this.endpoints[path]

        if(endpoint[method]) {
            throw new Error(`[${method}] по адрессу ${path} уже существует!`);
        }
        endpoint[method] = handler;

    }
    get(path, handler) {  // Эти методы это оболочка для вызова request()
        this.request('GET', path, handler);
    }
    post(path, handler) {
        this.request('POST', path, handler);
    }
    put(path, handler) {
        this.request('PUT', path, handler);
    }
    delete(path, handler) {
        this.request('DELETE', path, handler);
    }
}