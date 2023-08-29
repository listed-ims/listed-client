import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"


const IncomingIcon = (props: SvgProps) => (
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
      d="M9.687 8.563V6.687a1.875 1.875 0 0 1 1.875-1.875h7.5a1.875 1.875 0 0 1 1.875 1.875v11.25a1.875 1.875 0 0 1-1.875 1.875h-7.125c-1.035 0-2.25-.839-2.25-1.875v-1.875"
    />
    <Path
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="m14.187 16.063 3.75-3.75-3.75-3.75m-9.75 3.75h12.75"
    />
  </Svg>
)
export default IncomingIcon
