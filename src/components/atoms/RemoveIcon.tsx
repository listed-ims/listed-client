import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

const RemoveIcon = (props: SvgProps) => (
  <Svg
    width={12}
    height={12}
    fill="none"
    {...props}
  >
    <Path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.33}
      d="M10.5 6h-9"
    />
  </Svg>
)
export default RemoveIcon
