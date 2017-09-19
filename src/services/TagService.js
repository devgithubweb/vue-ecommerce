/**
 * Created by Ibrahim on 14/09/2017.
 */
import axios from 'axios'

const API_URL = process.env.API_URL
const token = localStorage.getItem('token')

export default {
  createTag (tag) {
    const headers = {headers: {Authorization: token}}

    return axios.post(`${API_URL}tags/`, tag, headers)
      .then(response => {
        return response
      })
  },
  getTags (productId) {
    return axios.get(`${API_URL}tags/?product_item=${productId}`)
      .then(response => {
        return response
      })
  }
}
