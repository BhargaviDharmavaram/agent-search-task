const Agent = require('../models/agent-model')

const agentControllers = {}

agentControllers.create = async (req, res) => {
    try{
        const body = req.body
        const propertyImage = req.file.filename
        // console.log(req.file, 'body', body)
        const agent = await Agent({...body, propertyImage})
        const agentData = await agent.save()
        res.json(agentData)
    }catch(e){
        res.json(e.message)
    }
}

agentControllers.getAgents = async (req, res) => {
    try{
        const agents = await Agent.find()
        res.json(agents)
    }catch(e){
        res.json(e.message)
    }
}


agentControllers.searchAgents = async (req, res) => {
    try {
        const { location, expertise, languages, propertyType, areasOfOperation } = req.query;

        // Helper function to convert input to lowercase and trim
        const sanitizeInput = (value) => (value ? value.toLowerCase().trim() : value);
        // Construct a query based on the provided criteria
        const query = {};

        if (expertise) {
            query.expertise = sanitizeInput(expertise)
        }
        
        if (location) {
            query.location = sanitizeInput(location)
        }

        if (languages) {
            query.languages = sanitizeInput(languages)
        }

        if (propertyType) {
            query.propertyType = sanitizeInput(propertyType)
        }

        if (areasOfOperation) {
            query.areasOfOperation = sanitizeInput(areasOfOperation)
        }

        console.log('Query:', query);

        const agents = await Agent.find(query);
        console.log('Found agents:', agents)
        if (agents.length > 0) {
            res.json(agents);
        } else {
            res.status(404).json({ error: 'No agents found with the provided criteria.' });
        }
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
}

// instead of hard coding the options for dropdown in the FE i did in the BE via api call i will get the options data
agentControllers.dropDownOptions = (req, res) => {
    try{
        const options = {
            city : ['Bangalore', 'Hyderabad'],
            languages: ['Telugu', 'Hindi', 'English'],
            propertyTypes: ['Independent House', 'Flat', 'Apartment'],
            areasOfOperation: ['Ulsoor', 'Mahalakshmi Layout', 'Kumaraswamy Layout'],
        }
        res.json(options)
    }catch(e){
        res.json(e.message)
    }
}
  
module.exports = agentControllers