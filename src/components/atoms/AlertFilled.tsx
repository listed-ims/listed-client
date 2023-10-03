import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const AlertFilled = (props: SvgProps) => (
  <Svg
    width={32}
    height={32}
    fill="none"
    {...props}
  >
    <Path
      fill={props.color}
      d="M16 3C8.832 3 3 8.832 3 16s5.832 13 13 13 13-5.832 13-13S23.168 3 16 3Zm0 19.994a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5Zm1.358-12.572-.36 7.625a1 1 0 0 1-2 0l-.358-7.62v-.004a1.358 1.358 0 1 1 2.715 0h.003Z"
    />
  </Svg>
)
export default AlertFilled
