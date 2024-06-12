
require('dotenv').config();
const app = require('./app');
require('colors');
const { connectDB } = require('./config/db');
let server;
connectDB().then(() => {
   server  = app.listen(process.env.PORT, () => {
     console.log(`Listening to port http://localhost:${process.env.PORT}`.yellow.bold);
    });
  });

  process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`.red.bold);
    server.close(() => process.exit(1));
  });