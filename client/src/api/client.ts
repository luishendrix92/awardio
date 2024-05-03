import axios from "axios";

const client = axios.create({
  baseURL: 'https://awardio-kozmicluis.koyeb.app',
  timeout: 30000, // Just in case of a cold start
  headers: {
    'Content-Type': 'application/json'
  }
});

export default client;
