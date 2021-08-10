// IMPORTATIONS ----------
const mongoose = require('mongoose');
const { RateLimiterMongo } = require('rate-limiter-flexible');

// MIDDLEWARE RATE-LIMITER ----------
const mongoConn = mongoose.connection;

const opts = {
    storeClient: mongoConn,
    dbName: "rate-limit",
    tableName: "rate-limit",
    points: 6,
    duration: 60,
}

const rateLimiterMongo = new RateLimiterMongo(opts);

const rateLimiterMiddleware = (req, res, next) => {
    
    var ip = (req.headers['x-forwarded-for'] || '').split(',').pop().trim() || req.socket.remoteAddress

    // Si l'adresse ip n'est pas récupérée
    if (!ip) {
        console.log("Problème de récupération de l'adresse IP");
        return res.status(401).send("Unauthorized");
    }

    rateLimiterMongo.consume(ip, 2)
    // 2 points sont consommés, on passe au middleware suivant
    .then(() => {
        console.log("L'utilisateur tente de se connecter")
        next();
    })
    // L'utilisateur a effectué trop de tentatives de connexion
    .catch((rateLimiterRes) => {
        console.log("Connexion refusée : trop de tentatives de connexion.");
        return res.status(429).json({rateLimiterRes});
    });
}

// EXPORTATION ----------
module.exports = rateLimiterMiddleware;