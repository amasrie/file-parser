const Express = require('express')
const config = require('./config/index')
const filesRouter = require('./routes/files')
const cors = require('cors')

const app = new Express()
const PORT = config.PORT

app.use(Express.json())
app.use(cors());

app.use('/files', filesRouter)

app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`))
