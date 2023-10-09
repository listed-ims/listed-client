import { AccountIcon, Button } from "@listed-components/atoms";
import { ScreenContainer } from "@listed-components/organisms";
import { useAuth } from "@listed-contexts";
import { useGetUserDetails } from "@listed-hooks";
import {
  Box,
  Center,
  Column,
  Divider,
  Heading,
  Row,
  Text,
  View,
  useTheme,
} from "native-base";

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

      <View>
        <Text fontWeight="medium" color="text.500" marginBottom="1">
          ACCOUNT DETAILS
        </Text>
        <Column
          paddingY="4"
          paddingX="4"
          borderRadius="sm"
          borderWidth="1"
          borderColor="muted.300"
        >
          <Column alignItems="center">
            <Row paddingBottom="1">
              <Text flex="1" fontSize="sm">
                Name:
              </Text>
              <Text flex="1" fontSize="sm" fontWeight="bold">
                {userDetails?.name}
              </Text>
            </Row>

            <Divider />

            <Row paddingTop="1">
              <Text flex="1" fontSize="sm">
                Username:
              </Text>
              <Text flex="1" fontSize="sm" fontWeight="bold">
                {userDetails?.username}
              </Text>
            </Row>
          </Column>
        </Column>
      </View>

      <Button marginTop="6" variant="warnSubtle" onPress={handleLogout}>
        LOGOUT
      </Button>
    </ScreenContainer>
  );
};

export default Account;
