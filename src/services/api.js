import axios from 'axios'

const api = axios.create({
    //mudar para o endeerco certo do backensd
  baseURL: 'http://localhost:3000',
  timeout: 5000
})

export default api
