import * as React from "react"
import Svg, { SvgProps, G, Path } from "react-native-svg"

const DeleteIcon = (props: SvgProps) => (
  <Svg
    width={12}
    height={12}
    fill="none"
    {...props}
  >
    <G stroke="#2E9958" strokeLinecap="round" strokeLinejoin="round">
      <Path d="M1.5 3h9M9.5 3v7a1 1 0 0 1-1 1h-5a1 1 0 0 1-1-1V3M4 3V2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v1M5 5.5v3M7 5.5v3" />
    </G>
  </Svg>
)
export default DeleteIcon
