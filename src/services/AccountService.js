  import axios from 'axios'

  const API_URL = process.env.API_URL

  export default {
    register: (username, email, passwordOne, passwordTwo) => {
      let data = {
        username: username,
        email: email,
        password1: passwordOne,
        password2: passwordTwo
      }
      return axios.post(`${API_URL}rest-auth/registration/`, data)
    },
    login: (username, password) => {
      let data = {
        username: username,
        password: password
      }
      return axios.post(`${API_URL}api-token-auth/`, data)
    }
  }
