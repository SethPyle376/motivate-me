var axios = require('axios');

var axiosInstance = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL,
  headers: {
    'Authorization': localStorage.getItem("user_token") ? localStorage.getItem("user_token") : "" 
  }
});

module.exports = axiosInstance;