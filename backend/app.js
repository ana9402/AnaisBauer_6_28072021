const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet'); 
const sauceRoutes = require('./routes/sauce');
const userRoutes = require('./routes/user');

// Connexion à la base de données
mongoose.connect('mongodb+srv://website:WQxCxfsDGIHGAluc@cluster0.fjllj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', 
    {useNewUrlParser: true,
    useUnifiedTopology: true }
)
.then(() => console.log('Connected to MongoDB !'))
.catch(() => console.log('Connection to MongoDB failed !'));

const app = express();

app.use(helmet());

// CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

// Intégrations des routes
app.use(express.json());
app.use('/api/sauces', sauceRoutes);
app.use('/api/auth', userRoutes);


module.exports = app;