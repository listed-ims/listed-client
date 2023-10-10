import { Button, CloseIcon, IconButton, MultiSelectButton, OptionsIcon, ScanIcon, SearchIcon} from "@listed-components/atoms";
import { BottomSheet, FormControl, TextField, TransactionListItem } from "@listed-components/molecules";
import { ScreenContainer} from "@listed-components/organisms";
import { Routes } from "@listed-constants";
import { useAuth } from "@listed-contexts";
import { useGetCollaborators, useGetIncomingTransactions, useGetOutgoingTransactions } from "@listed-hooks";
import { stackHeaderStyles } from "@listed-styles";
import { MembershipStatus} from "@listed-types";
import { dateToMMDDYY, dateToMonthDDYYYY, dateToReadableTime } from "@listed-utils";
import RNDateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { Stack, router } from "expo-router";
import { Box, Column, Divider, FlatList, Pressable, Row, Text, View, useTheme } from "native-base";
import { useState } from "react";


const transactions = () => {
  const { colors } = useTheme();
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [date, setDate] = useState(new Date());
  const [transaction,setTransaction] = useState<"incoming" | "outgoing">("incoming");
  const { userDetails, userMembership } = useAuth();

  const [filter,setFilter] = useState({
    categories: [] as string[],
    performers: [] as number[],
    product: "",
    date: "",
  })

  const {
    data: incomingTransactions,
    isError: incomingTransactionsError,
    isFetching: incomingTransactionsFetching,
    hasNextPage: incomingTransactionsHasNextPage,
    fetchNextPage: incomingTransactionsFetchNextPage,
  } = useGetIncomingTransactions(
    userDetails?.currentStoreId!,
    undefined,
    undefined,
    null,
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
    undefined,
    undefined,
    null,
    undefined,
    30
  );


  const toggleBottomSheet = () => {
    setIsBottomSheetVisible(true);
  };

  const {
    data: collaboratorsList,
    isError: collaboratorsListError,
    isFetching: collaboratorsListFetching,
    isSuccess: collaboratorsListSuccess,
  } = useGetCollaborators(
    userDetails?.currentStoreId as number,
  )

  const handleOnDateChange = (
    event: DateTimePickerEvent,
    date?: Date | undefined
  ) => {
    setShowDatePicker(false);
    if (event.type === "dismissed") return;
    setDate(date!)
    if (date instanceof Date) {
      setFilter({...filter, "date": dateToMMDDYY(date)});
    }
  };

  const handleOnFilterDone = () => {
    setIsBottomSheetVisible(false);
  }
  
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
        <Column alignItems="flex-start" display="flex" space="4" paddingX="2">
          <Row display="flex" justifyContent="space-between" alignSelf="stretch" alignItems="center">
            <Text fontSize="md" fontWeight="bold">{`Filter ${transaction === "incoming" ? "Incoming" : "Outgoing"}`}</Text>
            <Button borderRadius="md" onPress={handleOnFilterDone}>DONE</Button>
          </Row>
          { transaction === "outgoing" && 
          <FormControl display="flex" alignItems="flex-start" label="Outgoing category">
            <Row flexWrap="wrap" space="2" alignContent="flex-start" alignItems="flex-start" display="flex" style={{rowGap:8}}>
              {["SALES", "DEFECTS", "EXPIRED", "LOST", "CONSUMED"].map((category, index) => (
                <MultiSelectButton 
                  key={index}
                  label={category} 
                  selected={filter.categories.includes(category)} 
                  onPress={() => {
                    filter.categories.includes(category)
                      ? setFilter({...filter, "categories": filter.categories.filter(c => c !== category)})
                      : setFilter({...filter, "categories": [...filter.categories, category]})
                  }}
                />
              ))}
            </Row>
          </FormControl>
          }
          <FormControl label="Date">
            <Pressable
              onPress={() => { setShowDatePicker(true) }}
              style={{ flex: 1 }}>
              <TextField
                value={filter.date}
                isReadOnly
                flex="1"
                placeholder="Select date"
                rightElement={filter.date !== "" ?
                  <IconButton variant="subtle" marginRight="2"
                    icon={<CloseIcon />}
                    onPress={() => setFilter({...filter, "date": ""})}
                  /> : undefined}
              />

            </Pressable>
            {showDatePicker && (
              <RNDateTimePicker
                accentColor={colors.primary[700]}
                maximumDate={new Date()}
                value={date}
                mode="date"
                onChange={handleOnDateChange}
              />
            )}
          </FormControl>
          <FormControl display="flex" alignItems="flex-start" label="Performer">
            <Row flexWrap="wrap" space="2"  alignContent="flex-start" alignItems="flex-start" display="flex" style={{rowGap:8}}>
              {collaboratorsList?.filter(collaborator => collaborator.membershipStatus!== MembershipStatus.PENDING).map((collaborator, index) => (
                <MultiSelectButton 
                  key={index} 
                  label={collaborator.user.name.split(" ")[0]} 
                  selected={filter.performers.includes(collaborator.user.id)}
                  onPress={() => {
                    filter.performers.includes(collaborator.user.id)
                      ? setFilter({...filter, "performers": filter.performers.filter(id => id !== collaborator.user.id)})
                      : setFilter({...filter, "performers": [...filter.performers, collaborator.user.id]})
                  }}
                />)
              )}
            </Row>
          </FormControl>
          <FormControl display="flex" alignItems="flex-start" label="Product">
            <Row space="2">
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
              <Button fontSize="sm" startIcon={<ScanIcon color={colors.white}/>}>
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