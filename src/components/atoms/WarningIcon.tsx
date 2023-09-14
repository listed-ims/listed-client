import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";

const WarningIcon = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" {...props}>
    <Path
      fill="#DC2626"
      d="M21.05 18.707 13.061 3.87c-.566-1.052-2.075-1.052-2.641 0L2.43 18.707a1.5 1.5 0 0 0 1.319 2.211h15.979a1.5 1.5 0 0 0 1.321-2.211Zm-9.31-.086a.938.938 0 1 1 0-1.876.938.938 0 0 1 0 1.876Zm1.019-9.429-.27 5.719a.75.75 0 0 1-1.5 0l-.268-5.716a1.018 1.018 0 0 1 1.007-1.064h.01a1.02 1.02 0 0 1 1.019 1.064l.002-.003Z"
    />
  </Svg>
);

export default WarningIcon;
