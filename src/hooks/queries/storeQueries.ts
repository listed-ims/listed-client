import { GET_STORE, GET_STORES } from "@listed-constants";
import { getStoreService, getStoresService } from "@listed-services";
import { StoreResponse } from "@listed-types";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const useGetStoreDetails = (storeId?: number) => {
  return useQuery<StoreResponse, AxiosError<{ message: string }>>(
    [GET_STORE, storeId],
    () => getStoreService(storeId),
    {
      enabled: !!storeId,
    }
  );
};

export const useGetStoreList = (pageNumber?: number, pageSize?: number) => {
  return useQuery([GET_STORES, { pageNumber, pageSize }], () =>
    getStoresService(pageNumber, pageSize)
  );
};
