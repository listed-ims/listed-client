import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const EnterIcon = (props: SvgProps) => (
  <Svg
    
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <Path
      fill="#525252"
      d="M7.5 6.375v4.875h7.19l-2.47-2.47a.75.75 0 0 1 1.06-1.06l3.75 3.75a.75.75 0 0 1 0 1.06l-3.75 3.75a.75.75 0 0 1-1.06-1.06l2.47-2.47H7.5v4.875a2.628 2.628 0 0 0 2.625 2.625h9.75a2.627 2.627 0 0 0 2.625-2.625V6.375a2.627 2.627 0 0 0-2.625-2.625h-9.75A2.628 2.628 0 0 0 7.5 6.375ZM2.25 11.25a.75.75 0 1 0 0 1.5H7.5v-1.5H2.25Z"
    />
  </Svg>
)
export default EnterIcon