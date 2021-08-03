// IMPORTATIONS ----------

const User = require('../models/user'); // Schéma User
const bcrypt = require('bcrypt'); // Hachage des mots de passe
const jwt = require('jsonwebtoken'); // Echange sécurisé de tokens


// ROUTES ----------

// Inscription d'un utilisateur
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

// Connexion de d'un utilisateur déjà enregistré
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
            // Si le mot de passe n'est pas valide
            if (!valid) {
                return res.status(401).json({error: "Mot de passe incorrect !"});
            }
            // Si le mot de passe est valide
            res.status(200).json({
                userId: user._id,
                token: jwt.sign(
                    {userId: user._id},
                    process.env.ACCESS_TOKEN_SECRET,
                    {expiresIn: '24h'}
                )
            });
        })
        .catch(error => res.status(500).json({error}));
    })
    .catch(error => res.status(500).json({error}));
}