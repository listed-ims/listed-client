import { GET_INCOMING } from "@listed-constants";
import { getIncomingService } from "@listed-services";
import { useQuery } from "@tanstack/react-query";

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
