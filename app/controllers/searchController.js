const dataMapper = require('../dataMapper')

const searchController = {
  searchPage: (req, res) => {
    res.render('search');
  },

  /**
   * Show all cards with selected element
   * @param {request*} req 
   * @param {rqponse} res 
   * @param {next} next 
   */
   searchCardByElement: async (req, res, next) =>{
    const cardElement = req.query.element;
    // ici je me suis permet de réajuster l'indentation pour que ça soit un peu plus lisible, rien de méchant :p
    if(cardElement == 'null') {
      try {
        // penses bien a nommer tes variables au pluriel si tu récuperes plusieurs objets du meme type, ici plusieurs cartes donc cardsWithoutElement aurait été un meilleur choix ;)
        const cardWithoutElement = await dataMapper.getCardWithoutElement()
        res.render('element', {cards : cardWithoutElement})
      }
      catch (error) {
        next()
      }
    } else {
      // meme remarque ici pour le pluriel au nommage
      const cardWithElement = await dataMapper.getCardByElement(cardElement)
      res.render('element', {cards : cardWithElement})
    }
  }
};

module.exports = searchController;