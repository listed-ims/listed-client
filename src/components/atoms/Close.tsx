import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const Close = (props: SvgProps) => (
  <Svg
    width={16}
    height={16}
    fill="none"
    {...props}
  >
    <Path
      stroke="#2E9958"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.643}
      d="M13.75 13.75 2.25 2.25m11.5 0-11.5 11.5"
    />
  </Svg>
)
export default Close