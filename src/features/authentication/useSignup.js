import { useMutation } from "@tanstack/react-query";
import { signUp as signUpApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

function useSignup() {
  const { isLoading: isSigningUp, mutate: signUp } = useMutation({
    mutationFn: ({ fullName, email, password }) =>
      signUpApi({ fullName, email, password }),
    onSuccess: (user) => {
      console.log(user);
      toast.success(
        `Account created successfully! Please verify the new account from your email address ${user.user.email}`
      );
    },
    onError: () => {
      toast.error("Failed to create a new user.");
    },
  });

  return { isSigningUp, signUp };
}

export default useSignup;
