import { AccountIcon, Button } from "@listed-components/atoms";
import {
  LogoutModal,
  PermissionDetails,
  ScreenContainer,
} from "@listed-components/organisms";
import { Routes } from "@listed-constants";
import { useAuth } from "@listed-contexts";
import { router } from "expo-router";
import {
  Box,
  Center,
  Column,
  Divider,
  Heading,
  Row,
  ScrollView,
  Text,
  useTheme,
} from "native-base";
import { useState } from "react";

const Account = () => {
  const { logout, userDetails, userMembership } = useAuth();
  const { colors } = useTheme();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogout = () => {
    setShowLogoutModal(true);
  };

  const handleConfirmLogout = () => {
    router.replace(Routes.LOGIN);
    logout();
    setShowLogoutModal(false);
  };

  return (
    <ScreenContainer>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Column space="1" alignItems="center" marginY="8">
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

        <Text fontWeight="medium" color="text.500" marginBottom="1">
          ACCOUNT DETAILS
        </Text>
        <Column
          paddingY="4"
          paddingX="4"
          borderRadius="sm"
          borderWidth="1"
          borderColor="muted.300"
          marginBottom="4"
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
        {userMembership?.permissions && userDetails?.currentStoreId !== null && (
          <PermissionDetails permissions={userMembership?.permissions!} />
        )}

        <Column marginY="6">
          <Button variant="warnSubtle" onPress={handleLogout}>
            LOGOUT
          </Button>
        </Column>

        <LogoutModal
          isOpen={showLogoutModal}
          onCancel={() => setShowLogoutModal(false)}
          onConfirm={handleConfirmLogout}
          modalContent={{
            header: "Confirm Logout",
            body: "You are about to logout of our system. Do you wish to proceed?",
          }}
        />
      </ScrollView>
    </ScreenContainer>
  );
};

export default Account;
