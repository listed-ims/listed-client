import React, { useState } from "react";
import { HStack } from "native-base";
import Animated, {
  useAnimatedStyle,
  withDelay,
  withTiming,
} from "react-native-reanimated";
import { ClearFilterIcon, FilterButton } from "@listed-components/atoms";

interface StoreListFilterGroup {
  filter: "all" | "active" | "inactive" | "pending";
  handleSetFilter: (filter: "all" | "active" | "inactive" | "pending") => void;
}

const StoreListFilterGroup = ({
  filter,
  handleSetFilter,
}: StoreListFilterGroup) => {
  const [prevFilter, setPrevFilter] = useState<typeof filter>()

  const handleFilterChange = (nextFilter: typeof filter) => {
    setPrevFilter(filter);
    handleSetFilter(nextFilter);
  }

  const clearFilterAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity:
        filter !== "all"
          ? withDelay(250, withTiming(1, { duration: 100 }))
          : withTiming(0, { duration: 100 }),
      transform: [
        {
          translateX:
            filter === "all" ? withDelay(200, withTiming(-40)) : withTiming(0),
        },
      ],
    };
  }, [filter]);

  const activeFilterAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity:
        filter !== "inactive" && filter !== "pending"
          ? withDelay(300, withTiming(1, { duration: 100 }))
          : withTiming(0, { duration: 100 }),
      transform: [
        {
          translateX:
            filter === "all"
              ? withTiming(-40)
              : filter === "active"
                ? withTiming(0)
                : withTiming(-72),
        },
      ],
      zIndex: filter === "inactive" || filter === "pending" ? -1 : 0,
    };
  }, [filter]);


  const inactiveFilterAnimatedStyle = useAnimatedStyle(() => {
    const opacity = prevFilter === "pending" ?
      withDelay(300, withTiming(1, { duration: 100 })) :
      prevFilter === "active" ?
        withTiming(1, { duration: 100 }) : undefined;

    return {
      opacity:
        filter !== "active" && filter !== "pending" ?
          opacity :
          withTiming(0, { duration: 100 }),
      transform: [
        {
          translateX:
            filter === "all"
              ? withTiming(-40)
              : filter === "active" || filter === "pending"
                ? withTiming(0)
                : withTiming(-82),
        },
      ],
      zIndex: filter === "active" || filter === "pending" ? -1 : 0,
    };
  }, [filter]);


  const pendingFilterAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity:
        filter !== "active" && filter !== "inactive"
          ? withTiming(1, { duration: 100 })
          : withTiming(0, { duration: 100 }),
      transform: [
        {
          translateX:
            filter === "all"
              ? withTiming(-40)
              : filter === "active" || filter === "inactive"
                ? withTiming(0)
                : withTiming(-172),
        },
      ],
    };
  }, [filter]);

  return (
    <HStack space="2">
      <Animated.View style={[clearFilterAnimatedStyle]}>
        <ClearFilterIcon
          onPress={() => {
            handleFilterChange("all");
          }}
          disabled={filter === "all"}
        />
      </Animated.View>
      <Animated.View style={[activeFilterAnimatedStyle]}>
        <FilterButton
          label="active"
          state={filter === "active" ? "active" : "inactive"}
          onPress={() => {
            filter === "all" ? handleFilterChange("active") : handleFilterChange("all");
          }}
          disabled={filter === "inactive" || filter === "pending"}
        />
      </Animated.View>
      <Animated.View style={[inactiveFilterAnimatedStyle]}>
        <FilterButton
          label="inactive"
          state={filter === "inactive" ? "active" : "inactive"}
          onPress={() => {
            filter === "all"
              ? handleFilterChange("inactive")
              : handleFilterChange("all");
          }}
          disabled={filter === "active" || filter === "pending"}
        />
      </Animated.View>
      <Animated.View style={[pendingFilterAnimatedStyle]}>
        <FilterButton
          label="pending"
          state={filter === "pending" ? "active" : "inactive"}
          onPress={() => {
            filter === "all"
              ? handleFilterChange("pending")
              : handleFilterChange("all");
          }}
          disabled={filter === "active" || filter === "inactive"}
        />
      </Animated.View>
    </HStack>
  );
};

export default StoreListFilterGroup;
