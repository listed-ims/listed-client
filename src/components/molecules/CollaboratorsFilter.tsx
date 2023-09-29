import React, { useState } from "react";
import { HStack } from "native-base";
import Animated, {
  useAnimatedStyle,
  withDelay,
  withTiming,
} from "react-native-reanimated";
import { ClearFilterIcon, FilterButton } from "@listed-components/atoms";
import { MembershipStatus } from "@listed-types";

interface StoreListFilterGroup {
  filters: MembershipStatus[];
  handleSetFilter: (filter: "ALL" | Omit<MembershipStatus, "DECLINED">) => void;
}

const StoreListFilterGroup = ({
  filters,
  handleSetFilter,
}: StoreListFilterGroup) => {
  const [filter, setFilter] = useState<"ALL" | Omit<MembershipStatus, "DECLINED">>("ALL")
  const [prevFilter, setPrevFilter] = useState<typeof filter>()

  const handleFilterChange = (nextFilter: typeof filter) => {
    setPrevFilter(filter);
    setFilter(nextFilter);
    handleSetFilter(nextFilter);
  }

  const clearFilterAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity:
        filter !== "ALL"
          ? withDelay(250, withTiming(1, { duration: 100 }))
          : withTiming(0, { duration: 100 }),
      transform: [
        {
          translateX:
            filter === "ALL" ? withDelay(200, withTiming(-40)) : withTiming(0),
        },
      ],
    };
  }, [filter]);

  const activeFilterAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity:
        filter !== "INACTIVE" && filter !== "PENDING"
          ? withDelay(300, withTiming(1, { duration: 100 }))
          : withTiming(0, { duration: 100 }),
      transform: [
        {
          translateX:
            filter === "ALL"
              ? withTiming(-40)
              : filter === "ACTIVE"
                ? withTiming(0)
                : withTiming(-72),
        },
      ],
      zIndex: filter === "INACTIVE" || filter === "PENDING" ? -1 : 0,
    };
  }, [filter]);


  const inactiveFilterAnimatedStyle = useAnimatedStyle(() => {
    const opacity = prevFilter === "PENDING" ?
      withDelay(300, withTiming(1, { duration: 100 })) :
      prevFilter === "ACTIVE" ?
        withTiming(1, { duration: 100 }) : undefined;

    return {
      opacity:
        filter !== "ACTIVE" && filter !== "PENDING" ?
          opacity :
          withTiming(0, { duration: 100 }),
      transform: [
        {
          translateX:
            filter === "ALL"
              ? withTiming(-40)
              : filter === "ACTIVE" || filter === "PENDING"
                ? withTiming(0)
                : withTiming(-82),
        },
      ],
      zIndex: filter === "ACTIVE" || filter === "PENDING" ? -1 : 0,
    };
  }, [filter]);


  const pendingFilterAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity:
        filter !== "ACTIVE" && filter !== "INACTIVE"
          ? withTiming(1, { duration: 100 })
          : withTiming(0, { duration: 100 }),
      transform: [
        {
          translateX:
            filter === "ALL"
              ? withTiming(-40)
              : filter === "ACTIVE" || filter === "INACTIVE"
                ? withTiming(0)
                : withTiming(-172),
        },
      ],
    };
  }, [filter]);

  const filterAnimation: Record<string, any> = {
    ACTIVE: activeFilterAnimatedStyle,
    INACTIVE: inactiveFilterAnimatedStyle,
    PENDING: pendingFilterAnimatedStyle,
  };

  return (
    <HStack space="2">
      <Animated.View style={[clearFilterAnimatedStyle]}>
        <ClearFilterIcon
          onPress={() => {
            handleFilterChange("ALL");
          }}
          disabled={filter === "ALL"}
        />
      </Animated.View>
      {
        filters.map((filterItem, index) => {
          return <Animated.View key={index}
            style={[filterAnimation[filterItem]]}>
            <FilterButton
              label={filterItem}
              state={filter === filterItem ? "active" : "inactive"}
              onPress={() => {
                filter === "ALL" ? handleFilterChange(filterItem) : handleFilterChange("ALL");
              }}
              disabled={filter !== filterItem && filter !== "ALL"}
            />
          </Animated.View>
        })
      }
    </HStack>
  );
};

export default StoreListFilterGroup;
