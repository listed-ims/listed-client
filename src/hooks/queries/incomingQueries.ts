import { GET_INCOMING, GET_INCOMING_TRANSACTIONS } from "@listed-constants";
import { getIncomingListService, getIncomingService } from "@listed-services";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

const fiveMinutes = 1000 * 60 * 5;

export const useGetIncomingDetails = (transactionId?: number) => {
  return useQuery(
    [GET_INCOMING, transactionId],
    () => getIncomingService(transactionId!),
    {
      enabled: !!transactionId,
      staleTime: fiveMinutes,
    }
  );
};

export const useGetIncomingTransactions = (
  storeId: number,
  userIds?: number[],
  productId?: number,
  date?: Date | null,
  pageSize?: number
) => {
  return useInfiniteQuery([GET_INCOMING_TRANSACTIONS,
    {
      storeId,
      userIds,
      productId,
      date,
      pageSize
    }], ({ pageParam = 1 }) => getIncomingListService(storeId,
      userIds,
      productId,
      date,
      pageParam,
      pageSize
    ), {
    enabled: !!storeId,
    getNextPageParam: (lastPage, pages) =>
      lastPage.length < pageSize!
        ? undefined
        : pages.length + 1
  })
}

