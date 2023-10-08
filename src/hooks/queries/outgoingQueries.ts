import { GET_OUTGOING, GET_OUTGOING_TRANSACTIONS, OutgoingCategory } from "@listed-constants";
import { getOutgoingListService, getOutgoingService } from "@listed-services";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

const fiveMinutes = 1000 * 60 * 5;

export const useGetOutgoingDetails = (transactionId?: number) => {
  return useQuery(
    [GET_OUTGOING, transactionId],
    () => getOutgoingService(transactionId!),
    {
      enabled: !!transactionId,
      staleTime: fiveMinutes,
    }
  );
};

export const useGetOutgoingTransactions =(
  storeId: number,
  userIds?: number[],
  productId?: number,
  date?: Date | null,
  categories?: OutgoingCategory[],
  pageSize?: number
) => {
  return useInfiniteQuery([GET_OUTGOING_TRANSACTIONS,
    {
      storeId,
      userIds,
      productId,
      date,
      categories,
      pageSize
    }], ({ pageParam = 1 }) => getOutgoingListService(
      storeId,
      userIds,
      productId,
      date,
      categories,
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