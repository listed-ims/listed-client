import * as React from "react"
import Svg, { SvgProps, G, Path } from "react-native-svg"

const OutProductScanIcon = (props: SvgProps) => (
  <Svg
    width={15}
    height={16}
    fill="none"
    {...props}
  >
    <G
      fill="#2E9958"
      fillRule="evenodd"
      stroke="#2E9958"
      strokeWidth={0.292}
      clipRule="evenodd"
    >
      <Path d="M.929 8.428H14.07a.429.429 0 0 0 0-.857H.93a.429.429 0 0 0 0 .857ZM4.929 1h-2a1.57 1.57 0 0 0-1.572 1.571v2.572a.429.429 0 0 0 .857 0V2.57a.714.714 0 0 1 .715-.714h2a.429.429 0 0 0 0-.857ZM4.929 14.143h-2a.714.714 0 0 1-.715-.715v-2.571a.429.429 0 0 0-.857 0v2.571A1.57 1.57 0 0 0 2.93 15h2a.429.429 0 0 0 0-.857ZM10.071 1.857h2a.714.714 0 0 1 .715.714v2.572a.429.429 0 0 0 .857 0V2.57A1.57 1.57 0 0 0 12.07 1h-2a.429.429 0 0 0 0 .857ZM10.071 15h2a1.57 1.57 0 0 0 1.572-1.572v-2.571a.429.429 0 0 0-.857 0v2.571a.714.714 0 0 1-.715.714h-2a.429.429 0 0 0 0 .858Z" />
    </G>
  </Svg>
)
export default OutProductScanIcon
