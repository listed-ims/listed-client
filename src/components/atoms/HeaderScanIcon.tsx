import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";

const HeaderScanIcon = (props: SvgProps) => (
  <Svg width={20} height={20} fill="none" {...props}>
    <Path
      fill="#000"
      fillRule="evenodd"
      stroke="#000"
      strokeWidth={0.365}
      d="M1.786 10.536h16.428a.536.536 0 0 0 0-1.072H1.786a.536.536 0 0 0 0 1.072ZM6.786 1.25h-2.5A1.963 1.963 0 0 0 2.32 3.214V6.43a.536.536 0 0 0 1.072 0V3.214a.893.893 0 0 1 .893-.893h2.5a.536.536 0 0 0 0-1.071ZM6.786 17.678h-2.5a.893.893 0 0 1-.893-.893v-3.214a.536.536 0 0 0-1.072 0v3.214a1.963 1.963 0 0 0 1.965 1.965h2.5a.536.536 0 0 0 0-1.072ZM13.214 2.321h2.5a.893.893 0 0 1 .893.893V6.43a.536.536 0 0 0 1.072 0V3.214a1.963 1.963 0 0 0-1.965-1.964h-2.5a.536.536 0 0 0 0 1.071ZM13.214 18.75h2.5a1.963 1.963 0 0 0 1.964-1.965v-3.214a.536.536 0 0 0-1.071 0v3.214a.893.893 0 0 1-.893.893h-2.5a.536.536 0 0 0 0 1.072Z"
      clipRule="evenodd"
    />
  </Svg>
);

export default HeaderScanIcon;
