import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import fs from 'fs';
import path from 'path';


import AdminRouter from './routes/admin.routes.js';
import propertyRouter from './routes/property.routes.js';
import pagesRouter from './routes/pages.routes.js';


dotenv.config({ path: "config.env" });

const app = express();

app.use(morgan('dev', {
    // skip: function(req, res) { return res.statusCode < 400 }
}))

var pwd = path.dirname("");
// log all requests to access.log
app.use(morgan('common', {
    stream: fs.createWriteStream(path.join(pwd, 'logs/access.log'), { flags: 'a' })
}))

app.use(cors());
// app.options("*", cors());
app.use(express.json({ limit: '50mb' }));


app.get('/', (req, res) => {
    res.send({ message: 'Backend is running' });
});

app.use('/api/v1/admins', AdminRouter);
app.use('/api/v1/properties', propertyRouter);
app.use('/api/v1/pages', pagesRouter);

// Serve frontend static files
if (JSON.stringify((process.env.NODE_ENV).trim()) === JSON.stringify("PRODUCTION") ||
    process.env.NODE_ENV === "production") {

    app.use(express.static('./build'));

    app.get(/(.*)/, (req, res) => {
        const cwd = process.cwd()
        res.sendFile(cwd + '/build/index.html');
    })

    // app.use(express.static(path.join(__dirname, '../frontend/build')));

    // app.get('*', (req, res) => {
    //     res.sendFile(path.resolve(__dirname, '../frontend/build/index.html'));
    // })
}

// const startServer = async() => {
//     try {
//         connectDB(process.env.MONGODB_CLUSTER_URI);

//         app.listen(8080, () => console.log('Server is running on port http://localhost:8080'));
//     } catch (error) {
//         console.log(error);
//     }
// }

export default app;