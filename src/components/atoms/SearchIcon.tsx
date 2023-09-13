import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const SearchIcon = (props: SvgProps) => (
  <Svg
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <Path
      stroke="#666"
      strokeMiterlimit={10}
      strokeWidth={1.5}
      d="M10.364 3a7.364 7.364 0 1 0 0 14.727 7.364 7.364 0 0 0 0-14.727Z"
    />
    <Path
      stroke="#666"
      strokeLinecap="round"
      strokeMiterlimit={10}
      strokeWidth={1.5}
      d="M15.857 15.857 21 21"
    />
  </Svg>
)
export default SearchIcon