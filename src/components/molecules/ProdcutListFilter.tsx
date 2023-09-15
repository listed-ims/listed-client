import React from "react";
import { HStack } from "native-base";
import Animated, {
  useAnimatedStyle,
  withDelay,
  withTiming,
} from "react-native-reanimated";
import { ClearFilterIcon, FilterButton } from "@listed-components/atoms";

interface ProductListFilterProps {
  filter: "all" | "low stock" | "no stock";
  handleSetFilter: (filter: "all" | "low stock" | "no stock") => void;
}

const ProdcutListFilter = ({
  filter,
  handleSetFilter,
}: ProductListFilterProps) => {
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
        filter !== "no stock"
          ? withDelay(300, withTiming(1, { duration: 100 }))
          : withTiming(0, { duration: 100 }),
      transform: [
        {
          translateX:
            filter === "all"
              ? withTiming(-40)
              : filter === "low stock"
              ? withTiming(0)
              : withTiming(-72),
        },
      ],
      zIndex: filter === "no stock" ? -1 : 0,
    };
  }, [filter]);

  const closedFilterAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity:
        filter !== "low stock"
          ? withTiming(1, { duration: 100 })
          : withTiming(0, { duration: 100 }),
      transform: [
        {
          translateX:
            filter === "all"
              ? withTiming(-40)
              : filter === "low stock"
              ? withTiming(0)
              : withTiming(-106),
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
          label="low stock"
          state={filter === "low stock" ? "active" : "inactive"}
          onPress={() => {
            filter === "all"
              ? handleSetFilter("low stock")
              : handleSetFilter("all");
          }}
          disabled={filter === "no stock"}
        />
      </Animated.View>
      <Animated.View style={[closedFilterAnimatedStyle]}>
        <FilterButton
          label="no stock"
          state={filter === "no stock" ? "active" : "inactive"}
          onPress={() => {
            filter === "all"
              ? handleSetFilter("no stock")
              : handleSetFilter("all");
          }}
          disabled={filter === "low stock"}
        />
      </Animated.View>
    </HStack>
  );
};

export default ProdcutListFilter;
