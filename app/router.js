const express = require('express');
const router = express.Router();

const mainController = require('./controllers/mainController');
const searchController = require('./controllers/searchController');
const deckController = require('./controllers/deckController');


router.get('/', mainController.homePage);
// c'est une bonne pratique de mettre un préfix avant un page dynamique, du style /card/:id
// ça permet de savoir que l'id affiché dans l'url est celui d'une carte et pas autre chose
router.get('/:id', mainController.getCard)
router.get('/search', searchController.searchPage);
// ici tu as fais une route paramétrée alors que ce n'est pas nécessaire car tu n'utilise pas req.params.element pour rechercher les cartes mais req.query.element ;)
// une route /search/element aurait donc suffiŧ (et c'est ce qui est fait en pratique dans ton application
// router.get('/search/:element', searchController.searchCardByElement);
router.get('/search/element', searchController.searchCardByElement);
// pour les sessions, on va préférer mettre une méthode d'initialisation dans un middleware (soit dans le fichier index.js soit dans un fichier a part qu'on initialise dans l'index.js)
// tu peux te référer la correction ou au repo David pour le challenge OFig pour voir comment cela est géré (https://github.com/O-clock-Daguerre/S04E06-Atelier-OFig-davidfaure/blob/master/index.js)
router.use('/', deckController.deck);
router.get('/myDeck',deckController.deckPage)
router.get('/myDeck/add/:name', deckController.addCardOnDeck)
router.get('/myDeck/remove/:name', deckController.removeCardFromDeck)

module.exports = router;