import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";

const CaretForwardIcon = (props: SvgProps) => (
  <Svg width={21} height={21} fill="none" {...props}>
    <Path
      fill="#737373"
      d="m7.924 16.673 6.372-5.46a.938.938 0 0 0 0-1.424L7.924 4.33a.938.938 0 0 0-1.548.712v10.922c0 .8.94 1.232 1.548.71Z"
    />
  </Svg>
);

export default CaretForwardIcon;
