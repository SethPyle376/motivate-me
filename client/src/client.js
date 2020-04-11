var axios = require('axios');

var axiosInstance = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL
});

module.exports = axiosInstance;