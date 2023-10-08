import { AccountIcon, Button } from "@listed-components/atoms";
import { UserDetails } from "@listed-components/molecules";
import { ScreenContainer } from "@listed-components/organisms";
import { useAuth } from "@listed-contexts";
import { useGetUserDetails } from "@listed-hooks";
import { Box, Center, Column, Heading, Text, useTheme } from "native-base";

const Account = () => {
  const { logout } = useAuth();
  const { colors } = useTheme();
  const handleLogout = () => {
    logout();
  };

  const {
    data: userDetails,
    isError: userError,
    isFetching: userFetching,
    isSuccess: userSuccess,
  } = useGetUserDetails();

  return (
    <ScreenContainer>
      <Column space="1" alignItems="center" marginBottom="8" marginTop="15">
        <Center
          width="12"
          height="12"
          backgroundColor="primary.700"
          borderRadius="full"
        >
          <AccountIcon color={colors.white} selected={true} />
        </Center>
        <Box>
          <Heading fontSize="md">{userDetails?.name}</Heading>
        </Box>
      </Column>

      <UserDetails userDetails={userDetails!} />

      <Button marginTop="6" variant="warnSubtle" onPress={handleLogout}>
        LOGOUT
      </Button>
    </ScreenContainer>
  );
};

export default Account;
