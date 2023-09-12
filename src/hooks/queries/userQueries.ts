import { GET_USER } from "@listed-constants";
import { getUserService } from "@listed-services";
import { useQuery } from "@tanstack/react-query";

export const useGetUserDetails = () => {
  return useQuery([GET_USER], getUserService);
};
