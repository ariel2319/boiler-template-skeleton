const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const db = require('./utils/database');
const authRoutes = require('./routes/auth.routes');
const initModels = require('./models/initModels');
initModels();

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan('tiny')); //para mostrar en consola las peticiones que llegan al servidor

db.authenticate()
   .then(() => console.log('DB is running perrito..'))
   .catch((error) => console.log(error));

db.sync({ force: true })
   .then(() => console.log('DB correctly synchronized'))
   .catch(() => console.log(error));

app.get('/', (req, res) => {
   res.json({ message: "Welcome to the jungle " });
})
app.use('/api/v1/auth', authRoutes);

module.exports = app;