import * as React from "react"
import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg"

const PriceTagIcon = (props: SvgProps) => (
  <Svg
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <G fill="#525252" clipPath="url(#a)">
      <Path d="M21 8.616V2.85a2.092 2.092 0 0 0-2.096-2.1h-5.762c-.378 0-.74.15-1.008.417L.614 12.683a2.103 2.103 0 0 0 0 2.97l5.484 5.484a2.102 2.102 0 0 0 2.968 0L20.583 9.624c.267-.268.416-.63.417-1.008ZM16.5 6.75a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Z" />
      <Path d="M23.25 3a.75.75 0 0 0-.75.75v5.97L10.25 21.97a.751.751 0 1 0 1.06 1.06L23.593 10.75A1.398 1.398 0 0 0 24 9.75v-6a.75.75 0 0 0-.75-.75Z" />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h24v24H0z" />
      </ClipPath>
    </Defs>
  </Svg>
)
export default PriceTagIcon