const path = require('path');

// Глобальные переменные NodeJS
__dirname // путь до папки
__filename // путь до файла

// path.join() - нужен для корректного склеивания пути на всех платформах
console.log('Склеить участки пути', path.join('/dfsdf', 'sdfsd', 'sdfwert')) // Склеить участки пути \dfsdf\sdfsd\sdfwert

console.log(path.join(__dirname, '..', '..')) // '..' поднимут нас на директорию выше

// path.resolve() - вернёт всегда абсолютный путь, ❗но не всегда ожидаемо работает '/' - может изменить поведение 
console.log(path.resolve(__filename, 'first', 'second', 'third')); // D:\SelfEducation\NodeJS_course\topics\path.js\fgasdfg\tryur\dfsgsg

const fullPath = path.resolve(__filename, 'first', 'second', 'third.js');

console.log('Парсим путь', path.parse(fullPath)); // Парсим строку {
                                                    //   root: 'D:\\',
                                                    //   dir: 'D:\\SelfEducation\\NodeJS_course\\topics\\path.js\\first\\second',
                                                    //   base: 'third.js',
                                                    //   ext: '.js',
                                                    //   name: 'third'
                                                    // }

console.log('Разделитель в OS', path.sep) // \

console.log('Проверка на абсолютный путь', path.isAbsolute(fullPath)); // true
console.log('Проверка на абсолютный путь', path.isAbsolute('dfsdf/sdfdsf')); // false

console.log('Название файла', path.basename(fullPath)); // third.js
console.log('Расширение файла', path.extname(fullPath)); // .js


// ============================================================================

const siteURL = 'https://localhost:8080/users?id=5182'

const parsedURL = new URL(siteURL);

console.log('Полная информация про наш URL ', parsedURL);   // URL {
                                                            //   href: 'https://localhost:8080/users?id=5182',
                                                            //   origin: 'https://localhost:8080',
                                                            //   protocol: 'https:',
                                                            //   username: '',
                                                            //   password: '',
                                                            //   host: 'localhost:8080',
                                                            //   hostname: 'localhost',
                                                            //   port: '8080',
                                                            //   pathname: '/users',
                                                            //   search: '?id=5182',
                                                            //   searchParams: URLSearchParams { 'id' => '5182' },
                                                            //   hash: ''
                                                            // }
