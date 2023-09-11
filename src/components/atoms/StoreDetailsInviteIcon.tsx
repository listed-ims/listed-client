import * as React from "react";
import Svg, { SvgProps, Circle, Path } from "react-native-svg";

const StoreDetailsInviteIcon = (props: SvgProps) => (
  <Svg width={25} height={24} fill="none" {...props}>
    <Circle cx={12.5} cy={12} r={12} fill="#fff" />
    <Path
      fill="#2E9958"
      d="M16.438 7.875H8.563A1.314 1.314 0 0 0 7.25 9.187v5.625a1.314 1.314 0 0 0 1.313 1.313h7.874a1.314 1.314 0 0 0 1.313-1.313V9.187a1.314 1.314 0 0 0-1.313-1.312Zm-.333 2.17-3.375 2.626a.376.376 0 0 1-.46 0l-3.375-2.625a.374.374 0 1 1 .46-.592L12.5 11.9l3.145-2.446a.375.375 0 0 1 .46.592Z"
    />
  </Svg>
);

export default StoreDetailsInviteIcon;
