import React from "react";
import { HStack } from "native-base";
import { ClearFilterIcon, FilterButton } from "@listed-components/atoms";
import Animated, { useAnimatedStyle, withDelay, withTiming } from "react-native-reanimated";

interface NotificationsFilterProps {
  filter: "all" | "unread";
  handleSetFilter: (filter: "all" | "unread") => void;
}

const NotificationsFilter = ({ filter, handleSetFilter }: NotificationsFilterProps) => {
  
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
  
  const unreadFilterAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX:
            filter === "all"
              ? withTiming(-40)
              : withTiming(0)
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
      <Animated.View style={[unreadFilterAnimatedStyle]}>
        <FilterButton
          label="unread"
          state={filter === "unread" ? "active" : "inactive"}
          onPress={() => {
          
            handleSetFilter(filter === "unread" ? "all" : "unread");
          }}
        />
      </Animated.View>
    </HStack>
  );
};

export default NotificationsFilter;
