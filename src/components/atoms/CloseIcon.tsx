import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const CloseIcon = (props: SvgProps) => (
  <Svg
    width={12}
    height={12}
    fill="none"
    {...props}
  >
    <Path
      stroke="#2E9958"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M10.313 10.313 1.687 1.687m8.626 0-8.626 8.626"
    />
  </Svg>
)
export default CloseIcon
