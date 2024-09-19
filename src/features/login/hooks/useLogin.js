// import { useMutation } from "@tanstack/react-query";
// import { postUserLogin as loginAPI } from "../../../services/apiAuthentication";
// import toast from "react-hot-toast";
// import { useNavigate } from "react-router-dom";

// export function useLogin() {
//   const navigate = useNavigate();
//   const { mutate: login, isLoading } = useMutation({
//     mutationFn: ({ username, password }) => loginAPI({ username, password }),
//     onSuccess: () => {
//       toast.success("User login successfully");
//       navigate("/");
//     },
//     onError: (error) => {
//       toast.error(error.message);
//       console.error(error);
//     },
//   });

//   return { login, isLoading };
// }

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postUserLogin as loginAPI } from "../../../services/apiAuthentication";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ username, password }) => loginAPI({ username, password }),
    onSuccess: (user) => {
      queryClient.setQueryData(["user"], user.data);
      toast.success("User logged in successfully");
      navigate("/");
    },
    onError: (error) => {
      toast.error(error.message);
      console.error(error);
    },
  });

  return {
    login: mutation.mutate,
    isLoading: mutation.isPending, // Use isPending instead of isLoading
  };
}
