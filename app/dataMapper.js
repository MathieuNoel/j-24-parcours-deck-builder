
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
  },

  async findCardsByLevel(level) {
    const query ='SELECT * FROM "card" WHERE "level" = $1';
    const results = await database.query(query, [level]);
    return results.rows;
  },

  async findCardsByDirectionAndValue({direction, value}) {
        const query = {
      text : `SELECT * FROM "card" WHERE 
      $1 = 'north' AND "value_north" >= $2 
      OR $1 = 'east' AND "value_east" >= $2 
      OR $1 = 'south' AND "value_south" >= $2 
      OR $1 = 'west' AND "value_west" >= $2`,
      values : [direction, value] 
    }
    const results =await database.query(query);
    return results.rows;
        
  },

  // async findCardsByDirectionEast(value) {
  //   const query =`SELECT * FROM "card" WHERE value_east = $1`;
  //   const results = await database.query(query, [value]);
  //   return results.rows;
  // },

  // async findCardsByDirectionSouth(value) {
  //   const query =`SELECT * FROM "card" WHERE value_south = $1`;
  //   const results = await database.query(query, [value]);
  //   return results.rows;
  // },

  // async findCardsByDirectionWest(value) {
  //   const query =`SELECT * FROM "card" WHERE value_west = $1`;
  //   const results = await database.query(query, [value]);
  //   return results.rows;
  // },

  async searchInName(name) {
    const rename = `%${name}%`
    const query = {
      text : `SELECT * FROM "card" WHERE "name" ILIKE $1`,
      values : [rename]
    }
    const results = await database.query(query);
    return results.rows;
  }
  
};


module.exports = dataMapper;