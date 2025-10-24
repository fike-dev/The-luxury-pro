import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout as logoutApi } from "../../services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useLogout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { isLoading: isLogingOut, mutate: logout } = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      toast.success("Successfully logged out.");
      navigate("/login", { replace: true });
      queryClient.removeQueries();
    },
    onError: () => {
      toast.error("Failed to log out");
    },
  });

  return { isLogingOut, logout };
}
