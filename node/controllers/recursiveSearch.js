const axios = require('axios')
const config = require('../config/index')
const checkLines = require('./checkLines')

/**
  @method recursiveSearch Recursively loops over the list of files, getting their contents
  @param {String[]} list The list of names of the files that will be checked
  @param {Number} position The position of the list that the loop is currently checking
  @param {Object[]} response The resulting information that will be returned
  @return {Object[]} a List with the name of the files and their data per line
*/
const recursiveSearch = async (list, position, response) => {
  if (position < list.length) {
    try {
      let contents = await axios.get(`${config.API}file/${list[position]}`, {
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          Authorization: `${config.KEY}`
        }
      })
      contents = contents.data
      if (typeof contents === 'object') {
        throw contents
      } else {
        const lines = checkLines(list[position], contents.split('\n'))
        response.push({
          file: list[position],
          lines
        })
        return recursiveSearch(list, position + 1, response)
      }
    } catch (err) {
      console.log(`Missing file: ${list[position]}`)
      return recursiveSearch(list, position + 1, response)
    }
  } else {
    return response
  }
}
module.exports = recursiveSearch
