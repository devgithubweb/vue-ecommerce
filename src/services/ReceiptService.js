/**
 * Created by Ibrahim on 27/09/2017.
 */
import axios from 'axios'

const API_URL = process.env.API_URL
const token = localStorage.getItem('token')

export default {
  getReceipts () {
    return axios.get(`${API_URL}receipts/`)
      .then(response => {
        return response
      })
  },
  createReceipt (receipt) {
    return axios.post(`${API_URL}receipts/`, receipt, {headers: {Authorization: token}})
      .then(response => {
        return response
      })
  }
}
