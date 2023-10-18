
import * as React from "react"
import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg"
const ExpirationIcon = (props: SvgProps) => (
  <Svg
    
    width={12}
    height={11}
    fill="none"
    {...props}
  >
    <G clipPath="url(#a)">
      <Path
        fill="#2E9958"
        d="M10.667 2.834a1.334 1.334 0 0 0-1.334-1.333H9v-.324a.34.34 0 0 0-.317-.343.333.333 0 0 0-.35.333v.334H3.667v-.324a.34.34 0 0 0-.318-.343.333.333 0 0 0-.35.333v.334h-.332a1.333 1.333 0 0 0-1.334 1.333v.25a.083.083 0 0 0 .084.083h9.166a.083.083 0 0 0 .084-.083v-.25Zm-9.334 6a1.333 1.333 0 0 0 1.334 1.333h6.666a1.334 1.334 0 0 0 1.334-1.333V3.917a.083.083 0 0 0-.084-.083H1.417a.083.083 0 0 0-.084.083v4.917Z"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M.667.166h10.667v10.667H.667z" />
      </ClipPath>
    </Defs>
  </Svg>
)
export default ExpirationIcon