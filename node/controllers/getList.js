const axios = require('axios')
const config = require('../config/index')

/**
  @method getList Obtains the list of available files
  @return {Object[]} a List with the name of the available files
*/
const getList = async () => {
  const found = await axios.get(`${config.API}files`, {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      Authorization: `${config.KEY}`
    }
  })
  return found.data
}
module.exports = getList
