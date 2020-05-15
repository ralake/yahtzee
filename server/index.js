const createApp = require('./createApp')
const port = process.env.PORT || 2001

const app = createApp()

app.start(port)
