import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

const CalendarIcon = (props: SvgProps) => (
  <Svg
    
    width={16}
    height={16}
    fill="none"
    {...props}
  >
    <Path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.333}
      d="M12.667 2.667H3.333C2.597 2.667 2 3.263 2 4v9.333c0 .737.597 1.333 1.333 1.333h9.334c.736 0 1.333-.596 1.333-1.333V4c0-.737-.597-1.333-1.333-1.333ZM10.667 1.333V4M5.333 1.333V4M2 6.667h12"
    />
  </Svg>
)
export default CalendarIcon
