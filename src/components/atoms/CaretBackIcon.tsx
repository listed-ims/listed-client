import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";

const CaretBackIcon = (props: SvgProps) => (
  <Svg width={21} height={21} fill="none" {...props}>
    <Path
      fill="#737373"
      d="m13.076 4.328-6.372 5.46a.937.937 0 0 0 0 1.424l6.372 5.46a.938.938 0 0 0 1.547-.712V5.038c0-.8-.939-1.233-1.547-.71Z"
    />
  </Svg>
);

export default CaretBackIcon;
