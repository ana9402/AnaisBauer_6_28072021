const Sauce = require('../models/sauce');

// POST
exports.createSauce = (req, res, next) => {
    delete req.body._id;
    const sauce = new Sauce({
        ...req.body,
        likes: 0,
        dislikes: 0,
        usersLiked: [],
        usersDisliked: []
    });
    sauce.save()
    .then(() => res.status(201).json({message: "Sauce enregistrée !"}))
    .catch(error => res.status(400).json({error}));
}

// PUT
exports.modifySauce = (req, res, next) => {
    Sauce.updateOne({_id: req.params.id}, {...req.body,_id: req.params.id})
    .then(()=> res.status(200).json({message: "Sauce modifiée !"}))
    .catch(error => res.status(400).json({error}));
}

// DELETE
exports.deleteSauce = (req, res, next) => {
    Sauce.deleteOne({_id: req.params.id})
    .then(() => res.status(200).json({message: "Sauce supprimée !"}))
    .catch(error => res.status(400).json({error}));
};

// GET
exports.getAllSauces = (req, res, next) => {
    Sauce.find()
    .then(sauces => res.status(200).json(sauces))
    .catch(error => res.status(400).json({error}));
}

exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({_id: req.params.id})
    .then(sauce => res.status(200).json(sauce))
    .catch(error => res.status(404).json({error}));
};