import * as React from "react"
import Svg, { SvgProps, Rect, Path } from "react-native-svg"

const CheckedIcon = (props: SvgProps) => (
  <Svg
    width={20}
    height={21}
    fill="none"
    {...props}
  >
    <Rect
      width={18.5}
      height={18.5}
      x={0.75}
      y={1.25}
      fill="#2E9958"
      stroke="#2E9958"
      strokeWidth={1.5}
      rx={9.25}
    />
    <Path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.33}
      d="m15 6.5-7 8-3-3"
    />
  </Svg>
)
export default CheckedIcon
