import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const ChekIcon = (props: SvgProps) => (

  <Svg
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <Path
      fill={props.color || "#fff"}
      d="M12 2.25c-5.376 0-9.75 4.374-9.75 9.75s4.374 9.75 9.75 9.75 9.75-4.374 9.75-9.75S17.376 2.25 12 2.25Zm5.074 6.482-6.3 7.5a.748.748 0 0 1-.562.268h-.013a.75.75 0 0 1-.557-.248l-2.7-3a.751.751 0 0 1 .88-1.186c.09.045.17.107.234.182l2.123 2.36 5.747-6.84a.75.75 0 0 1 1.148.964Z"
    />
  </Svg>
)
export default ChekIcon