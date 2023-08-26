import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

interface HomeIconProps extends SvgProps {
  selected: boolean
}

const HomeIcon = (props: HomeIconProps) => {
  if (props.selected)
    return (
      <Svg
        width={24}
        height={24}
        fill="none"
        {...props}
      >
        <Path
          fill="#2E9958"
          d="M13.086 1.898a1.679 1.679 0 0 0-2.171 0l-8.393 7.12a1.679 1.679 0 0 0-.593 1.28v10.523A1.679 1.679 0 0 0 3.607 22.5h5.316a.84.84 0 0 0 .84-.84v-6.993h4.475v6.994c0 .463.376.839.84.839h5.315a1.679 1.679 0 0 0 1.679-1.679V10.3a1.679 1.679 0 0 0-.593-1.28l-8.393-7.12Z"
        />
      </Svg>
    )
  else
    return (
      <Svg
        width={24}
        height={24}
        fill="none"
        {...props}
      >
        <Path
          fill="#000"
          fillRule="evenodd"
          d="M10.915 1.898a1.679 1.679 0 0 1 2.17 0l8.394 7.12a1.679 1.679 0 0 1 .593 1.28v10.523a1.679 1.679 0 0 1-1.679 1.679H13.96a.84.84 0 0 1-.84-.84v-6.993h-2.238v6.994a.84.84 0 0 1-.84.839H3.608a1.679 1.679 0 0 1-1.678-1.679V10.3c0-.492.217-.961.593-1.28l8.393-7.12ZM12 3.178l-8.393 7.12v10.523h5.596v-6.994a.84.84 0 0 1 .839-.839h3.917a.84.84 0 0 1 .839.84v6.993h5.595V10.3L12 3.179Z"
          clipRule="evenodd"
        />
      </Svg>
    )
}
export default HomeIcon
