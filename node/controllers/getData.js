const getList = require('./getList')
const recursiveSearch = require('./recursiveSearch')

/**
  @method getData Gets the data of one or all the available files
  @param {String} fileName The name of a file, if specified
  @return {Object} a List with the name of the files and their data per line, or error if nor found
*/
const getData = async (fileName) => {
  const list = await getList()
  return new Promise((resolve, reject) => {
    try {
      const names = fileName ? [fileName] : list.files
      resolve(recursiveSearch(names, 0, []))
    } catch (err) {
      reject(err)
    }
  })
}
module.exports = getData
