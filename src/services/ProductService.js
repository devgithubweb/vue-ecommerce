/**
* Created by Ibrahim on 24/08/2017.
*/
import axios from 'axios'

const API_URL = process.env.API_URL
const token = localStorage.getItem('token')

export default {
  getProducts () {
    return axios.get(`${API_URL}products/`)
      .then(response => {
        return response
      })
  },
  getProduct (id) {
    return axios.get(`${API_URL}products/${id}`)
      .then(response => {
        return response
      })
  },
  updateProduct (product) {
    return axios.patch(`${API_URL}products/${product.id}`, product, {headers: {Authorization: token}})
      .then(response => {
        return response
      })
  },
  createProduct (product) {
    return axios.post(`${API_URL}products/`, product, {headers: {Authorization: token}})
      .then(response => {
        return response
      })
  }
}
