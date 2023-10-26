import { Button, OptionsIcon } from "@listed-components/atoms";
import { Routes } from "@listed-constants";
import { TransactionListItem } from "@listed-components/molecules";
import {
  NoTransactions,
  ScreenContainer,
  TransactionFilterModal,
} from "@listed-components/organisms";
import { useAuth } from "@listed-contexts";
import {
  useGetIncomingTransactions,
  useGetOutgoingTransactions,
} from "@listed-hooks";
import { stackHeaderStyles } from "@listed-styles";
import { TransactionFilter, UserPermission } from "@listed-types";
import {
  dateToMonthDDYYYY,
  dateToReadableTime,
  hasPermission,
} from "@listed-utils";
import { Stack, router } from "expo-router";
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
  const { userDetails, userMembership } = useAuth();
  const [incomingFilter, setIncomingFilter] = useState(noFilter);
  const [outgoingFilter, setOutgoingFilter] = useState(noFilter);
  const [filtered, setFiltered] = useState(false);

  useEffect(() => {
    if (!hasPermission(userMembership!, UserPermission.GET_TRANSACTIONS_LIST))
      router.replace(Routes.UNAUTHORIZED);
  }, [userMembership])

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
    JSON.stringify(filter) !== JSON.stringify(noFilter)
      ? setFiltered(true)
      : setFiltered(false);

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
        {(filtered ||
          (transaction === "incoming" && incomingTransactions?.pages[0].length! > 0) ||
          (transaction === "outgoing" && outgoingTransactions?.pages[0].length! > 0)) &&
          <Button
            variant={
              filtered
                ? "solid"
                : "outline"
            }
            alignSelf="flex-start"
            px="5"
            size="sm"
            borderRadius="full"
            onPress={() => setIsBottomSheetVisible(true)}
            startIcon={
              <OptionsIcon
                color={
                  filtered
                    ? colors.white
                    : colors.primary[700]
                }
              />
            }
          >
            Filter
          </Button>
        }
      </Column>
      <Box flex={1} paddingBottom="4">
        {transaction === "incoming" && (incomingTransactions?.pages[0].length! > 0 || filtered) ? (
          <FlatList
            contentContainerStyle={{ flexGrow: 1 }}
            ListEmptyComponent={<NoTransactions filtered={true} />}
            ItemSeparatorComponent={() => <Divider />}
            data={incomingTransactions?.pages.flatMap((page) => page)}
            renderItem={({ item }) => (
              <TransactionListItem
                onPress={() => {
                  router.push(`${Routes.INCOMING}/${item.id}`);
                }}
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
        ) : transaction === "outgoing" && (outgoingTransactions?.pages[0].length! > 0 || filtered) ? (
          <FlatList
            contentContainerStyle={{ flexGrow: 1 }}
            ListEmptyComponent={<NoTransactions filtered={true} />}
            ItemSeparatorComponent={() => <Divider />}
            data={outgoingTransactions?.pages.flatMap((page) => page)}
            renderItem={({ item }) => (
              <TransactionListItem
                onPress={() => {
                  router.push(`${Routes.OUTGOING}/${item.id}`);
                }}
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
        ) : <NoTransactions />
        }
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
