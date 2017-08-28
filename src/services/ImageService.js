/**
 * Created by Ibrahim on 27/08/2017.
 */

import axios from 'axios'

const API_URL = process.env.API_URL

export default {
  getImageByProductId (id) {
    return axios.get(`${API_URL}images/?product_item=${id}/`)
      .then(response => {
        return response
      })
  }
}
