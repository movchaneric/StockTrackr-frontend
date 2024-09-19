

import { useMutation } from "@tanstack/react-query";
import { postUserRegister as registerAPI } from "../../../services/apiAuthentication";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

/**
 * Custom hook to handle user registration using React Query's `useMutation`.
 * This hook manages the registration API call and handles success and error scenarios.
 *
 * @returns {Object} Contains the `register` function to trigger the registration mutation and 
 * a loading state `isLoading` to indicate if the registration process is in progress.
 */
export function useRegister() {
  const navigate = useNavigate();

  const mutation = useMutation({
    /**
     * Function that triggers the registration API call.
     *
     * @param {Object} credentials - The user registration credentials
     * @param {string} credentials.username - The username for registration
     * @param {string} credentials.email - The email for registration
     * @param {string} credentials.password - The password for registration
     * @returns {Promise} The API call to register the new user
     */
    mutationFn: ({ username, email, password }) =>
      registerAPI({ username, email, password }),

    /**
     * Called when the registration API call is successful.
     * Shows a success toast message and navigates to the login page.
     */
    onSuccess: () => {
      toast.success("User registered successfully");
      navigate("/login");
    },

    /**
     * Called when the registration API call fails.
     * Displays an error toast message and logs the error in the console.
     *
     * @param {Object} error - The error object returned from the API
     */
    onError: (error) => {
      toast.error(error.message);
      console.error(error);
    },
  });

  return {
    register: mutation.mutate,
    isLoading: mutation.isPending,
  };
}
