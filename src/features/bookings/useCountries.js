import { useQuery } from "@tanstack/react-query";
import { getCountries } from "../../services/apiBookings";

export default function useCountries() {
  const { isLoading, data: countries } = useQuery({
    queryFn: getCountries,
    queryKey: ["countries"],
  });

  return { isLoading, countries };
}
