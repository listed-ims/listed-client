import * as React from "react"
import Svg, { SvgProps, Rect, G, Path, Defs, ClipPath } from "react-native-svg"


const StoreNameIcon = (props: SvgProps) => (
  <Svg
    width={32}
    height={32}
    fill="none"
    {...props}
  >
    <Rect width={32} height={32} fill="#fff" rx={5.333} />
    <G clipPath="url(#a)">
      <Path
        stroke="#2E9958"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.333}
        d="M24 24v-8.667m-16 0V24m-1.334.667h18.667m-8 0v-6.334a1 1 0 0 1 1-1H21a1 1 0 0 1 1 1v6.334m-.73-17.334H10.73c-.908 0-1.728.5-2.08 1.27l-1.805 3.939c-.607 1.325.402 2.827 1.967 2.875h.083c1.308 0 2.369-1.05 2.369-2.177 0 1.125 1.06 2.177 2.369 2.177 1.308 0 2.367-.975 2.367-2.177 0 1.125 1.06 2.177 2.368 2.177 1.309 0 2.37-.975 2.37-2.177 0 1.202 1.06 2.177 2.368 2.177h.081c1.566-.05 2.574-1.55 1.967-2.875l-1.804-3.94c-.353-.769-1.173-1.269-2.08-1.269Zm-10.27 10h3.333a1 1 0 0 1 1 1V22H10v-3.667a1 1 0 0 1 1-1Z"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M5.333 5.333h21.333v21.333H5.333z" />
      </ClipPath>
    </Defs>
  </Svg>
)
export default StoreNameIcon
