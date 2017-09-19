/**
 * Created by Ibrahim on 19/09/2017.
 */
import axios from 'axios'

const API_URL = process.env.API_URL
const token = localStorage.getItem('token')

export default {
  getUserInformation() {
    axios.get(`${API_URL}user-information/`, {header: {Authorization: token}})
      .then(response => {
        return response
      })
  },

  createUserInformation(userInfo) {
    axios.post(`${API_URL}user-information/`, userInfo, {header: {Authorization: token}})
      .then(response => {
        return response
      })
  }
}
