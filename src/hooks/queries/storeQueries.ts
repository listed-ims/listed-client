import { GET_STORE, GET_STORES, StoreStatus } from "@listed-constants";
import { getStoreService, getStoresService } from "@listed-services";
import { useQuery } from "@tanstack/react-query";

export const useGetStoreDetails = (storeId?: number) => {
  return useQuery([GET_STORE, storeId], () => getStoreService(storeId), {
    enabled: !!storeId,
  });
};

export const useGetStoreList = (status?: StoreStatus, pageNumber?: number, pageSize?: number) => {
  return useQuery([GET_STORES, {status, pageNumber, pageSize}], () => getStoresService(status, pageNumber, pageSize));
};