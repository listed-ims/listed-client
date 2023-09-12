import { GET_STORE } from "@listed-constants";
import { getStoreService } from "@listed-services";
import { useQuery } from "@tanstack/react-query";

export const useGetStoreDetails = (storeId?: number) => {
  return useQuery([GET_STORE, storeId], () => getStoreService(storeId), {
    enabled: !!storeId,
  });
};
