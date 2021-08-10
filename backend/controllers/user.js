// IMPORTATIONS ----------

const User = require('../models/user'); // Schéma User
const bcrypt = require('bcrypt'); // Hachage des mots de passe
const jwt = require('jsonwebtoken'); // Echange sécurisé de tokens
const mongoose = require('mongoose');
const { RateLimiterMongo } = require('rate-limiter-flexible');

// ROUTES ----------

// Inscription d'un utilisateur ---
exports.signup = (req, res, next) => {
    // Cryptage du mot de passe saisi (hash + salage)
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
        // Création d'un nouvel utilisateur
        const user = new User({
            email: req.body.email,
            password: hash
        });
        // Enregistrement de l'utilisateur dans la BDD
        user.save()
        .then(() => res.status(201).json({message: "Le nouvel utilisateur a bien été créé !"}))
        .catch(error => res.status(500).json({error}));
    })
    .catch(error => res.status(500).json({error}));
}

// Connexion de d'un utilisateur déjà enregistré ---

// Configurations pour la BDD
const mongoConn = mongoose.connection;
const opts = {
    storeClient: mongoConn,
    dbName: "rate-limit",
    tableName: "rate-limit",
    points: 3,
    duration: 60,
}

const rateLimiterMongo = new RateLimiterMongo(opts);

const getUsernameIPkey = (username, ip) => `${username}_${ip}`;

// Route login
exports.login = (req, res, next) => {
    // Recherche de l'utilisateur dans la BDD
    User.findOne({email:req.body.email})
    .then(user => {
        // Si l'utilisateur n'existe pas
        if(!user) {
            return res.status(401).json({error: "Utilisateur non trouvé !"});
        }
        // Si l'utilisateur existe, on compare le mdp saisi
        bcrypt.compare(req.body.password, user.password)
        .then(valid => {
            const ipAddr = req.ip;
            const usernameIPkey = getUsernameIPkey(req.body.email, ipAddr);
            
            // Si le mot de passe n'est pas valide
            if (!valid) {
                // Consommation de 1pt
                rateLimiterMongo.consume(usernameIPkey, 1)
                // 1 pt consommé
                .then((result) => { 
                    console.log(result);
                    res.status(401).json({error: "Mot de passe incorrect !"});
                })
                // impossible de consommer 1 pt (trop de requêtes)
                .catch((error) => {
                    res.status(429).json({error})
                });
                return;
            }
            // Si le mot de passe est valide, on consulte les pts restants
            rateLimiterMongo.get(usernameIPkey)
            .then((rateLimiterRes) => {
                // Si aucun ou <= 3 pts consommés, authentification de l'utilisateur
                if (rateLimiterRes === null || rateLimiterRes.consumedPoints <= 3) {
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign(
                            {userId: user._id},
                            process.env.ACCESS_TOKEN_SECRET,
                            {expiresIn: '24h'}
                        )
                    });
                } 
                // Si + de 3 pts consommés, authentification impossible avant la fin du temps imparti
                else if (rateLimiterRes.consumedPoints > 3) {
                    console.log(rateLimiterRes)
                    return res.status(429).json({rateLimiterRes});
                }
            })
            .catch(error => res.status(500).json({error}));
        })
        .catch(error => res.status(500).json({error}));
    })
    .catch(error => res.status(500).json({error}));
}