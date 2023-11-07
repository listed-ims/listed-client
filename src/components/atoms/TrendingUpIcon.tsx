import * as React from "react";
import Svg, { SvgProps, G, Path } from "react-native-svg";

const TrendingUpIcon = (props: SvgProps) => (
  <Svg width={20} height={21} fill="none" {...props}>
    <G
      stroke="#2E9958"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.25}
    >
      <Path d="M13.75 6.125h4.375V10.5" />
      <Path d="m1.875 14.875 4.741-4.741a1.25 1.25 0 0 1 1.768 0l1.982 1.982a1.251 1.251 0 0 0 1.768 0L17.5 6.75" />
    </G>
  </Svg>
);

export default TrendingUpIcon;
