import { useMutation, useQueryClient } from "@tanstack/react-query";
import { handlePasswordUpdate } from "../../services/apiAuth";
import toast from "react-hot-toast";

function useUpdatePassword() {
  const queryClient = useQueryClient();

  const { isLoading: isUpdating, mutate: updatePassword } = useMutation({
    mutationFn: ({ currentPassword, newPassword, email }) =>
      handlePasswordUpdate({ currentPassword, newPassword, email }),
    onSuccess: ({ user }) => {
      toast.success("Password successfully updated!");
      queryClient.setQueryData(["user"], user);
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { isUpdating, updatePassword };
}

export default useUpdatePassword;
