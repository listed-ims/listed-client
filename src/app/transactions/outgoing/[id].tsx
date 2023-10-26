import { OutgoingReceiptIcon } from "@listed-components/atoms";
import { OutgoingReceiptDetails } from "@listed-components/molecules";
import { ScreenContainer } from "@listed-components/organisms";
import { Routes } from "@listed-constants";
import { useAuth } from "@listed-contexts";
import { useGetOutgoingDetails } from "@listed-hooks";
import { stackHeaderStyles } from "@listed-styles";
import { UserPermission } from "@listed-types";
import { dateToMonthDDYYYY, dateToReadableTime, hasPermission, toTitleCase } from "@listed-utils";
import { Stack, router, useLocalSearchParams } from "expo-router";
import { Column, ScrollView, Text } from "native-base";
import { useEffect } from "react";

const transactiondetails = () => {

  const { id } = useLocalSearchParams();
  const { userMembership } = useAuth();

  useEffect(() => {
    if (!hasPermission(
      userMembership!,
      UserPermission.GET_OUTGOING_DETAILS
    ))
      router.replace(Routes.UNAUTHORIZED)
  }, [userMembership])

  const {
    data: transactionDetails,
    isError: transactionError,
    isFetching: transactionFetching,
  } = useGetOutgoingDetails(parseInt(id as string));

  const transactionDate = new Date(
    transactionDetails?.transactionDate.toString()!
  );

  const userPermission = userMembership?.permissions || [];


  return (
    <ScreenContainer withHeader>
      <Stack.Screen options={stackHeaderStyles("Transaction Details")} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Column space="1" paddingTop="6" alignItems="center" justifyContent="center" display="flex">
          <OutgoingReceiptIcon />
          <Text fontSize="md" fontWeight="bold" paddingTop="1">Outgoing - {toTitleCase(String(transactionDetails?.category))} </Text>
          <Text fontSize="xs" fontWeight="medium">
            {dateToMonthDDYYYY(transactionDate) +
              " - " +
              dateToReadableTime(transactionDate)}
          </Text>
        </Column>
        <OutgoingReceiptDetails outgoingDetails={transactionDetails!} userPermissions={userPermission!} />

      </ScrollView>
    </ScreenContainer>
  )
}
export default transactiondetails 