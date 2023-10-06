import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const PeopleIcon = (props: SvgProps) => (
  <Svg
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <Path
      fill="#fff"
      d="M15.75 12c-.964 0-1.896-.43-2.625-1.211a4.683 4.683 0 0 1-1.219-2.86c-.081-1.154.27-2.215.991-2.988.72-.774 1.728-1.191 2.853-1.191 1.117 0 2.127.425 2.845 1.196.725.78 1.078 1.839.997 2.983-.078 1.083-.511 2.098-1.219 2.86-.727.78-1.659 1.211-2.623 1.211Zm6.18 8.25H9.57a1.299 1.299 0 0 1-1.03-.5 1.416 1.416 0 0 1-.247-1.21c.395-1.584 1.373-2.898 2.828-3.8 1.291-.8 2.935-1.24 4.629-1.24 1.727 0 3.328.422 4.627 1.221 1.458.897 2.438 2.219 2.83 3.823a1.418 1.418 0 0 1-.25 1.208 1.296 1.296 0 0 1-1.027.498ZM6.89 12.187c-1.649 0-3.1-1.533-3.234-3.418-.066-.966.235-1.859.844-2.514.603-.648 1.453-1.005 2.39-1.005.938 0 1.782.36 2.388 1.011.614.66.914 1.551.844 2.509-.135 1.884-1.585 3.418-3.231 3.418Zm3.078 1.475c-.824-.403-1.894-.605-3.077-.605-1.38 0-2.722.36-3.777 1.013-1.195.742-2 1.823-2.325 3.128a1.284 1.284 0 0 0 .225 1.095 1.187 1.187 0 0 0 .942.457h5.203a.375.375 0 0 0 .369-.308c.005-.03.011-.059.019-.088.397-1.597 1.329-2.946 2.705-3.93a.374.374 0 0 0-.03-.627 3.777 3.777 0 0 0-.254-.135Z"
    />
  </Svg>
)
export default PeopleIcon