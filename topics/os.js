const os = require('os');
const process = require('process');
const cluster = require('cluster'); // чтобы однопоточному nodeJS приложению иссп-ть все возможности многоядерных систем и запускать дочерние процессы

console.log(process.platform); // тоже вернёт название системы

console.log(os.platform());
console.log(os.arch());
console.log(os.cpus().length); // колличество ядер нужно чтобы разпараллелить нагрузку

const cpus = os.cpus()

for (let i = 0; i < cpus.length - 1; i++) {  // cpus.length - 1; здесь мы оставляем 1 ядро под систему 
    const CPUcore = cpus[i];
    console.log(`Ядро номер ${i + 1}`);
}

if(cluster.isMaster) {       //проверка является ли процесс главным 
    for(let i = 0; i < os.cpus().length; i++) {  
        cluster.fork();      // тогда запускаем дочерний процесс(worker) для каждого ядра
    }
    cluster.on('exit', (worker, code, signal) => { // подписались на событие 'exit'; code и signal нужны если мы хотим удалить процесс 
        console.log(`Worker ${worker.process.pid} died`);
        console.log(code);
        console.log(signal);
        if(code !== 12345678) { 
            cluster.fork(); // и если процесс умер запускаем новый
        } else { 
            console.log(`Worker ${worker.process.pid} colapsed`);
        }
    })
} else { // сработает когда будут запускаться дочерние процессы (workers - так называю дочерние процессы)
    console.log(`Worker c id = ${process.pid} started`);

    setInterval(() => {
        console.log(`Worker c id = ${process.pid} still working`);
    }, 5000)
}