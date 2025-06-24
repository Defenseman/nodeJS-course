const dotenv = require('dotenv'); // Импортируем модуль

console.log(process.pid)

dotenv.config() // Нужно достать конфиг чтобы увидеть PORT и NODE_ENV

// while(true) {} // Бесконечный цикл который мы можем отследить в Диспетчере задач 

console.log(process.env.PORT)
console.log(process.env.NODE_ENV)

console.log(process.argv) // Чтобы передавать аргументы (команды) при запуске файла

if (Math.random() > 0.5) {
    while(true) {}
} else {
    console.log("Выполнение программы звершено!");
    process.exit(); // Нужен чтобы в какой-то момент времени по какому-то условию завершить процесс
}

