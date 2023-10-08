import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const OptionsIcon = (props: SvgProps) => (
  
  <Svg
    width={16}
    height={16}
    fill="none"
    {...props}
  >
    <Path
      fill="#2E9958"
      d="M2 4.5h7.086a1.5 1.5 0 0 0 2.828 0H14a.5.5 0 0 0 0-1h-2.086a1.5 1.5 0 0 0-2.828 0H2a.5.5 0 1 0 0 1Zm12 7h-2.086a1.5 1.5 0 0 0-2.828 0H2a.5.5 0 0 0 0 1h7.086a1.5 1.5 0 0 0 2.828 0H14a.5.5 0 0 0 0-1Zm0-4H6.914a1.5 1.5 0 0 0-2.828 0H2a.5.5 0 1 0 0 1h2.086a1.5 1.5 0 0 0 2.828 0H14a.5.5 0 0 0 0-1Z"
    />
  </Svg>
)
export default OptionsIcon