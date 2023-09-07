import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

const BackIcon = (props: SvgProps) => (
  <Svg
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <Path
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2.25}
      d="M11.438 18.75 4.688 12l6.75-6.75M5.625 12h13.688"
    />
  </Svg>
)

export default BackIcon
