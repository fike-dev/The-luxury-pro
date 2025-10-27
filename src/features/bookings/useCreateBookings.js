import { QueryClient, useMutation } from "@tanstack/react-query";
import { createBooking as createBookingApi } from "../../services/apiBookings";
import toast from "react-hot-toast";

function useCreateBooking() {
  const queryClient = new QueryClient();

  const { isLoading: isCreatingBooking, mutate: createBooking } = useMutation({
    mutationFn: (booking) => createBookingApi(booking),
    onSuccess: () => {
      toast.success("New booking has been added");
      queryClient.invalidateQueries({
        queryKey: ["bookings"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isCreatingBooking, createBooking };
}

export default useCreateBooking;
