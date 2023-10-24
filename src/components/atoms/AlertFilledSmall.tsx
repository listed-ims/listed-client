import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const AlertFilledSmall = (props: SvgProps) => (

  <Svg
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <Path
      fill="#2E9958"
      d="M12 2.25c-5.376 0-9.75 4.374-9.75 9.75s4.374 9.75 9.75 9.75 9.75-4.374 9.75-9.75S17.376 2.25 12 2.25Zm0 14.996a.937.937 0 1 1 0-1.875.937.937 0 0 1 0 1.875Zm1.018-9.43-.269 5.72a.75.75 0 0 1-1.5 0L10.98 7.82v-.003a1.02 1.02 0 1 1 2.036 0h.002Z"
    />
  </Svg>
)
export default AlertFilledSmall
