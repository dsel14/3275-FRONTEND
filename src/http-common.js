import axios from "axios"

export default axios.create({
    baseURL: "https://three275-finalbackend.onrender.com/api",
    headers: {
        "Content-type": "application/json"
    }
})