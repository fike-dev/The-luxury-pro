import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export default function useApiMutation(
  mutationFn,
  queryKey = ["cabins"],
  successMsg,
  errorMsg = "Something went wrong!",
  reset = false
) {
  const queryClient = useQueryClient();

  const { isLoading, mutate } = useMutation({
    mutationFn: mutationFn,
    onSuccess: () => {
      toast.success(successMsg);
      queryClient.invalidateQueries({
        queryKey,
      });
      reset();
    },
    onError: () => toast.error(errorMsg),
  });

  return { isLoading, mutate };
}
