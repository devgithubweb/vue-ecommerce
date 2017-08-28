/**
 * Created by Ibrahim on 25/08/2017.
 */
export default {
  getToken () {
    return localStorage.getItem('token')
  },

  getUsername () {
    return localStorage.getItem('username')
  },

  getIsAdmin () {
    return localStorage.getItem('is_admin')
  }
}
