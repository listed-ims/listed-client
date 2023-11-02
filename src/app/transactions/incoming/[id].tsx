import { IncomingReceiptIcon } from "@listed-components/atoms";
import { IncomingReceiptDetails, ReceiptLoadingSkeleton} from "@listed-components/molecules";
import { ScreenContainer } from "@listed-components/organisms";
import { Routes } from "@listed-constants";
import { useAuth } from "@listed-contexts";
import { useGetIncomingDetails } from "@listed-hooks";
import { stackHeaderStyles } from "@listed-styles";
import { UserPermission } from "@listed-types";
import { dateToMonthDDYYYY, dateToReadableTime, hasPermission } from "@listed-utils";
import { Stack, router, useLocalSearchParams } from "expo-router";
import { Column, ScrollView, Text } from "native-base";
import { useEffect } from "react";


const transactiondetails = () => {

  const { id } = useLocalSearchParams();
  const { userMembership } = useAuth();

  useEffect(() => {
    if (!hasPermission(
      userMembership!,
      UserPermission.GET_INCOMING_DETAILS
    ))
      router.replace(Routes.UNAUTHORIZED)

  }, [userMembership])

  const {
    data: transactionDetails,
    isError: transactionError,
    isFetching: transactionFetching,
  } = useGetIncomingDetails(parseInt(id as string));

  const transactionDate = new Date(
    transactionDetails?.transactionDate.toString()!
  );

  const userPermissions = userMembership?.permissions || [];


  return (
    <ScreenContainer withHeader>
      <Stack.Screen options={stackHeaderStyles("Transaction Details")} />
      <ScrollView showsVerticalScrollIndicator={false}>
      {transactionFetching ? (
           <ReceiptLoadingSkeleton/>
          ): (
            <>
        <Column space="1" paddingTop="6" alignItems="center" justifyContent="center" display="flex">
          <IncomingReceiptIcon />
          <Text fontSize="md" fontWeight="bold" paddingTop="1">Incoming</Text>
          <Text fontSize="xs" fontWeight="medium">
            {dateToMonthDDYYYY(transactionDate) +
              " - " +
              dateToReadableTime(transactionDate)}
          </Text>   
        </Column>
        <IncomingReceiptDetails incomingDetails={transactionDetails!} userPermissions={userPermissions!}/>
         </>
        )}
      </ScrollView>
    </ScreenContainer>
  );
}
export default transactiondetails;