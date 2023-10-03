import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const SmallMail = (props: SvgProps) => (
  <Svg
    width={13}
    height={12}
    fill="none"
    {...props}
  >
    <Path
      fill="#2E9958"
      d="M10.438 1.875H2.561A1.314 1.314 0 0 0 1.25 3.187v5.625a1.314 1.314 0 0 0 1.313 1.313h7.874a1.314 1.314 0 0 0 1.313-1.313V3.187a1.314 1.314 0 0 0-1.313-1.312Zm-.333 2.17L6.73 6.672a.375.375 0 0 1-.46 0L2.895 4.046a.375.375 0 1 1 .46-.592L6.5 5.9l3.145-2.446a.375.375 0 0 1 .46.592Z"
    />
  </Svg>
)
export default SmallMail
