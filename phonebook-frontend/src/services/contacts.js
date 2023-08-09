import axios from 'axios'
const baseUrl = '/api/persons'

const getAll = () => {
  return axios.get(baseUrl)
}

const deleteContact = id => {
    return axios.delete(`${baseUrl}/${id}`)
}

const createContact = newObject => {
  return axios.post(baseUrl, newObject)
}

const updateContact = (newObject,id) => {
  return axios.put(`${baseUrl}/${id}`, newObject)
}

const contactService = { 
    getAll,
    createContact,
    deleteContact,
    updateContact
  }


export default contactService