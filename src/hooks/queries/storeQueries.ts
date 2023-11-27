import { GET_STORE, GET_STORES } from "@listed-constants";
import { getStoreService, getStoresService } from "@listed-services";
import { StoreResponse } from "@listed-types";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
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

export const useGetStoreList = (pageSize?: number) => {
  return useInfiniteQuery(
    [GET_STORES, { pageSize }],
    ({ pageParam = 1 }) => getStoresService(pageParam, pageSize),
    {
      getNextPageParam: (lastPage, pages) =>
        lastPage.length < pageSize! ? undefined : pages.length + 1,
    }
  );
};
