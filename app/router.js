const express = require('express');
const router = express.Router();

const mainController = require('./controllers/mainController');
const searchController = require('./controllers/searchController');
const deckController = require('./controllers/deckController');


router.get('/', mainController.homePage);
router.get('/:id', mainController.getCard)
router.get('/search', searchController.searchPage);
router.get('/search/element', searchController.searchCardByElement);
router.get('/search/by-direction-and-level', searchController.searchCardByDirectionAndValue)
router.get('/search/level', searchController.searchCardByLevel)
router.get('/search/name', searchController.searchByName)
router.get('/myDeck',deckController.deckPage)
router.get('/myDeck/add/:name', deckController.addCardOnDeck)
router.get('/myDeck/remove/:name', deckController.removeCardFromDeck)

module.exports = router;