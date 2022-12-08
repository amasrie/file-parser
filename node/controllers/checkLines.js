/**
  @method checkLines Loops over the lines of a file, cheking if they have four comma separated values. Ignores empty values and different file name
  @param {String} fileName The name of the file
  @param {String} contents The contents of the file
  @return {Object[]} List with the text, number and hex for each line
*/
const checkLines = (fileName, contents) => {
  const lines = []
  for (let i = 1; i < contents.length; i++) {
    const elems = contents[i].split(',')
    if (elems.length === 4 && elems[0] === fileName &&
      elems[1].length > 0 && elems[2].length > 0 &&
      elems[3].length > 0 && !isNaN(elems[2]) &&
      elems[3].match(/[0-9A-Fa-f]{1,}/g)) {
      lines.push({
        text: elems[1],
        number: +elems[2],
        hex: elems[3]
      })
    }
  }
  return lines
}
module.exports = checkLines
