const express = require('express')
const cors = require('cors')

const configureDB = require('./config/db')
const agentControllers = require('./app/controllers/agent-controllers')
const upload = require('./app/middlewares/multer')

const app = express()
app.use(express.json())
app.use(cors())

configureDB()

// Serve static files from the "public" directory
app.use(express.static('public'))

app.post('/api/agents/create-agent',upload.single('propertyImage'), agentControllers.create)
app.get('/api/agents/getAgents', agentControllers.getAgents)
app.get('/api/agents/search', agentControllers.searchAgents)
app.get('/api/options', agentControllers.dropDownOptions)

const port = process.env.PORT ||  3456

app.listen(port, () => {
    console.log('server is running on port number', port)
})