import * as React from "react"
import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg"
const StoreInviteIcon = (props: SvgProps) => (
  <Svg
    
    width={12}
    height={12}
    fill="none"
    {...props}
  >
    <G clipPath="url(#a)">
      <Path
        fill="#2E9958"
        d="M9.938 1.875H2.063A1.314 1.314 0 0 0 .75 3.188v5.624a1.314 1.314 0 0 0 1.313 1.313h7.875a1.314 1.314 0 0 0 1.312-1.313V3.189a1.313 1.313 0 0 0-1.312-1.313Zm-.333 2.171L6.23 6.671a.375.375 0 0 1-.46 0L2.395 4.046a.375.375 0 1 1 .46-.592L6 5.9l3.145-2.446a.375.375 0 0 1 .46.592Z"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h12v12H0z" />
      </ClipPath>
    </Defs>
  </Svg>
)
export default StoreInviteIcon
