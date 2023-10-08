import { Button, MultiSelectButton, OptionsIcon, ScanIcon, SearchIcon} from "@listed-components/atoms";
import { BottomSheet, FormControl, TextField, TransactionListItem } from "@listed-components/molecules";
import { ScreenContainer } from "@listed-components/organisms";
import { useAuth } from "@listed-contexts";
import { useGetIncomingTransactions, useGetOutgoingTransactions } from "@listed-hooks";
import { stackHeaderStyles } from "@listed-styles";
import { dateToMonthDDYYYY, dateToReadableTime} from "@listed-utils";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import { Stack } from "expo-router";
import { Box, Column, Divider, FlatList, Pressable, Row, Text, View, useTheme } from "native-base";
import { useState } from "react";


const transactions = () => {
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const { colors } = useTheme();
  const [date, setDate] = useState(new Date());
  const {userDetails} = useAuth();
  const [transaction,setTransaction] = useState<"incoming" | "outgoing">("incoming");

  const {
    data: incomingTransactions,
    isError: incomingTransactionsError,
    isFetching: incomingTransactionsFetching,
    hasNextPage: incomingTransactionsHasNextPage,
    fetchNextPage: incomingTransactionsFetchNextPage,
  } = useGetIncomingTransactions(userDetails?.currentStoreId!,undefined,undefined,null,10);

  const{
    data: outgoingTransactions,
    isError: outgoingTransactionsError,
    isFetching: outgoingTransactionsFetching,
    hasNextPage: outgoingTransactionsHasNextPage,
    fetchNextPage: outgoingTransactionsFetchNextPage,
  } = useGetOutgoingTransactions(userDetails?.currentStoreId!,undefined,undefined,null,undefined,10);


  const toggleBottomSheet = () => {
    setIsBottomSheetVisible(true);
  };


  return (
    <ScreenContainer withHeader>
      <Stack.Screen options={stackHeaderStyles("Transactions")} />
      <Row paddingY="4" display="flex" alignItems="center">
        <Text fontWeight="bold" fontSize="lg">Transactions</Text>
      </Row>
      <Column space="4" display="inline-flex" paddingBottom="4">
        <Row space="2" flex-direction="column" align-items="flex-start" >
          <Button borderRadius="4" flex="1" 
          variant={transaction === "incoming"? "subtle" : "unstyled" }
          onPress={()=>setTransaction("incoming")} > INCOMING</Button>

          <Button borderRadius="4" flex="1" 
          variant={transaction === "outgoing" ? "subtle" : "unstyled"}
          onPress={()=>setTransaction("outgoing")}> OUTGOING</Button>
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
              title={item.product.name}
              username={item.user.username}
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
              title= {item.category}
              username={item.user.username}
              date={dateToMonthDDYYYY(new Date (item.transactionDate.toString()))}
              time={dateToReadableTime(new Date (item.transactionDate.toString()))}
            />
          )}
          onEndReachedThreshold={0.5}
          onEndReached={()=>{
            if (!outgoingTransactionsFetching && outgoingTransactionsHasNextPage)
            outgoingTransactionsFetchNextPage();
          }}
        />
        }
      </Box>
      <BottomSheet open={isBottomSheetVisible} onDismiss={() => setIsBottomSheetVisible(false)}>
        <Column alignItems="flex-start" display="flex" space="6" padding="6">
          <Row display="flex" justifyContent="space-between" alignSelf="stretch" alignItems="center">
            <Text fontSize="md" fontWeight="bold">Filter Outgoing</Text>
            <Button borderRadius="md">DONE</Button>
          </Row>
          <FormControl display="flex" alignItems="flex-start" label="Outgoing category">
            <Row flexWrap="wrap" space="2" alignContent="flex-start" alignItems="flex-start" display="flex" style={{rowGap:8}}>
              <MultiSelectButton label={"SALES"} selected={true}/>
              <MultiSelectButton label={"DEFECTS"} selected={false}/>
              <MultiSelectButton label={"EXPIRED"} selected={false}/>
              <MultiSelectButton label={"LOST"} selected={false}/>
              <MultiSelectButton label={"CONSUMED"} selected={false}/>
            </Row>
          </FormControl>
          <FormControl label="Date">
            <Pressable
              onPress={() => { setShowDatePicker(true) }}
              style={{ flex: 1 }}>
              <TextField
                isReadOnly
                flex="1"
                placeholder="Select expiration date"
              />

            </Pressable>
            {showDatePicker && (
              <RNDateTimePicker
                accentColor={colors.primary[700]}
                value={date}
                mode="date"
                onChange={(event, date) => {
                  setDate(date!);
                  setShowDatePicker(false);
                }}
              />
            )}
          </FormControl>
          <FormControl display="flex" alignItems="flex-start" label="Performer">
            <Row flexWrap="wrap" space="2"  alignContent="flex-start" alignItems="flex-start" display="flex" style={{rowGap:8}}>
              <MultiSelectButton label={"Abigirl"} selected={true}/>
              <MultiSelectButton label={"Jemyboy"} selected={false}/>
              <MultiSelectButton label={"Monic"} selected={false}/>
              <MultiSelectButton label={"Deveru"} selected={false}/>
            </Row>
          </FormControl>
          <FormControl display="flex" alignItems="flex-start" label="Product">
            <Row flex="2">
              <Pressable style={{ flex: 1 }}
              // onPress={() => {
              //   router.push(Routes.SELECT_PRODUCT)
              // }}
              >
                <TextField
                  isReadOnly
                  flex="1"
                  placeholder="Select a product"
                  // value={product?.toString()}
                  rightElement={
                    <View marginX="3">
                      <SearchIcon />
                    </View>
                  }
                />
              </Pressable>
              <Button fontSize="sm" startIcon={<ScanIcon color={colors.white} />}>
                Scan
              </Button>
            </Row>
          </FormControl>
        </Column>
      </BottomSheet>
    </ScreenContainer>
  );
}
export default transactions;