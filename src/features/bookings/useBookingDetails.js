import { useQuery } from "@tanstack/react-query";
import { getBooking } from "../../services/apiBookings";
import { useParams } from "react-router-dom";

export default function useBookingDetails() {
  const { bookingId } = useParams();

  const {
    data: booking,
    error,
    isLoading,
  } = useQuery({
    queryFn: () => getBooking(bookingId),
    queryKey: ["bookingDetail", bookingId],
    retry: false,
  });

  return { booking, isLoading, error };
}
