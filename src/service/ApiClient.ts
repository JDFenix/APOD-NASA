import axios from "axios";

const nasaApiKey = process.env.EXPO_PUBLIC_NASA_API_KEY;

if (!nasaApiKey) {
    throw new Error("Missing EXPO_PUBLIC_NASA_API_KEY. Add it to your .env file.");
}

export const api = axios.create({
    baseURL: "https://api.nasa.gov",
    params: {
        api_key: nasaApiKey,
    },
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
    }
})


