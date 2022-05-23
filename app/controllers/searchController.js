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
    if(cardElement == 'null') {
      try {
        const cardWithoutElement = await dataMapper.getCardWithoutElement()
        res.render('element', {cards : cardWithoutElement})
      } catch (error) {
        next()
      }} else {        
        const cardWithElement = await dataMapper.getCardByElement(cardElement)
        res.render('element', {cards : cardWithElement})  
      }  
  }
};

module.exports = searchController;