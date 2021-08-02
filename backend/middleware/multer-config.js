// Importation de multer
const multer = require('multer')

// Identification des différents types de fichiers acceptés
const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
};

// Création d'un objet de configuration pour l'enregistrement des images sur le disque
const storage = multer.diskStorage({
    // Indication du dossier de destination pour le stockage des images
    destination: (req, file, callback) => {
        callback(null, 'images')
    },
    // Configuration du nom à appliquer au fichier envoyé
    filename: (req, file, callback) => {
        const name = file.originalname.split(' ').join('_');
        const extension = MIME_TYPES[file.mimetype];
        callback(null, name + Date.now() + '.' + extension);
    }
})

// Exportation du middleware multer
module.exports = multer({storage}).single('image');
