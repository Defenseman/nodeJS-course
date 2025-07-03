// Реализация фреймворка по типу express, nestJS.

const Application = require('./framework/Application');
const PORT = process.env.PORT || 5000;
const userRouter = require('./src/user-router');
const jsonParser = require('./framework/parseJson');
const urlParser = require('./framework/parseUrl');

const app = new Application()

app.use(jsonParser);
app.use(urlParser('http://localhost:5000')); // здесь вызываем и передаём base url так как это функция которая возвращает midleware

app.addRouter(userRouter);

app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`))
