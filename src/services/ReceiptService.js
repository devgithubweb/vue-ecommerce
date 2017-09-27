/**
 * Created by Ibrahim on 27/09/2017.
 */
import axios from 'axios'
import Auth from './Auth'

const API_URL = process.env.API_URL
let token = localStorage.getItem('token')

export default {
  getReceipts () {
    return axios.get(`${API_URL}receipts/`, {headers: {Authorization: Auth.getToken()}})
      .then(response => {
        return response
      })
  },
  createReceipt (receipt) {
    return axios.post(`${API_URL}receipts/`, receipt, {headers: {Authorization: Auth.getToken()}})
      .then(response => {
        return response
      })
  }
}
