const Emitter = require('events'); // Позволяет создавать и подписываться на события

const emitter = new Emitter(); // создали экземпляр класса

const callback = (frst, scnd, thrd) => {
    console.log(`Первый аргумент ${frst}`);
    console.log(`Второй аргумент ${scnd}`);
}

// emitter.on('message', callback) // .on - подписываемся на событие
emitter.once('message', callback) // .once - подписываемся на событие но позволяем генерировать событие лишь 1 раз


emitter.emit('message') // .emit - позволяет генерировать событие сколько угодно раз (если не .once)
emitter.emit('message')
emitter.emit('message')
emitter.emit('message')

emitter.removeAllListeners() // Удаляет все слушатели
emitter.removeListener('message', callback) // Удаляет какой-то конкретный слушатель 

// const MESSAGE = process.env.message || '';

// if(MESSAGE) {
//     emitter.emit('message', MESSAGE, 'some text')  // .emit - генерирует событие
// } else {
//     emitter.emit('message', 'Вы не указали сообщение😞')
// }





