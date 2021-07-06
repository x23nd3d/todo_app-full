const http = require('http')
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const registerRouter = require('./routes/auth');
const todoRouter = require('./routes/todo');
const MONGODB_URI_DEV = 'mongodb://localhost:27017/todo';
const cors = require('cors')
// const middleware = require('./middleware/variables');
// const morgan = require('morgan');


const app = express();

app.use(cors({origin:true,credentials: true}));

// app.use(morgan('dev'));

app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(bodyParser.json());

// app.use(middleware);

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization'); // If needed
    res.setHeader('Access-Control-Allow-Credentials', true); // If needed
    next();
})


app.use('/api/auth', registerRouter);
app.use('/api/todo', todoRouter);


if (process.env.NODE_ENV === 'production') {
    app.use('/', express.static(path.join(__dirname, 'client', 'build')))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}



async function start() {
    try {
        await mongoose.connect(MONGODB_URI_DEV, {  // before the server starts - it will try to connect to local mongodb server, "test" - is the DB name
            useNewUrlParser: true,  // params which should be included for proper mongodb connection
            useFindAndModify: false,  // params which should be included for proper mongodb connection
            useUnifiedTopology: true  // params which should be included for proper mongodb connection
        });

        const httpServer = http.createServer(app);

        httpServer.listen(3000, () => {
            console.log('HTTP Server running on port 3000');
        });
        console.log('MongoDB Started.');

    } catch (e) {
        console.log('Error', e);
    }


}

start();






