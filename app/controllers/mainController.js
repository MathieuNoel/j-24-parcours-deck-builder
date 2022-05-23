const dataMapper = require('../dataMapper.js');

const mainController = {
  homePage: (req, res) => {
    dataMapper.getAllCards( (err, results) => {
      if(err) {
        console.error(err);
        return;
      } 
      res.render('cardList', {
        cards: results.rows,
        title: 'Liste des cartes'
      })
    });
  },

  /**
   * Show the detail of card selected by user
   * @param {request} req  
   * @param {response} res 
   * @param {function} next 
   */
   getCard : async(req, res, next) =>{
    const id = +req.params.id;
    try {
      const card = await dataMapper.getOneCardById(id);
      res.render('cardDetail', {card});
    } catch (error) {
      // res.status(500).send(error);
      next()
    }
  }
};

module.exports = mainController;