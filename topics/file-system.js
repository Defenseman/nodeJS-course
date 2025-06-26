const fs = require('fs');
const path = require('path');
const fsPromise = require('fs/promises');

// fs.mkdirSync(path.resolve(__dirname, 'dir')) // Синхронно создаём папку 'dir' - название папки

// fs.mkdirSync(path.resolve(__dirname, 'dir1', 'dir2', 'dir3'), {recursive: true}); // dir1 => dir2 => dir3


// console.log('START');

// fs.mkdir(path.resolve(__dirname, 'folder'), (err) => { // Асинхронно создаём папку 'folder' - название папки
//     if (err) {
//         console.log(err);
//         return;
//     }
//     console.log('Папка успешно создана!');
// })

// console.log('END');


// fs.rmdir(path.resolve(__dirname, 'folder'), (err) => {  // Удаляем папку
//     if (err) {
//         throw new Error(err);
//     }
//     console.log('Папка удалена');
// })

//========================================================================

// fs.writeFile(path.resolve(__dirname, 'text.txt'), 'Some randome text', (err) => { // Перезаписывает текст
//     if (err) {
//         throw new Error(err);
//     }
//     console.log('Файл записан');
// })

// fs.appendFile(path.resolve(__dirname, 'text.txt'), 'additioal text', (err) => { // Добавляет текст
//     if (err) {
//         throw new Error(err);
//     }
//     console.log('Текст добавлен');
// })

// Сверху👆🏻 сейчас реализация  такая чтио не понятно что выполнилось раньше!
// Есть 2 решения:

// 1️⃣ Поместить функция внутрь другой функции Callback Hell

// fs.writeFile(path.resolve(__dirname, 'text2.txt'), 'Some randome text', (err) => { // Перезаписывает текст
//     if (err) {
//         throw new Error(err);
//     }
//     console.log('Файл записан');

//     fs.appendFile(path.resolve(__dirname, 'text2.txt'), 'additioal text', (err) => { // Добавляет текст
//         if (err) {
//             throw new Error(err);
//         }
//         console.log('Текст добавлен');
//     })
// })

// 2️⃣ Создать Promise (fsPromise - современный подход в новых версиях NodeJS)                                                                                                                                      )

// const fullPath = path.resolve(__dirname, 'textPromise.txt');

// fsPromise.writeFile(fullPath, "Lorem random text").then(() => console.log('Файл успешно создан')).catch((err) => console.log(err));
// fsPromise.appendFile(fullPath, "Text to the end of the file").then(() => console.log('Текст успешно добавлен')).catch((err) => console.log(err));

// Тот же Promise только другая реализация

const writeFileAsync = async (dirPath, data) => {     // Создали функцию для создания файла
    return new Promise((res, rej) => fs.writeFile(dirPath, data, (err) => {
        if(err) {
            rej(err.message);
        }
        res()
    }))
}

const appendFileAsync = async (dirPath, data) => {    // Создаали функцию для дополнения текста в файл
    return new Promise((res, rej) => fs.appendFile(dirPath, data, (err) => {
        if(err) {
            rej(err.message);
        }
        res()
    }))
}

const readFileAsync = async (dirPath) => { // Создали функцию для чтения текста из файл
    return new Promise((res, rej) => fs.readFile(dirPath, {encoding: 'utf-8'}, (err, data) => { // encoding для кодировки  
        if(err) {
            rej(err.message);
        }
        res(data);
    }))
}

const removeFileAsync = async (dirPath) => {
    return new Promise((res, rej) => fs.rm(dirPath, (err) => {
        if(err) {
            rej(err.message)
        }
        res()
    }));
}

// writeFileAsync(path.resolve(__dirname, 'newDir.txt'), 'Text tittle')
//     .then(() => appendFileAsync(path.resolve(__dirname, 'newDir.txt'), ' 123'))
//     .then(() => appendFileAsync(path.resolve(__dirname, 'newDir.txt'), '456'))
//     .then(() => appendFileAsync(path.resolve(__dirname, 'newDir.txt'), '789'))
//     .then(() => readFileAsync(path.resolve(__dirname, 'newDir.txt')))
//     .then(data => console.log(data))
//     .then(() => removeFileAsync(path.resolve(__dirname, 'newDir.txt')))
//     .then(() => console.log('Файл удалён'))
//     .catch(err => console.log(err));

// Practice Task🎓
// Через переменную окружения передать строку записать её в файл 
// прочитать файл, посчитать кол-во слов в файле и записать 
// их в новый формат count.txt, затем удалить первый файл

const text = process.env.TEXT || '';

const initialPath = path.resolve(__dirname, 'taskText.txt');
const finalPath = path.resolve(__dirname, 'count.txt');

writeFileAsync(initialPath, text)
    .then(() => readFileAsync(initialPath))
    .then(data => data.split(' ').length)
    .then(count => writeFileAsync(finalPath, `Колличество слов ${count}`))
    .then(() => removeFileAsync(initialPath))
    .catch(err => console.log(err))
