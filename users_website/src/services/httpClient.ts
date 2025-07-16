import axios, { AxiosError, AxiosRequestConfig } from 'axios';
// You might use next-auth's getSession or a simple localStorage check
import { getSession } from 'next-auth/react';

const api_url = process.env.NEXT_PUBLIC_BACKEND_API_URL;

const httpClient = axios.create({
    baseURL: api_url,
    timeout: 10000,
    headers: {
      "Content-Type": "application/json",
    },
  });

// --- Request Interceptor ---
// This runs BEFORE each request is sent.
// httpClient.interceptors.request.use(
//   async (config: AxiosRequestConfig) => {
//     // 1. Get the session/token.
//     // This is an example using next-auth. You could also use localStorage.
//     const session = await getSession();

//     // 2. If a token exists, add it to the Authorization header.
//     if (session?.accessToken) { // Adjust 'accessToken' to match your session object
//       config.headers.Authorization = `Bearer ${session.accessToken}`;
//     }

//     return config;
//   },
//   (error: AxiosError) => {
//     // Handle request errors (e.g., network issues)
//     console.error("Request Error Interceptor:", error);
//     return Promise.reject(error);
//   }
// );


// // --- Response Interceptor ---
// // This runs AFTER a response is received.
// httpClient.interceptors.response.use(
//   // Any status code within the range of 2xx causes this function to trigger
//   (response) => {
//     return response;
//   },
//   // Any status codes that fall outside the range of 2xx cause this function to trigger
//   (error: AxiosError) => {
//     // You can add global error handling here
//     if (error.response) {
//       const { status } = error.response;

//       if (status === 401) {
//         // Handle Unauthorized error (e.g., token expired)
//         console.error("Unauthorized request. Redirecting to login...");
//         // You could trigger a logout function or redirect the user.
//         // window.location.href = '/login';
//       } else if (status === 403) {
//         // Handle Forbidden error
//         console.error("Forbidden request. You don't have permission.");
//       } else if (status >= 500) {
//         // Handle Server errors
//         console.error("Server error occurred. Please try again later.");
//       }
//     } else if (error.request) {
//       // The request was made but no response was received
//       console.error("Network Error: No response received.", error.request);
//     } else {
//       // Something happened in setting up the request that triggered an Error
//       console.error('Error', error.message);
//     }

//     // IMPORTANT: It's crucial to reject the promise so that the calling .catch() block still fires.
//     return Promise.reject(error);
//   }
// );


export default httpClient;