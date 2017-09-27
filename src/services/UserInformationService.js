/**
 * Created by Ibrahim on 19/09/2017.
 */
import axios from 'axios'
import Auth from './Auth'

const API_URL = process.env.API_URL
let token = localStorage.getItem('token')

export default {
  getUserInformation () {
    return axios.get(`${API_URL}user-information/`, {headers: {Authorization: Auth.getToken()}})
      .then(response => {
        return response
      })
  },

  createUserInformation (userInfo) {
    return axios.post(`${API_URL}user-information/`, userInfo, {headers: {Authorization: Auth.getToken()}})
      .then(response => {
        return response
      })
  }
}
