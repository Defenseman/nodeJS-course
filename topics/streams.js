//Stream types

//1️⃣ Readable - чтение
//2️⃣ Writable - запись
//3️⃣ Duplex - Для чтения и записи
//4️⃣ Transform - Такойде как Duplex, но может изменить данные по мере чтения

const fs = require('fs');
const path = require('path');

// fs.readFile(path.resolve(__dirname, 'test.txt'), (err, data) => { // считали весь
//     if(err) {
//         console.log(err);
//     }
//     console.log(data) // целиком файл весит 308814 bytes (308kb)
// })

const stream = fs.createReadStream(path.resolve(__dirname, 'test.txt')) // Разбили на стримы, можем так же указать кодировку и т.д {encoding: 'utf-8'}

stream.on('data', (chunk) => { // Событие 'data' - позволяет считывать данные, chunk - кусочек кода 
    console.log(chunk)  // каждый chunk по умолчанию 65486 bytes (64kb)
})

stream.on('open', () => console.log('Начали читать!'));     // Есть множество событий 
stream.on('end', () => console.log('Закончили читать!'));   // Порядок написания не важен
stream.on('error', (err) => console.log(err.message));      // Важно обрабатывать ошибки чтобы не упало NodeJS приложение

//=================================================================

const stream2 = fs.createWriteStream(path.resolve(__dirname, 'test2.txt'));
for(let i = 0; i <= 20; i++) {
    stream2.write(`String #${i}\n`);
}
stream2.end()   // writable stream - нужно завершать вручную
stream.close()  // можно закрыть по разному end, close, destroy 
stream.destroy()

// При работе с http сервером нам лоступны 2 объекта: res, req и они оба являются стримами

const http = require('http');

http.createServer((res, req) => {
    // res - readable stream
    // req - writable stream
    const stream = fs.createReadStream(path.resolve(__dirname, 'test.txt'));

// 👇🏻не успеет отправить информации пользователю так как сетевое подключение медленне чем чтение файла 
    stream.on('data', chunk => res.write(chunk));
    stream.on('data', chunk => res.end());

// Чтобы синхронизировать нужен (readable не начинает читать новую порцию данных пока writable не законцил писать предыдущую)
    stream.pipe(res)
})