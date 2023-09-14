import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const ArrowIcon = (props: SvgProps) => (
  <Svg
    width={25}
    height={24}
    fill="none"
    {...props}
  >
    <Path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2.25}
      d="m13.063 5.25 6.75 6.75-6.75 6.75M18.875 12H5.187"
    />
  </Svg>
)
export default ArrowIcon
