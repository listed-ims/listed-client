import React from "react";
import { HStack } from "native-base";
import Animated, {
  useAnimatedStyle,
  withDelay,
  withTiming,
} from "react-native-reanimated";
import { ClearFilterIcon, FilterButton } from "@listed-components/atoms";

interface StoreListFilterGroup {
  filter: "all" | "open" | "closed";
  handleSetFilter: (filter: "all" | "open" | "closed") => void;
}

const StoreListFilterGroup = ({
  filter,
  handleSetFilter,
}: StoreListFilterGroup) => {
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

  const openFilterAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity:
        filter !== "closed"
          ? withDelay(300, withTiming(1, { duration: 100 }))
          : withTiming(0, { duration: 100 }),
      transform: [
        {
          translateX:
            filter === "all"
              ? withTiming(-40)
              : filter === "open"
                ? withTiming(0)
                : withTiming(-72),
        },
      ],
      zIndex: filter === "closed" ? -1 : 0,
    };
  }, [filter]);

  const closedFilterAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity:
        filter !== "open"
          ? withTiming(1, { duration: 100 })
          : withTiming(0, { duration: 100 }),
      transform: [
        {
          translateX:
            filter === "all"
              ? withTiming(-40)
              : filter === "open"
                ? withTiming(0)
                : withTiming(-72),
        },
      ],
    };
  }, [filter]);

  return (
    <HStack space="2">
      <Animated.View style={[clearFilterAnimatedStyle]}>
        <ClearFilterIcon
          onPress={() => {
            handleSetFilter("all");
          }}
          disabled={filter === "all"}
        />
      </Animated.View>
      <Animated.View style={[openFilterAnimatedStyle]}>
        <FilterButton
          label="open"
          state={filter === "open" ? "active" : "inactive"}
          onPress={() => {
            filter === "all" ? handleSetFilter("open") : handleSetFilter("all");
          }}
          disabled={filter === "closed"}
        />
      </Animated.View>
      <Animated.View style={[closedFilterAnimatedStyle]}>
        <FilterButton
          label="closed"
          state={filter === "closed" ? "active" : "inactive"}
          onPress={() => {
            filter === "all"
              ? handleSetFilter("closed")
              : handleSetFilter("all");
          }}
          disabled={filter === "open"}
        />
      </Animated.View>
    </HStack>
  );
};

export default StoreListFilterGroup;
