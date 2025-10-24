import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";

function useBookings() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  // FILTER
  const filterValue = searchParams.get("status");
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "status", value: filterValue };

  // SORT
  const sortByRow = searchParams.get("sortBy") || "startDate-desc";
  const [field, direction] = sortByRow.split("-");
  const sortBy = { field, direction };

  // PAGINATION
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  const {
    data: { data: bookings, count } = {},
    error,
    isLoading,
    status,
  } = useQuery({
    queryFn: () => getAllBookings(filter, sortBy, page),
    queryKey: ["bookings", filter, sortBy, page],
  });

  // PRE-FETCHING
  const countPage = Math.ceil(count / PAGE_SIZE);
  if (page < countPage)
    queryClient.prefetchQuery({
      queryFn: () => getAllBookings(filter, sortBy, page + 1),
      queryKey: ["bookings", filter, sortBy, page + 1],
    });
  if (page > 1)
    queryClient.prefetchQuery({
      queryFn: () => getAllBookings(filter, sortBy, page - 1),
      queryKey: ["bookings", filter, sortBy, page - 1],
    });

  return { bookings, error, isLoading, status, count };
}

export default useBookings;
