import axios from "axios";

const client = axios.create({
  // baseURL: 'https://awardio.onrender.com',
  baseURL: 'http://localhost:8080',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json'
  }
});

export default client;
