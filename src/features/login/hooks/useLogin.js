
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postUserLogin as loginAPI } from "../../../services/apiAuthentication";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

/**
 * Custom hook to handle user login using React Query's `useMutation`.
 * This hook manages the login process, including API calls, error handling,
 * success messages, and navigation.
 *
 * @returns {Object} Contains the `login` function to trigger the login mutation and 
 * a loading state `isLoading` to indicate if the login process is ongoing.
 */
export function useLogin() {
  const navigate = useNavigate();

  // QueryClient instance to manage and manipulate query cache
  const queryClient = useQueryClient();

  // React Query's useMutation to handle the login API request
  const mutation = useMutation({
    /**
     * Function that triggers the login API call.
     *
     * @param {Object} credentials - The user credentials
     * @param {string} credentials.username - The username for login
     * @param {string} credentials.password - The password for login
     * @returns {Promise} The API call to login the user
     */
    mutationFn: ({ username, password }) => loginAPI({ username, password }),
    
    /**
     * Called when the login API call is successful.
     * Stores the user data in the query cache and navigates to the homepage.
     *
     * @param {Object} user - The response object from the API containing user data
     */
    onSuccess: (user) => {
      queryClient.setQueryData(["user"], user.data); // Store the user data in the cache under the "user" query key
      toast.success("User logged in successfully");
      navigate("/");
    },

    /**
     * Called when the login API call fails.
     * Displays an error message in the console and shows an error toast.
     *
     * @param {Object} error - The error object returned from the API
     */
    onError: (error) => {
      toast.error(error.message);
      console.error(error);
    },
  });

  /**
     * Function to trigger the login mutation with user credentials.
     *
     * @function
     * @param {Object} credentials - The user credentials
  */
  return {
    login: mutation.mutate,
    isLoading: mutation.isPending, // Use isPending instead of isLoading
  };
}
