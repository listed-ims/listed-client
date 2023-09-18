import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";

const HeaderSearchIcon = (props: SvgProps) => (
  <Svg width={20} height={20} fill="none" {...props}>
    <Path
      stroke={props.color || "#000"}
      strokeMiterlimit={10}
      strokeWidth={1.25}
      d="M8.636 2.5a6.136 6.136 0 1 0 0 12.273 6.136 6.136 0 0 0 0-12.273Z"
    />
    <Path
      stroke={props.color || "#000"}
      strokeLinecap="round"
      strokeMiterlimit={10}
      strokeWidth={1.25}
      d="M13.214 13.214 17.5 17.5"
    />
  </Svg>
);

export default HeaderSearchIcon;
