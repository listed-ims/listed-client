import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const AlbumsIcon = (props: SvgProps) => (
 
    <Svg
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <Path
      fill="#525252"
      d="M17.25 4.5H6.75a.75.75 0 0 1 0-1.5h10.5a.75.75 0 1 1 0 1.5Zm1.5 2.25H5.25a.75.75 0 0 1 0-1.5h13.5a.75.75 0 1 1 0 1.5ZM19.647 21H4.353a2.106 2.106 0 0 1-2.103-2.103V9.603A2.106 2.106 0 0 1 4.353 7.5h15.294a2.106 2.106 0 0 1 2.103 2.103v9.294A2.106 2.106 0 0 1 19.647 21Z"
    />
  </Svg>
)
export default AlbumsIcon