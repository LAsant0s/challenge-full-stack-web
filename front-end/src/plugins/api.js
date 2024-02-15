import axios from 'axios'
import Vue from 'vue'

const api = axios.create({
  baseURL: "http://localhost:3000/"
})

Vue.prototype.$api = api
