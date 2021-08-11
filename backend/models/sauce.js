// IMPORTATION ----------
const mongoose = require('mongoose');

// SCHEMA ----------
const sauceSchema = mongoose.Schema({
    userId: { 
        type: String, 
        required: false 
    },
    name: { 
        type: String, 
        required: true,
        match: [/^[^-\s][\wàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/, "Le format est incorrect."]
    },
    manufacturer: { 
        type: String, 
        required: true,
        match: [/^[^-\s][\wàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/, "Le format est incorrect."]
    },
    description: { 
        type: String, 
        required: true,
        match: [/^[^-\s][\wàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/, "Le format est incorrect."]
    },
    mainPepper: { 
        type: String, 
        required: true,
        match: [/^[^-\s][a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/, "Le format est incorrect."]
    },
    imageUrl: { 
        type: String, 
        required: false 
    },
    heat: { 
        type: Number, 
        required: true 
    },
    likes: { 
        type: Number, 
        required: false 
    },
    dislikes: { 
        type: Number, 
        required: false 
    },
    usersLiked: { 
        type: [String], 
        required: false 
    },
    usersDisliked: { 
        type: [String], 
        required: false 
    }
});


// EXPORTATION ----------
module.exports = mongoose.model('Sauce', sauceSchema);