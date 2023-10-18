import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const LowStockIcon = (props: SvgProps) => (
  <Svg
    
    width={12}
    height={13}
    fill="none"
    {...props}
  >
    <Path
      fill="#2E9958"
      d="m1.063 4.798 4.368 5.56c.07.09.158.162.256.212a.698.698 0 0 0 .626 0 .761.761 0 0 0 .257-.211l4.368-5.561c.416-.53.07-1.35-.57-1.35H1.631c-.64 0-.986.82-.568 1.35Z"
    />
  </Svg>
)
export default LowStockIcon