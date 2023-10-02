import { GET_USER, VALIDATE_USERNAME } from "@listed-constants";
import { getUserService, validateUsernameService } from "@listed-services";
import { useQuery } from "@tanstack/react-query";

export const useGetUserDetails = () => {
  return useQuery([GET_USER], getUserService);
};

export const useValidateUsername = (username: string) => {
  return useQuery(
    [VALIDATE_USERNAME, username],
    () => validateUsernameService(username),
    {
      enabled: !!username,
    }
  );
};
