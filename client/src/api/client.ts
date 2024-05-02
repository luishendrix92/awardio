import axios from "axios";

const client = axios.create({
  baseURL: 'https://awardio.fly.dev',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json'
  }
});

export default client;
