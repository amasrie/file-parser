const express = require('express')
const router = express.Router()
const getList = require('../controllers/getList')
const getData = require('../controllers/getData')

/**
  @api {GET} /files/data Requests information of one or all the available files
  @apiName getData
  @apiGroup Files
  @apiQuery {String} fileName The name of a especified file to search
  @apiSuccess {Object[]} list A list with the files found and their information
  @apiSuccess {String} list.file The name of the file found
  @apiSuccess {Object} list.lines An object with the text, name and hex found inside the file
  @apiSuccess {Object} list.text The second element of the csv in the file
  @apiSuccess {Object} list.number The third element of the csv in the file
  @apiSuccess {Object} list.hex The fourth and last element of the csv in the file
*/
router.get('/data', (req, res) => {
  const { fileName } = req.query
  getData(fileName)
    .then((data) => {
      res.status(200).send(data)
    }).catch((err) => res.status(err.status || 500).send(err.message || 'Unexpected error'))
})

/**
  @api {GET} /files/list Requests the list of available files
  @apiName getFiles
  @apiGroup Files
  @apiSuccess {Object} files A list with the name of each file available
*/
router.get('/list', async (req, res) => {
  res.status(200).send(await getList())
})

module.exports = router
