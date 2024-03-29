const dataMapper = require('../dataMapper');

const createDeck = {
 
   

  /**
   * show teh deck when the user click on Decks in the header nav
   * @param {request} req 
   * @param {response} res 
   */
  deckPage:(req, res) => {
    res.render("myDeck", { cards : req.session.deck})
 },

 /**
   * add card on session until the session contain 5 items if the user click on [ + ]
   * @param {request} req 
   * @param {response} res 
   * @param {next} next
  */
  addCardOnDeck: async (req,res, next) => {
    const nameCardAdded = req.params.name;
    const addCard = req.session.deck.find(card => card.name === nameCardAdded)
     if(!addCard ) {       
      try {
        const card = await dataMapper.findOneCardByName(nameCardAdded);
        if( req.session.deck.length < 5){
        req.session.deck.push(card);        
      }
        res.render('myDeck', {cards : req.session.deck})
      } catch (error) {
        res.status(500).send(error);
      }
    } else {
      res.redirect('/myDeck');
    }

    },

    /**
     * remove one card from the deck if the user click on [ - ]
     * @param {request} req 
     * @param {rsponse} res 
     */
  removeCardFromDeck: (req, res ) => {
    const cardName = req.params.name;
    req.session.deck = req.session.deck.filter(cards => cards.name !== cardName);
    res.redirect('/myDeck');
  }
}




module.exports = createDeck;