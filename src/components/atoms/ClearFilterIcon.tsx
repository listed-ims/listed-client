import * as React from "react";
import Svg, { SvgProps, Path, G } from "react-native-svg";

const ClearFilterIcon = (props: SvgProps) => (
  <Svg width={32} height={32} fill="none" {...props}>
    <G stroke="#2E9958" strokeWidth={1.5}>
      <Path
        strokeMiterlimit={10}
        d="M30.77 16c0-8.154-6.616-14.77-14.77-14.77S1.23 7.847 1.23 16 7.847 30.77 16 30.77 30.77 24.153 30.77 16Z"
      />
      <Path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m20.923 20.923-9.846-9.846m0 9.846 9.846-9.846"
      />
    </G>
  </Svg>
);

export default ClearFilterIcon;
