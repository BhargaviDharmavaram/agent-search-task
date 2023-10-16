import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container,
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardText,
  Button,
  CardFooter,
  Row,
  Col,
  Modal,
  ModalBody,
} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

const ListAgents = (props) => {
    // const [agents, setAgents] = useState([])
    const [selectedLocation, setSelectedLocation] = useState('')
    const [filteredAgents, setFilteredAgents] = useState([])
    const [selectedAreaOfOperation, setSelectedAreaOfOperation] = useState('')
    const [selectedPropertyType, setSelectedPropertyType] = useState('')
    const [selectedLanguages, setSelectedLanguages] = useState('')
    const [dropdownOptions, setDropdownOptions] = useState({
      city: [],
      languages: [],
      propertyTypes: [],
      areasOfOperation: [],
    })
    const [error, setError] = useState(null)
    const [contactNumber, setContactNumber] = useState('')
    const [isContactModalOpen, setIsContactModalOpen] = useState(false)
    // State variables for the image modal
    const [modalImage, setModalImage] = useState('')
    const [modalAgentName, setModalAgentName] = useState('')
    const [modalContact, setModalContact] = useState('')
    const [modalEmail, setModalEmail] = useState('')
    const [isImageModalOpen, setIsImageModalOpen] = useState(false)

    // Function to open the image modal with agent details
    const openImageModal = (image, agentName, contact, email) => {
        setModalImage(image)
        setModalAgentName(agentName)
        setModalContact(contact)
        setModalEmail(email)
        setIsImageModalOpen(true)
    }

    const closeImageModal = () => {
      setIsImageModalOpen(false)
    }

    useEffect(() => {
      const fetchData = async () => {
        try {
          // const agentsResponse = await axios.get('http://localhost:3456/api/agents/getAgents')
          // setAgents(agentsResponse.data)
          const optionsResponse = await axios.get('http://localhost:3456/api/options')
          setDropdownOptions(optionsResponse.data)
        } catch (error) {
          console.error('Error fetching agents:', error)
        }
      }

      fetchData()
    }, [])

    const filterAgents = async () => {
      try {
        const response = await axios.get('http://localhost:3456/api/agents/search', {
          params: {
            location: selectedLocation,
            areasOfOperation: selectedAreaOfOperation,
            propertyType: selectedPropertyType,
            languages: selectedLanguages,
          },
        })

        setFilteredAgents(response.data)
        setError(null)
      } catch (error) {
        if (error.response && error.response.data && error.response.data.error) {
          setError(error.response.data.error);
        } else {
          setError('An error occurred while searching agents.');
        }
        setFilteredAgents([])
      }
    }

    useEffect(() => {
      filterAgents()
    }, [selectedLocation, selectedAreaOfOperation, selectedPropertyType, selectedLanguages])

    const openContactModal = (contact) => {
      setContactNumber(contact)
      setIsContactModalOpen(true)
    }

    const closeContactModal = () => {
      setIsContactModalOpen(false)
    }

    const [showDetails, setShowDetails] = useState({})
    const [expandDescription, setExpandDescription] = useState({})

    const toggleDetails = (agentId) => {
        // first makes a shallow copy of the showDetails object, then toggles the value for the specified agentId in the copied object, and finally, updates the state with the modified object.
        // Create a copy of the showDetails object
        const updatedShowDetails = { ...showDetails };
        
        // Toggle the value for the specified agentId
        updatedShowDetails[agentId] = !updatedShowDetails[agentId];
        
        // Update the state with the modified showDetails object
        setShowDetails(updatedShowDetails);
    };
    

    const toggleDescription = (agentId) => {
        setExpandDescription((prevExpandDescription) => {
          return {
            ...prevExpandDescription,
            [agentId]: !prevExpandDescription[agentId],
          };
        });
    };
      

    // Create a function to capitalize the first letter of a string
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    return (
      <Container>
        <h1>List of agents</h1>

        <div style={{ display: 'flex', marginBottom: '10px' }}>
        <select
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            style={{ marginRight: '20px' }}
        >
            <option value="">Select Location</option>
            {dropdownOptions.city.map((option) => (
            <option key={option} value={option}>
                {option}
            </option>
            ))}
        </select>

        <select
            value={selectedAreaOfOperation}
            onChange={(e) => setSelectedAreaOfOperation(e.target.value)}
            style={{ marginRight: '20px' }}
        >
            <option value="">Select Area of Operation</option>
            {dropdownOptions.areasOfOperation.map((option) => (
            <option key={option} value={option}>
                {option}
            </option>
            ))}
        </select>

        <select
            value={selectedPropertyType}
            onChange={(e) => setSelectedPropertyType(e.target.value)}
            style={{ marginRight: '20px' }}
        >
            <option value="">Select Property Type</option>
            {dropdownOptions.propertyTypes.map((option) => (
            <option key={option} value={option}>
                {option}
            </option>
            ))}
        </select>

        <select
            value={selectedLanguages}
            onChange={(e) => setSelectedLanguages(e.target.value)}
        >
            <option value="">Select Languages</option>
            {dropdownOptions.languages.map((option) => (
            <option key={option} value={option}>
                {option}
            </option>
            ))}
        </select>
        </div>
        {selectedLocation && !error && <h2>Agents in {selectedLocation}</h2>}

        {error && <div className="error-message">{error}</div>}

        {filteredAgents.map((ele) => (
          <Card key={ele._id} className="mb-2">
            <CardBody>
              <Row>
                <Col md="4">
                  <CardImg
                    top
                    src={`http://localhost:3456/images/${ele.propertyImage}`}
                    alt="PropertyImage"
                    style={{ height: '200px', width: '200px', cursor: 'pointer' }}
                    onClick={() => openImageModal(ele.propertyImage, ele.agentName, ele.contact, ele.email)}
                  />
                </Col>
                <Col md="4">
                  <CardTitle><b>{capitalizeFirstLetter(ele.agentName)}</b></CardTitle>
                  <CardText>{ele.businessName}</CardText>
                  <CardText>{ele.experience} years of experience</CardText>
                  <CardText><b>Languages</b> <br/> {ele.languages.map(language => capitalizeFirstLetter(language)).join(', ')}</CardText>
                </Col>
                <Col md="4">
                  <CardText><b>Areas of Operation</b> <br />  {capitalizeFirstLetter(ele.areasOfOperation)}</CardText>
                  <CardText><b>Address</b> <br /> {capitalizeFirstLetter(ele.address)}</CardText>
                </Col>
                  {showDetails[ele._id] && (
                    <div>
                      <CardText><b>Property Type</b> <br /> {ele.propertyType.map(propertyType => capitalizeFirstLetter(propertyType)).join(', ')}</CardText>
                      <CardText>
                        <b>About Us</b> <br /> {expandDescription[ele._id] ? ele.description : `${ele.description.slice(0, 100)}... `}
                        {ele.description.length > 100 && (
                          <Link onClick={() => toggleDescription(ele._id)}>
                            {expandDescription[ele._id] ? 'Read Less' : 'Read More'}
                          </Link>
                        )}
                      </CardText>
                    </div>
                  )}
              </Row>
            </CardBody>
            <CardFooter className="d-flex justify-content-between">
              <Button onClick={() => openContactModal(ele.contact)}>Contact Agent</Button>
              <Link onClick={() => toggleDetails(ele._id)}>
                {showDetails[ele._id] ? 'Hide Details' : 'Show Details'}
              </Link>
            </CardFooter>
          </Card>
        ))}

        <Modal isOpen={isContactModalOpen} toggle={closeContactModal}>
          <ModalBody>
            <h2>Contact Agent</h2>
            <p>{contactNumber}</p>
          </ModalBody>
        </Modal>
        <Modal isOpen={isImageModalOpen} toggle={closeImageModal}>
          <ModalBody className="text-center">
            <h2>Agent Details</h2>
            <img src={`http://localhost:3456/images/${modalImage}`} style={{ height: '200px', width: '200px'}} alt="AgentImage" />
            <p>{capitalizeFirstLetter(modalAgentName)}</p>
            <p>{modalContact}</p>
            <p>{modalEmail}</p>
          </ModalBody>
        </Modal>
      </Container>
    )
}

export default ListAgents
