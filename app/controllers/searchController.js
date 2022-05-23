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
        const cardsWithoutElement = await dataMapper.getCardWithoutElement()
        res.render('element', {cards : cardsWithoutElement})
      } catch (error) {
        next()
      }} else {        
        const cardsWithElement = await dataMapper.getCardByElement(cardElement)
        res.render('element', {cards : cardsWithElement})  
      }  
  },
  
  

  searchCardByLevel: async (req, res, next) =>{
    
    const level = +req.query.level;
    
    try {
      const cardsLevel = await dataMapper.findCardsByLevel(level);
      res.render('level',{cards : cardsLevel});
    } catch (error) {
      next()
    }
  },

  searchCardByDirectionAndValue: async (req, res, next) =>{
    const directionAndValue = req.query
    try {
    const foundDirectionAndValue = await dataMapper.findCardsByDirectionAndValue(directionAndValue)
    res.render('element', {cards : foundDirectionAndValue})
  } catch (error) {
    console.log('searchCardByDirectionAndValue',error)
    next()
  }
  },

  searchByName: async (req, res, next) =>{
    const name = req.query.name
    try {
      const foundName = await dataMapper.searchInName(name)
      res.render('element', {cards : foundName})
    } catch (error) {
      console.log('blabliblu',error)
    }
  }
};

module.exports = searchController;