import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"


const OutgoingIcon = (props: SvgProps) => (
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
      strokeWidth={1.5}
      d="M14.75 15.75v1.875a1.875 1.875 0 0 1-1.875 1.875h-7.5A1.875 1.875 0 0 1 3.5 17.625V6.375A1.875 1.875 0 0 1 5.375 4.5H12.5c1.036 0 2.25.84 2.25 1.875V8.25m3 7.5L21.5 12l-3.75-3.75m-9 3.75h12"
    />
  </Svg>
)
export default OutgoingIcon
