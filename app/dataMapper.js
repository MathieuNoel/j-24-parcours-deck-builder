
const database = require('./database');

const dataMapper = {

  getAllCards: function (callback) {
    const query = {
      text : `SELECT * FROM "card"`
    };
    database.query(query, callback);
  },

  /**
   * search one card by id
   * @param {Number} id of card
   * @returns {promise}
   */
  async getOneCardById(id) {
    const query = `SELECT * FROM "card" WHERE "id" = $1`;
    const results = await database.query(query, [id]);
    
    return results.rows[0];
  }, 

  /**
   * get all cards withe the selected element
   * @param {request} cardElement 
   * @returns {promise}
   */
  async getCardByElement(cardElement) {
    const query = `SELECT * FROM "card" WHERE "element" = $1`;
    const results = await database.query(query, [cardElement]);
    return results.rows;
  },

  /**
   * get all cards without element when value of element is null
   * @returns {promise}
   */
  async getCardWithoutElement() {
    const query = `SELECT * FROM "card" WHERE "element" IS NULL`;
    const results = await database.query(query);
    return results.rows;
  },

  /**
   * search one card by her name
   * @param {request} nameCardAdded 
   * @returns {promise}
   */
  async findOneCardByName(nameCardAdded) {
    const query = 'SELECT * FROM "card" WHERE "name" = $1';
    const results = await database.query(query, [nameCardAdded]);
    return results.rows[0];
  }
  
};


module.exports = dataMapper;