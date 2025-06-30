const http = require('http');

const PORT = process.env.PORT || 5000;

const server = http.createServer((req, res) => {        // работа со стримами req, res
    // res.writeHead(200, {
    //     'Content-type': 'text/html; charset=utf-8'   // Чтобы браузер понял кирилицу и html разметку
    // })

    res.writeHead(200, {
        "content-type": "application/json"  // Чтобы браузер понял что сервер отправил данные в формате JSON
    })
    if(req.url === '/users') {
        return res.end(JSON.stringify([     // Так как стрин работает по умолчанию с буфером или со строкой нужно привести данные к строке
            {id: 1, name: 'Spongebob'},
            {id: 2, name: 'Patrik'}
        ]));
    }
    if(req.url === '/posts') {
        return res.end('POSTS')
    }
    res.end(req.url)    // выведет всё что после слэша "/"
    // res.end('<h1>Hello<button>Press me</button></h1>')
    // res.end('Server is working now!. Сервер работает сейчас!'); // Чтобы пользователь мог получить ответ от сервера нужно закрыть стрим и передать данные  
})

server.listen(PORT, () => console.log(`Server started on PORT ${PORT}`)) // Чтобы начал слушать входящие соединения 
