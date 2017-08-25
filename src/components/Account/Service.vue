<script>
  import axios from 'axios'

  export default {
    register: (username, email, passwordOne, passwordTwo) => {
      let data = {
        username: username,
        email: email,
        password1: passwordOne,
        password2: passwordTwo
      }
      return axios.post('http://127.0.0.1:8000/rest-auth/registration/', data)
    },
    login: (username, password) => {
      let data = {
        username: username,
        password: password
      }
      return axios.post('http://127.0.0.1:8000/api-token-auth/', data)
    }
  }
</script>
