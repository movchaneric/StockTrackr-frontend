import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../../services/apiAuthentication";

/**
 * Custom hook to fetch the current logged-in user using React Query's `useQuery`.
 * This hook retrieves the user data from the API and provides loading state management.
 *
 * @returns {Object} Contains the current user data (`user`) and a loading state (`isLoading`)
 * indicating if the user data is still being fetched.
 */
export function useUser() {
  const { data: user, isLoading } = useQuery({
    /**
     * The unique query key used to cache and track the user data.
     *
     * @type {Array}
     */
    queryKey: ["user"],

    /**
     * The function that fetches the current user data from the API.
     *
     * @function
     * @returns {Promise} The API call to get the current user
     */
    queryFn: getCurrentUser,
  });

  return { user, isLoading };
}
