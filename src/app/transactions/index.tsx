import { Button, CloseIcon, IconButton, MultiSelectButton, OptionsIcon, ScanIcon, SearchIcon} from "@listed-components/atoms";
import { BottomSheet, FormControl, TextField, TransactionListItem } from "@listed-components/molecules";
import { ScreenContainer} from "@listed-components/organisms";
import { Routes } from "@listed-constants";
import { Button, OptionsIcon } from "@listed-components/atoms";
import { TransactionListItem } from "@listed-components/molecules";
import {
  ScreenContainer,
  TransactionFilterModal,
} from "@listed-components/organisms";
import { useAuth } from "@listed-contexts";
import {
  useGetIncomingTransactions,
  useGetOutgoingTransactions,
} from "@listed-hooks";
import { stackHeaderStyles } from "@listed-styles";
import { MembershipStatus} from "@listed-types";
import { dateToMMDDYY, dateToMonthDDYYYY, dateToReadableTime } from "@listed-utils";
import RNDateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { Stack, router } from "expo-router";
import { Box, Column, Divider, FlatList, Pressable, Row, Text, View, useTheme } from "native-base";
import { useState } from "react";
import { TransactionFilter } from "@listed-types";
import {
  dateToMMDDYY,
  dateToMonthDDYYYY,
  dateToReadableTime,
} from "@listed-utils";
import { Stack } from "expo-router";
import {
  Box,
  Column,
  Divider,
  FlatList,
  Row,
  Text,
  useTheme,
} from "native-base";
import { useEffect, useState } from "react";


const transactions = () => {
  const noFilter = {
    categories: [],
    performers: [],
    product: undefined,
    date: undefined,
  } as TransactionFilter;
  const [transaction, setTransaction] = useState<"incoming" | "outgoing">(
    "incoming"
  );
  const { colors } = useTheme();
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);
  const { userDetails } = useAuth();
  const [incomingFilter, setIncomingFilter] = useState(noFilter);
  const [outgoingFilter, setOutgoingFilter] = useState(noFilter);

  const {
    data: incomingTransactions,
    isError: incomingTransactionsError,
    isFetching: incomingTransactionsFetching,
    hasNextPage: incomingTransactionsHasNextPage,
    fetchNextPage: incomingTransactionsFetchNextPage,
  } = useGetIncomingTransactions(
    userDetails?.currentStoreId!,
    incomingFilter.performers?.toString(),
    incomingFilter.product,
    incomingFilter.date?.toISOString().substring(0, 10),
    30
  );

  const {
    data: outgoingTransactions,
    isError: outgoingTransactionsError,
    isFetching: outgoingTransactionsFetching,
    hasNextPage: outgoingTransactionsHasNextPage,
    fetchNextPage: outgoingTransactionsFetchNextPage,
  } = useGetOutgoingTransactions(
    userDetails?.currentStoreId!,
    outgoingFilter.performers?.toString(),
    outgoingFilter.product,
    outgoingFilter.date?.toISOString().substring(0, 10),
    outgoingFilter.categories?.toString(),
    30
  );

  const handleOnApplyFilter = (filter: TransactionFilter) => {
    if (transaction === "incoming") {
      setIncomingFilter(filter);
      setOutgoingFilter(noFilter);
    } else {
      setOutgoingFilter(filter);
      setIncomingFilter(noFilter);
    }
    setIsBottomSheetVisible(false);
  };

  return (
    <ScreenContainer withHeader>
      <Stack.Screen options={stackHeaderStyles("Transactions")} />
      <Row paddingY="4" display="flex" alignItems="center">
        <Text fontWeight="bold" fontSize="lg">
          Transactions
        </Text>
      </Row>
      <Column space="4" display="inline-flex" paddingBottom="4">
        <Row space="2" flex-direction="column" align-items="flex-start">
          <Button
            borderRadius="4"
            flex="1"
            variant={transaction === "incoming" ? "subtle" : "unstyled"}
            onPress={() => setTransaction("incoming")}
          >
            INCOMING
          </Button>

          <Button
            borderRadius="4"
            flex="1"
            variant={transaction === "outgoing" ? "subtle" : "unstyled"}
            onPress={() => setTransaction("outgoing")}
          >
            OUTGOING
          </Button>
        </Row>
        <Button variant="outline" alignSelf="flex-start" px="5" size="sm" borderRadius="full" onPress={toggleBottomSheet} startIcon={<OptionsIcon />}>Filter</Button>
      </Column>

      <Box flex={1} paddingBottom="4">
       {transaction === "incoming" ? 
       <FlatList 
          ItemSeparatorComponent={() => <Divider/>}
          data={incomingTransactions?.pages.flatMap((page) => page)}
          renderItem={({ item }) => (
            <TransactionListItem
             onPress = {() => {
               router.push(`${Routes.INCOMING}/${item.id}`);
              }}
              title={item.product.name}
              name={item.user.name}
              date={dateToMonthDDYYYY(new Date (item.transactionDate.toString()))}
              time={dateToReadableTime(new Date (item.transactionDate.toString()))}
            />
          )}
          onEndReachedThreshold={0.5}
          onEndReached={()=> {
            if(!incomingTransactionsFetching && incomingTransactionsHasNextPage)
            incomingTransactionsFetchNextPage();
          }}
        />:
        <FlatList 
          ItemSeparatorComponent={() => <Divider/>}
          data={outgoingTransactions?.pages.flatMap((page) => page)}
          renderItem={({ item }) => (
            <TransactionListItem
              onPress = {() => {
                router.push(`${Routes.OUTGOING}/${item.id}`);
              }}
              title= {item.category}
              name={item.user.name}
              date={dateToMonthDDYYYY(new Date (item.transactionDate.toString()))}
              time={dateToReadableTime(new Date (item.transactionDate.toString()))}

        <Button
          variant={
            (transaction === "incoming" &&
              JSON.stringify(incomingFilter) === JSON.stringify(noFilter)) ||
            (transaction === "outgoing" &&
              JSON.stringify(outgoingFilter) === JSON.stringify(noFilter))
              ? "outline"
              : "solid"
          }
          alignSelf="flex-start"
          px="5"
          size="sm"
          borderRadius="full"
          onPress={() => setIsBottomSheetVisible(true)}
          startIcon={
            <OptionsIcon
              color={
                (transaction === "incoming" &&
                  JSON.stringify(incomingFilter) ===
                    JSON.stringify(noFilter)) ||
                (transaction === "outgoing" &&
                  JSON.stringify(outgoingFilter) === JSON.stringify(noFilter))
                  ? colors.primary[700]
                  : colors.white
              }
            />
          }
        >
          Filter
        </Button>
      </Column>
      <Box flex={1} paddingBottom="4">
        {transaction === "incoming" ? (
          <FlatList
            ItemSeparatorComponent={() => <Divider />}
            data={incomingTransactions?.pages.flatMap((page) => page)}
            renderItem={({ item }) => (
              <TransactionListItem
                title={item.product.name}
                name={item.user.name}
                date={dateToMonthDDYYYY(
                  new Date(item.transactionDate.toString())
                )}
                time={dateToReadableTime(
                  new Date(item.transactionDate.toString())
                )}
              />
            )}
            onEndReachedThreshold={0.5}
            onEndReached={() => {
              if (
                !incomingTransactionsFetching &&
                incomingTransactionsHasNextPage
              )
                incomingTransactionsFetchNextPage();
            }}
          />
        ) : (
          <FlatList
            ItemSeparatorComponent={() => <Divider />}
            data={outgoingTransactions?.pages.flatMap((page) => page)}
            renderItem={({ item }) => (
              <TransactionListItem
                title={item.category}
                name={item.user.name}
                date={dateToMonthDDYYYY(
                  new Date(item.transactionDate.toString())
                )}
                time={dateToReadableTime(
                  new Date(item.transactionDate.toString())
                )}
              />
            )}
            onEndReachedThreshold={0.5}
            onEndReached={() => {
              if (
                !outgoingTransactionsFetching &&
                outgoingTransactionsHasNextPage
              )
                outgoingTransactionsFetchNextPage();
            }}
          />
        )}
      </Box>
      <TransactionFilterModal
        filter={transaction === "incoming" ? incomingFilter : outgoingFilter}
        storeId={userDetails?.currentStoreId!}
        transaction={transaction}
        open={isBottomSheetVisible}
        onDismiss={() => setIsBottomSheetVisible(false)}
        onApply={handleOnApplyFilter}
      />
    </ScreenContainer>
  );
};
export default transactions;
