import { GET_OUTGOING } from "@listed-constants";
import { getOutgoingService } from "@listed-services";
import { useQuery } from "@tanstack/react-query";

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
