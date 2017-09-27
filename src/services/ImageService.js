/**
 * Created by Ibrahim on 27/08/2017.
 */

import axios from 'axios'

const API_URL = process.env.API_URL
let token = localStorage.getItem('token')

export default {
  getImageByProductId (id) {
    return axios.get(`${API_URL}images/?product_item=${id}/`)
      .then(response => {
        return response
      })
  },
  updateImageProductId (image) {
    const headers = {headers: {Authorization: token}}
    const data = {product_item: null}
    return axios.patch(`${API_URL}images/${image.id}/`, data, headers)
      .then(response => {
        return response
      })
  },
  createImage (image, productId) {
    const headers = {headers: {Authorization: token, 'Content-type': 'multipart/form-data'}}

    return axios.post(`${API_URL}images/`, image, headers)
      .then(response => {
        return response
      })
  }
}
