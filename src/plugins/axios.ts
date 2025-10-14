import axios from 'axios'
import type { Auth } from 'vue-auth3'

export const apiClient = axios.create({
  baseURL: 'https://api.skygroupvn.com.vn/api',
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token, Authorization,Access-Control-Max-Age',
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Max-Age': 86400,
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})

/**
 * Configures the axios interceptor to handle 401 responses.
 * This function must be called from a context where the `auth` instance is available, like `main.ts`.
 * @param {Auth} auth - The vue-auth3 instance.
 */
export function setupInterceptors(auth: Auth) {
  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      // DEBUG: Log the entire error object to inspect its structure
      console.log('Interceptor caught an error:', error)
      // console.log('Error response object:', error.response)

      if (error.response && error.response.status === 401) {
        // DEBUG: Add alert and log to verify interceptor is triggered
        // alert('Interceptor caught a 401 Error!')
        console.log('Full error response:', error.response)

        // The auth plugin will handle the redirection to /login
        auth.logout()
        window.location.href = '/login'
      }
      return Promise.reject(error)
    }
  )
}
