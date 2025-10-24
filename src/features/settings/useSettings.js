import { useQuery } from "@tanstack/react-query";

import { getSettings } from "../../services/apiSettings";

function useSettings() {
  const {
    isLoading,
    status,
    error,
    data: settings,
  } = useQuery({
    queryFn: getSettings,
    queryKey: ["settings"],
  });

  return {
    isLoading,
    settings,
    error,
    status,
  };
}

export default useSettings;
