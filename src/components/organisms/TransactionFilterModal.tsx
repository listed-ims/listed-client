import {
  Button,
  CloseIcon,
  IconButton,
  MultiSelectButton,
  ScanIcon,
  SearchIcon,
} from "@listed-components/atoms";
import {
  BottomSheet,
  FormControl,
  TextField,
} from "@listed-components/molecules";
import { OutgoingCategory, Routes } from "@listed-constants";
import { useGetCollaborators } from "@listed-hooks";
import { MembershipStatus, TransactionFilter } from "@listed-types";
import { dateToMMDDYY, localeStringToDate } from "@listed-utils";
import RNDateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { router, useLocalSearchParams } from "expo-router";
import {
  Column,
  HStack,
  Pressable,
  Row,
  Text,
  View,
  useTheme,
} from "native-base";
import { useEffect, useState } from "react";

interface TransactionFilterModalProps {
  filter: TransactionFilter;
  storeId: number;
  transaction: "incoming" | "outgoing";
  open: boolean;
  onDismiss: () => void;
  onApply: (filter: TransactionFilter) => void;
}

const TransactionFilterModal = ({
  filter,
  storeId,
  transaction,
  open,
  onDismiss,
  onApply,
}: TransactionFilterModalProps) => {
  const { productId, product } = useLocalSearchParams();
  const { colors } = useTheme();
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [date, setDate] = useState(new Date());
  const categories = Object.values(OutgoingCategory);
  const [transactionFilter, setTransactionFilter] =
    useState<TransactionFilter>(filter);

  const {
    data: collaboratorsList,
    isError: collaboratorsListError,
    isFetching: collaboratorsListFetching,
    isSuccess: collaboratorsListSuccess,
  } = useGetCollaborators(storeId);

  const handleOnDateChange = (
    event: DateTimePickerEvent,
    datePicked?: Date | undefined
  ) => {
    if (datePicked === undefined) return;
    const selectedDate = localeStringToDate(
      datePicked.toLocaleString("en-US", {
        timeZone: "Asia/Singapore",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        timeZoneName: "short",
      })
    );
    setShowDatePicker(false);
    if (event.type === "dismissed") return;
    setDate(selectedDate!);
    if (selectedDate instanceof Date)
      setTransactionFilter({ ...transactionFilter, date: selectedDate });
  };

  const handleOnApply = () => {
    onApply(transactionFilter);
  };

  const handleOnClear = () => {
    onApply({
      categories: [],
      performers: [],
      product: undefined,
      date: undefined,
    });
    router.setParams({
      productId: "",
      product: "",
    });
  };

  const handleOnDismiss = () => {
    setDate(filter.date || new Date());
    router.setParams({
      productId: filter.product ? filter.product.toString() : "",
      product: filter.product && product ? product.toString() : "",
    });
    setTransactionFilter(filter);
    onDismiss();
  };

  useEffect(() => handleOnClear(), [transaction]);

  useEffect(() => {
    setTransactionFilter({
      ...transactionFilter,
      product: productId ? parseInt(productId.toString()) : undefined,
    });
  }, [productId]);

  return (
    <BottomSheet open={open} onDismiss={handleOnDismiss}>
      <Column alignItems="flex-start" display="flex" space="4" paddingX="2">
        <Row
          display="flex"
          justifyContent="space-between"
          alignSelf="stretch"
          alignItems="center"
        >
          <Text fontSize="md" fontWeight="bold">{`Filter ${transaction === "incoming" ? "Incoming" : "Outgoing"
            }`}</Text>
          <HStack space="2">
            <Button size="sm" borderRadius="full" onPress={handleOnApply}>
              Apply
            </Button>
            <Button
              size="sm"
              variant="outline"
              borderRadius="full"
              onPress={handleOnClear}
            >
              Clear
            </Button>
          </HStack>
        </Row>
        {transaction === "outgoing" && (
          <FormControl
            display="flex"
            alignItems="flex-start"
            label="Outgoing category"
          >
            <Row
              flexWrap="wrap"
              space="2"
              alignContent="flex-start"
              alignItems="flex-start"
              display="flex"
              style={{ rowGap: 8 }}
            >
              {categories.map((category, index) => (
                <MultiSelectButton
                  key={index}
                  label={category}
                  selected={
                    transactionFilter.categories?.includes(category) || false
                  }
                  onPress={() => {
                    transactionFilter.categories?.includes(category)
                      ? setTransactionFilter({
                        ...transactionFilter,
                        categories: transactionFilter.categories.filter(
                          (c) => c !== category
                        ),
                      })
                      : setTransactionFilter({
                        ...transactionFilter,
                        categories: [
                          ...transactionFilter.categories!,
                          category,
                        ],
                      });
                  }}
                />
              ))}
            </Row>
          </FormControl>
        )}
        <FormControl label="Date">
          <Pressable
            onPress={() => setShowDatePicker(true)}
            style={{ flex: 1 }}
          >
            <TextField
              pointerEvents="box-none"
              value={transactionFilter.date ? dateToMMDDYY(date) : ""}
              isReadOnly
              flex="1"
              placeholder="Select date"
              rightElement={
                transactionFilter.date ? (
                  <IconButton
                    variant="subtle"
                    marginRight="2"
                    icon={<CloseIcon />}
                    onPress={() =>
                      setTransactionFilter({
                        ...transactionFilter,
                        date: undefined,
                      })
                    }
                  />
                ) : undefined
              }
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
          <Row
            flexWrap="wrap"
            space="2"
            alignContent="flex-start"
            alignItems="flex-start"
            display="flex"
            style={{ rowGap: 8 }}
          >
            {collaboratorsList
              ?.filter(
                (collaborator) =>
                  collaborator.membershipStatus !== MembershipStatus.PENDING
              )
              .map((collaborator, index) => (
                <MultiSelectButton
                  key={index}
                  label={collaborator.user.name.split(" ")[0]}
                  selected={
                    transactionFilter.performers?.includes(
                      collaborator.user.id
                    ) || false
                  }
                  onPress={() => {
                    transactionFilter.performers?.includes(collaborator.user.id)
                      ? setTransactionFilter({
                        ...transactionFilter,
                        performers: transactionFilter.performers.filter(
                          (id) => id !== collaborator.user.id
                        ),
                      })
                      : setTransactionFilter({
                        ...transactionFilter,
                        performers: [
                          ...transactionFilter.performers!,
                          collaborator.user.id,
                        ],
                      });
                  }}
                />
              ))}
          </Row>
        </FormControl>
        <FormControl display="flex" alignItems="flex-start" label="Product">
          <Row space="2">
            <Pressable
              style={{ flex: 1 }}
              onPress={() => {
                router.push({
                  pathname: Routes.SELECT_PRODUCT,
                  params: {
                    route: Routes.TRANSACTIONS,
                  },
                });
              }}
            >
              <TextField
                pointerEvents="box-none"
                isReadOnly
                flex="1"
                placeholder="Select a product"
                value={product?.toString()}
                rightElement={
                  productId ? (
                    <IconButton
                      variant="subtle"
                      marginRight="2"
                      icon={<CloseIcon />}
                      onPress={() => {
                        setTransactionFilter({
                          ...transactionFilter,
                          product: undefined,
                        });
                        router.setParams({
                          productId: "",
                          product: "",
                        });
                      }}
                    />
                  ) : (
                    <View marginX="3">
                      <SearchIcon />
                    </View>
                  )
                }
              />
            </Pressable>
            <Button fontSize="sm"
              onPress={() => router.push({
                pathname: Routes.BARCODE,
                params: {
                  nextRoute: Routes.TRANSACTIONS,
                },
              })}
              startIcon={<ScanIcon color={colors.white} />}>
              Scan
            </Button>
          </Row>
        </FormControl>
      </Column>
    </BottomSheet>
  );
};

export default TransactionFilterModal;
