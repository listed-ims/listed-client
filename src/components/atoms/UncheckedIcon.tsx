import * as React from "react"
import Svg, { SvgProps, Rect } from "react-native-svg"
const UncheckedIcon = (props: SvgProps) => (
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
      stroke="#A3A3A3"
      strokeWidth={1.5}
      rx={9.25}
    />
  </Svg>
)
export default UncheckedIcon
