import axios from "axios";
import { jwtDecode } from "jwt-decode";
import {SERVER_IP_ADDRESS} from '../utils/constVariables'


/**
 * Function to register a new user by sending a POST request to the server.
 *
 * @param {Object} payload - The user registration data
 * @param {string} payload.username - The username of the user
 * @param {string} payload.email - The email of the user
 * @param {string} payload.password - The password of the user
 * @returns {Promise<void>} Resolves if the registration is successful, otherwise throws an error.
 * @throws Will throw an error if the API call fails.
 */
export async function postUserRegister({ username, email, password }) {
  try {
    await axios.post(
      `http://${SERVER_IP_ADDRESS}/users/save`,
      {
        username,
        email,
        password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("error in postUserRegister", error);
    throw error;
  }
}

/**
 * Function to log in a user by sending a POST request to the server.
 * Stores the user profile and token in localStorage upon successful login.
 *
 * @param {Object} payload - The login credentials
 * @param {string} payload.username - The username of the user
 * @param {string} payload.password - The password of the user
 * @returns {Object} Returns the user data and message from the server
 * @throws Will throw an error if the API call fails.
 */
export async function postUserLogin({ username, password }) {
  try {
    const response = await axios.post(`http://${SERVER_IP_ADDRESS}/users/login`, {
      username,
      password,
    });

    const { data, message, token } = response.data;

    localStorage.setItem(
      "profile",
      JSON.stringify({ ...data, token, message })
    );

    return { data, message };
  } catch (error) {
    console.error("error in postUserLogin", error);
    throw error;
  }
}

/**
 * Function to retrieve the current logged-in user from localStorage.
 * Verifies the token expiration and removes the profile from localStorage if expired.
 *
 * @returns {Object|null} Returns the user data if the token is valid, otherwise null.
 * @throws Will throw an error if the token decoding or any other process fails.
 */
export async function getCurrentUser() {
  try {
    const data = localStorage.getItem("profile");

    const userData = JSON.parse(data);

    // Get the token
    const token = userData.token;

    const decodedToken = jwtDecode(token);

    // Current time in seconds
    const currentTime = Math.floor(Date.now() / 1000);

    // Login time expired => user will have to sign in again!
    if (decodedToken.exp < currentTime) {
      localStorage.removeItem("profile");
      return null;
    }

    return userData;
  } catch (err) {
    console.log("ERROR: ", err.message);
    throw err;
  }
}
