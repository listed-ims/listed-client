import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const ScanIcon = (props: SvgProps) => (
  <Svg
    width={16}
    height={16}
    fill="none"
    {...props}
  >
    <Path
      fill="#fff"
      fillRule="evenodd"
      stroke="#fff"
      strokeWidth={0.292}
      d="M1.429 8.428H14.57a.429.429 0 0 0 0-.857H1.43a.429.429 0 0 0 0 .857ZM5.429 1h-2a1.57 1.57 0 0 0-1.572 1.571v2.572a.429.429 0 0 0 .857 0V2.57a.714.714 0 0 1 .715-.714h2a.429.429 0 0 0 0-.857ZM5.429 14.143h-2a.714.714 0 0 1-.715-.715v-2.571a.429.429 0 0 0-.857 0v2.571A1.57 1.57 0 0 0 3.43 15h2a.429.429 0 0 0 0-.857ZM10.571 1.857h2a.714.714 0 0 1 .715.714v2.572a.429.429 0 0 0 .857 0V2.57A1.57 1.57 0 0 0 12.57 1h-2a.429.429 0 0 0 0 .857ZM10.571 15h2a1.57 1.57 0 0 0 1.572-1.572v-2.571a.429.429 0 0 0-.857 0v2.571a.714.714 0 0 1-.715.714h-2a.429.429 0 0 0 0 .858Z"
      clipRule="evenodd"
    />
  </Svg>
)
export default ScanIcon
