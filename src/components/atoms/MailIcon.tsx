import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const MailIcon = (props: SvgProps) => (
  <Svg
    width={16}
    height={16}
    fill="none"
    {...props}
  >
    <Path
      fill="#fff"
      d="M13.25 2.5H2.75A1.752 1.752 0 0 0 1 4.25v7.5a1.752 1.752 0 0 0 1.75 1.75h10.5A1.752 1.752 0 0 0 15 11.75v-7.5a1.752 1.752 0 0 0-1.75-1.75Zm-.443 2.895-4.5 3.5a.5.5 0 0 1-.614 0l-4.5-3.5a.5.5 0 1 1 .614-.79L8 7.867l4.193-3.262a.5.5 0 0 1 .614.79Z"
    />
  </Svg>
)
export default MailIcon
