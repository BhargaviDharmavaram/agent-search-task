# agent-search-task
##  Agent Search System
## 1. FrontEnd
The ListAgents component is a part of a web application built using React and Reactstrap (React Bootstrap) for a real estate agency. This component is responsible for displaying a list of agents with various search and filter options.

## Features
1. Filter agents based on location, area of operation, property type, and languages.
2. View agent details including their property images, contact information, and more.
3. Toggle between showing and hiding additional agent details.
4. Contact agents directly from the application.

## How It Works
1. Filter Agents: Users can filter agents by selecting options such as location, area of operation, property type, and languages.

2. Agent List: The component displays a list of agents matching the selected filter criteria. Each agent card contains relevant information, including their name, business name, experience, languages spoken, areas of operation, and more.

3. Toggle Details: Users can toggle the display of additional agent details, including property types and an "About Us" section. This helps users learn more about each agent's expertise and services.

4. Contact Agent: Users can contact agents by clicking the "Contact Agent" button. The contact modal displays the agent's contact number.

5. Agent Details Modal: Clicking on an agent's property image opens a modal that displays additional agent details, including an image, agent name, contact information, and email.

## Dependencies
- React
- Reactstrap (React Bootstrap)
- Axios (for making HTTP requests)

## Getting Started

To get started with this frontend project, follow these steps:

1. **Clone the Repository:**
   - git clone the repository
   - cd frontend
2. **Install Dependencies:**
Install the necessary project dependencies:
npm install

3. **Run the Application:**
Start the frontend development server:

npm start
The application should now be accessible at http://localhost:3000.

## 2. Backend
 It is built using Node.js, Express, and MongoDB. The backend provides API endpoints for creating agents, retrieving agent data, searching for agents based on various criteria, and fetching dropdown options for filtering agents in the frontend.
 ## Features

- **API Endpoints:** Provides endpoints for creating agents, retrieving agent data, and searching for agents based on location, area of operation, property type, languages spoken, and more.

- **Dropdown Options:** Offers endpoint to fetch dropdown options for filtering agents in the frontend.

## Getting Started

To get started with this backend server, follow these steps:

1. **Clone the Repository:**

   - git clone the repository
   - cd backend
2. **Install Dependencies:**

Install the necessary project dependencies:
npm install 
3. **Configuration:**

Set up your MongoDB database and update the database configuration in the config/db.js file.
4. **Run the Application:**

Start the backend server:
node index.js or nodemon index.js
The backend server should be running and ready to serve API requests.

## Folder Structure
The project folder structure is organized as follows:

1. app/controllers/: Controllers for handling API requests.
2. app/middlewares/: Middlewares, including Multer for file uploads.
3. models/: Mongoose data models for agents.
4. config/: Configuration files, including the database configuration.
## API Endpoints
1. api/agents/create-agent: Create a new agent.
2. /api/agents/getAgents: Get a list of all agents.
3. /api/agents/search: Search for agents based on location, area of operation, property type, languages, and more.
4. /api/options: Get dropdown options for filtering agents.

## Dependencies
- Node js
- Express
- MongoDB (via Mongoose)
- Cors (Cross-Origin Resource Sharing)
- Multer (for handling file uploads)

