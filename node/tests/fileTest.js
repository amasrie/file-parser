const chai = require('chai')
const expect = chai.expect
const getList = require('../controllers/getList')
const getData = require('../controllers/getData')
const recursiveSearch = require('../controllers/recursiveSearch')
const checkLines = require('../controllers/checkLines')

describe('getList', () => {
  it('should have a list of files', async () => {
    const list = await getList()
    expect(list).to.be.an('object')
    expect(list).to.have.property('files').with.lengthOf(7)
  })
})

describe('getData', () => {
  it('with a non existing file', async () => {
    getData('NonExistingFile.csv').catch((err) => {
      expect(err.code).to.equal('ERR_BAD_REQUEST')
    })
  })

  it('with an existing file without lines', async () => {
    getData('test1.csv').then((existingNL) => {
      expect(existingNL).to.be.an('array')
      expect(existingNL).to.have.lengthOf(1)
      expect(existingNL[0]).to.have.property('file')
      expect(existingNL[0]).to.have.property('lines')
      expect(existingNL[0].files).to.be.a('string')
      expect(existingNL[0].lines).to.be.an('object')
      expect(existingNL[0].lines).to.have.lengthOf(0)
    })
  })

  it('with an existing file with lines', async () => {
    getData('test9.csv').then((existing) => {
      expect(existing).to.be.an('array')
      expect(existing).to.have.lengthOf(1)
      expect(existing[0]).to.have.property('file')
      expect(existing[0]).to.have.property('lines')
      expect(existing[0].files).to.be.a('string')
      expect(existing[0].lines).to.be.an('object')
      expect(existing[0].lines).to.have.lengthOf(9)
      expect(existing[0].lines[0]).to.have.property('text')
      expect(existing[0].lines[0]).to.have.property('number')
      expect(existing[0].lines[0]).to.have.property('hex')
      expect(existing[0].lines[0].text).to.be.a('string')
      expect(existing[0].lines[0].number).to.be.a('number')
      expect(existing[0].lines[0].hex).to.be.a('string')
    })
  })

  it('without indicating a file', async () => {
    getData().then((allFiles) => {
      expect(allFiles).to.be.an('array')
      expect(allFiles).to.have.lengthOf(7)
      expect(allFiles[0]).to.have.property('file')
      expect(allFiles[0]).to.have.property('lines')
    })
  })
})

describe('recursiveSearch', () => {
  it('first position', async () => {
    const fst = await recursiveSearch(['test9.csv'], 0, [])
    expect(fst[0].file).to.equal('test9.csv')
    expect(fst[0].lines[0].text).to.be.a('string')
    expect(fst[0].lines[0].number).to.be.a('number')
    expect(fst[0].lines[0].hex).to.be.a('string')
  })

  it('last position', async () => {
    const last = await recursiveSearch(['test1.csv'], 1,
      [
        {
          file: 'test1.csv',
          lines: [
            {
              text: 'dfkljsdfSDFsk3hsdf',
              number: 1234,
              hex: 'd3423a06e'
            }
          ]
        }
      ]
    )
    expect(last[0].file).to.equal('test1.csv')
    expect(last[0].lines[0].text).to.equal('dfkljsdfSDFsk3hsdf')
    expect(last[0].lines[0].number).to.equal(1234)
    expect(last[0].lines[0].hex).to.equal('d3423a06e')
  })
})

describe('checkLines', () => {
  it('empty line', () => {
    const empty = checkLines('test9.csv', ['file,text,message,hex', ''])
    expect(empty).to.be.an('array')
    expect(empty).to.have.lengthOf(0)
  })

  it('< 4 contents', () => {
    const less4 = checkLines('test9.csv', ['file,text,message,hex', 'test9.csv,sfsdfsdfgdgert,123545'])
    expect(less4).to.be.an('array')
    expect(less4).to.have.lengthOf(0)
  })

  it('4 contents', () => {
    const perfect = checkLines('test9.csv', ['file,text,message,hex', 'test9.csv,sfsdfsdfgdgert,123545,df54a345a'])
    expect(perfect).to.be.an('array')
    expect(perfect).to.have.lengthOf(1)
  })

  it('> 4 contents', () => {
    const greater4 = checkLines('test9.csv', ['file,text,message,hex', 'test9.csv,sfsdfsdfgdgert,123545,df54a345a,1234'])
    expect(greater4).to.be.an('array')
    expect(greater4).to.have.lengthOf(0)
  })

  it('wrong file name', () => {
    const name = checkLines('test9.csv', ['file,text,message,hex', 'test129.csv,sfsdfsdfgdgert,123545,df54a345a,1234'])
    expect(name).to.be.an('array')
    expect(name).to.have.lengthOf(0)
  })

  it('wrong number', () => {
    const notNum = checkLines('test9.csv', ['file,text,message,hex', 'test129.csv,sfsdfsdfgdgert,A123545,df54a345a,1234'])
    expect(notNum).to.be.an('array')
    expect(notNum).to.have.lengthOf(0)
  })

  it('wrong hex', () => {
    const notHex = checkLines('test9.csv', ['file,text,message,hex', 'test129.csv,sfsdfsdfgdgert,123545,df54a345aqwwe'])
    expect(notHex).to.be.an('array')
    expect(notHex).to.have.lengthOf(0)
  })

  it('an empty content', () => {
    const noContent = checkLines('test9.csv', ['file,text,message,hex', ',,,'])
    expect(noContent).to.be.an('array')
    expect(noContent).to.have.lengthOf(0)
  })
})
