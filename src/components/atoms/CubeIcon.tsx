import * as React from "react"
import Svg, { SvgProps, Rect, Path } from "react-native-svg"

const CubeIcon = (props: SvgProps) => (
  <Svg
    width={48}
    height={48}
    fill="none"
    {...props}
  >
    <Rect width={48} height={48} fill="#2E9958" rx={24} />
    <Path
      fill="#fff"
      d="M32.667 18.389a.187.187 0 0 0 0-.324l-7.16-4.16a3.006 3.006 0 0 0-3.015 0l-7.158 4.16a.187.187 0 0 0 0 .324l8.572 5.043a.187.187 0 0 0 .19 0l8.571-5.043Zm-18.136 1.275a.188.188 0 0 0-.256.07.187.187 0 0 0-.025.094v8.151a2.25 2.25 0 0 0 1.117 1.94l7.602 4.558a.187.187 0 0 0 .281-.162v-9.457a.186.186 0 0 0-.094-.163l-8.625-5.03ZM24.75 24.89v9.422a.187.187 0 0 0 .281.163l7.601-4.558a2.249 2.249 0 0 0 1.118-1.938v-8.151a.187.187 0 0 0-.281-.162l-8.625 5.063a.186.186 0 0 0-.094.162Z"
    />
  </Svg>
)
export default CubeIcon