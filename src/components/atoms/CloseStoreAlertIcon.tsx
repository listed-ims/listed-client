import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";

const CloseStoreAlertIcon = (props: SvgProps) => (
  <Svg width={16} height={16} fill="none" {...props}>
    <Path
      stroke="#EF4444"
      strokeMiterlimit={10}
      d="M14 8c0-3.313-2.688-6-6-6-3.313 0-6 2.688-6 6 0 3.313 2.688 6 6 6 3.313 0 6-2.688 6-6Z"
    />
    <Path
      stroke="#EF4444"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M7.82 5.19 8 9l.18-3.81a.18.18 0 1 0-.36 0Z"
    />
    <Path
      fill="#EF4444"
      d="M8 11.497a.625.625 0 1 1 0-1.25.625.625 0 0 1 0 1.25Z"
    />
  </Svg>
);

export default CloseStoreAlertIcon;
