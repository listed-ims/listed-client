import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

const Checkmark = (props: SvgProps) => (
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
      d="M9.75 3 4.5 9 2.25 6.75"
    />
  </Svg>
)
export default Checkmark
