import axios from "axios";
import { jwtDecode } from "jwt-decode";
import {SERVER_IP_ADDRESS} from '../utils/constVariables'

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
