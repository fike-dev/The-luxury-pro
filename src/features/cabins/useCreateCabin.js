import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

export function useCreateCabin() {
  const queryClient = useQueryClient();

  const { isLoading: isCreating, mutate: createCabin } = useMutation({
    mutationFn: createEditCabin,
    onSuccess: () => {
      toast.success("New Cabin created successfully!");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
      // queryClient.refetchQueries({
      //   queryKey:
      // })
      //   reset();
    },
    onError: () => toast.error("Cabin couldn't be created!"),
  });

  return { isCreating, createCabin };
}
