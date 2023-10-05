import { AddIcon, Button, NoStoreIcon } from "@listed-components/atoms";
import { Routes } from "@listed-constants";
import { router } from "expo-router";
import { Text, Column, VStack, useTheme } from "native-base";

const NoStoreFound = () => {
  const { colors } = useTheme();

  return (
    <VStack flex={1}>
      <Column alignItems="center" justifyContent="center" mx={8} height="full">
        <NoStoreIcon />
        <Column alignItems="center" space={1} py={4} alignSelf="stretch">
          <Text fontSize="lg" fontWeight="semibold">
            No store found
          </Text>
          <Column>
            <Text textAlign="center">You don’t have any store yet.</Text>
            <Text textAlign="center">Create one or wait for an invite.</Text>
          </Column>
        </Column>
        <Button
          size="sm"
          px="4"
          startIcon={<AddIcon color={colors.white} />}
          borderRadius="full"
          onPress={() => {
            router.push(Routes.NEW_STORE);
          }}
        >
          Add Store
        </Button>
      </Column>
    </VStack>
  );
};

export default NoStoreFound;
