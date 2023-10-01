import * as React from "react"
import Svg, { SvgProps, Rect, Path } from "react-native-svg"

const OutgoingReceiptIcon = (props: SvgProps) => (
  <Svg
    width={48}
    height={48}
    fill="none"
    {...props}
  >
    <Rect width={48} height={48} fill="#2E9958" rx={24} />
    <Path
      fill="#fff"
      d="M19.5 24a.75.75 0 0 1 .75-.75H27v-4.875c0-1.5-1.584-2.625-3-2.625h-7.125a2.627 2.627 0 0 0-2.625 2.625v11.25a2.627 2.627 0 0 0 2.625 2.625h7.5A2.627 2.627 0 0 0 27 29.625V24.75h-6.75a.75.75 0 0 1-.75-.75Zm14.03-.53-3.75-3.75a.75.75 0 0 0-1.06 1.06l2.47 2.47H27v1.5h4.19l-2.47 2.47a.75.75 0 1 0 1.06 1.06l3.75-3.75a.75.75 0 0 0 0-1.06Z"
    />
  </Svg>
)
export default OutgoingReceiptIcon
