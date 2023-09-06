import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";

const AddIcon = (props: SvgProps) => (
  <Svg width={16} height={16} fill="none" {...props}>
    <Path fill="#F5F5F5" d="M8 2v12Zm6 6H2Z" />
    <Path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.333}
      d="M8 2v12m6-6H2"
    />
  </Svg>
);

export default AddIcon;
