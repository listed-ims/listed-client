import * as React from "react"
import Svg, { SvgProps, Rect, Path } from "react-native-svg"
const IncomingReceiptIcon= (props: SvgProps) => (
  <Svg
    width={48}
    height={48}
    fill="none"
    {...props}
  >
    <Rect width={48} height={48} fill="#2E9958" rx={24} />
    <Path
      fill="#fff"
      d="M19.5 18.375v4.875h7.19l-2.47-2.47a.75.75 0 0 1 1.06-1.06l3.75 3.75a.75.75 0 0 1 0 1.06l-3.75 3.75a.75.75 0 0 1-1.06-1.06l2.47-2.47H19.5v4.875a2.627 2.627 0 0 0 2.625 2.625h9.75a2.627 2.627 0 0 0 2.625-2.625v-11.25a2.627 2.627 0 0 0-2.625-2.625h-9.75a2.627 2.627 0 0 0-2.625 2.625Zm-5.25 4.875a.75.75 0 1 0 0 1.5h5.25v-1.5h-5.25Z"
    />
  </Svg>
)
export default IncomingReceiptIcon
