import axios from 'axios'

const api = axios.create({
    baseURL: 'https://taskflicker-api.vercel.app',
})

export default api