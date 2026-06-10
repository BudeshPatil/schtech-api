import app from './app.js';
import http from 'http';
import dotenv from 'dotenv';
dotenv.config();
import connectDB from './config/db.js';
connectDB();

process.on('unCatchException',(err)=>{
    console.error('Glogble Error');
    console.log(err.message);
    process.exit(1);
})

const PORT = process.env.PORT || 5015;

let server = http.createServer(app);

server.listen(PORT,()=>{
    console.log('Server is running at port '+PORT);
});

process.on('uncatchRejectionError',(err)=>{
    console.error('uncatch Error At Server');
    console.log(err);
    server.close(()=>{
        process.exit(1);
    });
});


