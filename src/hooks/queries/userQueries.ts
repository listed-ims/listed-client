import { GET_USER, VALIDATE_USERNAME } from "@listed-constants";
import { getUserService, validateUsernameService } from "@listed-services";
import { useQuery } from "@tanstack/react-query";

export const useGetUserDetails = (isLoggedIn: boolean) => {
  return useQuery([GET_USER], getUserService, {enabled: isLoggedIn});
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
