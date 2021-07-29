const express = require('express');

const mongoose = require('mongoose');

const app = express();

// Connexion à la base de données
mongoose.connect('mongodb+srv://website:WQxCxfsDGIHGAluc@cluster0.fjllj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', 
    {useNewUrlParser: true,
    useUnifiedTopology: true }
)
.then(() => console.log('Connected to MongoDB !'))
.catch(() => console.log('Connection to MongoDB failed !'));

app.use((req, res, next) => {
    console.log("Requête reçue !")
    next();
});

app.use((req, res, next) => {
    res.status(201);
    next();
});
    
app.use((req, res, next) => {
    res.json({ message: 'La requête a bien été reçue !' });
    next();
});

app.use((req, res, next) => {
    console.log('Réponse envoyée avec succès !');
});

module.exports = app;