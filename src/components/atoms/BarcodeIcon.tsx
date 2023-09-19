import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

const BarcodeIcon = (props: SvgProps) => (
  <Svg
   
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <Path
      fill="#525252"
      d="M19.647 4.5h-.006l-1.643.015L6 4.5h-.008l-1.722.015c-1.133.003-2.02.926-2.02 2.104v10.794c0 1.179.89 2.102 2.025 2.102h.007l1.72-.015L18 19.515h.008l1.644-.015a2.105 2.105 0 0 0 2.099-2.103V6.603A2.106 2.106 0 0 0 19.647 4.5ZM6.75 15a.75.75 0 1 1-1.5 0V9a.75.75 0 0 1 1.5 0v6Zm3 1.5a.75.75 0 1 1-1.5 0v-9a.75.75 0 0 1 1.5 0v9Zm3-.75a.75.75 0 1 1-1.5 0v-7.5a.75.75 0 1 1 1.5 0v7.5Zm3 .75a.75.75 0 1 1-1.5 0v-9a.75.75 0 1 1 1.5 0v9Zm3-1.5a.75.75 0 1 1-1.5 0V9a.75.75 0 1 1 1.5 0v6Z"
    />
  </Svg>
)
export default BarcodeIcon