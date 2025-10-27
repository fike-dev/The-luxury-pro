import { QueryClient, useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { createGuest as createGuestApi } from "../../services/apiBookings";

function useCreateGuest() {
  const queryClient = new QueryClient();
  const { isLoading: isCreatingGuest, mutate: createGuest } = useMutation({
    mutationFn: (guest) => createGuestApi(guest),
    onSuccess: () => {
      toast.success("New guest has been added");
      queryClient.invalidateQueries({
        queryKey: ["bookings"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isCreatingGuest, createGuest };
}

export default useCreateGuest;
