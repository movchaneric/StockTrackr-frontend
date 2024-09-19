// import { useMutation } from "@tanstack/react-query";
// import { postUserRegister as registerAPI } from "../../../services/apiAuthentication";
// import toast from "react-hot-toast";
// import { useNavigate } from "react-router-dom";

// export function useRegister() {
//   const navigate = useNavigate();
//   const { mutate: register, isPending } = useMutation({
//     mutationFn: ({ username, email, password }) =>
//       registerAPI({ username, email, password }),
//     onSuccess: () => {
//       toast.success("User registered successfully");
//       navigate("/login");
//     },
//     onError: (error) => {
//       toast.error(error.message);
//       console.error(error);
//     },
//   });

//   return {
//     register,
//     isLoading: isPending.status === "loading" || isPending.status === "pending",
//   };
// }

import { useMutation } from "@tanstack/react-query";
import { postUserRegister as registerAPI } from "../../../services/apiAuthentication";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useRegister() {
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: ({ username, email, password }) =>
      registerAPI({ username, email, password }),
    onSuccess: () => {
      toast.success("User registered successfully");
      navigate("/login");
    },
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
