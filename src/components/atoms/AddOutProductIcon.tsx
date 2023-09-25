import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

const AddOutProductIcon = (props: SvgProps) => (
  <Svg
    width={16}
    height={16}
    fill="none"
    {...props}
  >
    <Path fill="#2E9958" d="M8 2v12V2Zm6 6H2h12Z" />
    <Path
      stroke="#2E9958"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.333}
      d="M8 2v12m6-6H2"
    />
  </Svg>
)
export default AddOutProductIcon
