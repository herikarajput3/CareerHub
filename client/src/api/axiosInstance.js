import axios from "axios";
import toast from "react-hot-toast";

// Step 1: Create an instance of axios which will be used to make API requests

const axiosInstance = axios.create({
    baseURL: "http://localhost:3000/api",
});

// Step 2: Add a request interceptor to the instance to add the token to the request headers

axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
},
    (error) => {
        return Promise.reject(error);
    }

);

// Step 3: Add a response interceptor to the instance to handle errors

axiosInstance.interceptors.response.use(
    (response) =>{
        return response;
    },
    (error) =>{
        const status = error.response?.status;
        const message = error.response?.data?.message || "Something went wrong";

        if(status === 401) {
            toast.error("Session expired, please login again");
            localStorage.removeItem("token");
            window.location.href = "/login";
        } else {
            toast.error(message);
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;