import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

interface NotificationsIconProps extends SvgProps {
  selected: boolean
}

const NotificationsIcon = (props: NotificationsIconProps) => {
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
          d="m20.629 15.999-.23-.278c-1.03-1.247-1.655-2-1.655-5.531 0-1.828-.437-3.328-1.3-4.453-.635-.832-1.494-1.462-2.626-1.928a.142.142 0 0 1-.039-.031C14.372 2.414 13.257 1.5 12 1.5c-1.256 0-2.37.914-2.778 2.276a.147.147 0 0 1-.038.03C6.54 4.896 5.256 6.983 5.256 10.189c0 3.533-.623 4.286-1.655 5.531l-.23.279a1.648 1.648 0 0 0-.217 1.763c.289.61.905.988 1.609.988h14.48c.7 0 1.312-.378 1.602-.985A1.648 1.648 0 0 0 20.629 16Zm-8.63 6.501a3.752 3.752 0 0 0 3.303-1.975.187.187 0 0 0-.074-.25.187.187 0 0 0-.092-.025H8.865a.188.188 0 0 0-.167.275A3.753 3.753 0 0 0 12 22.5Z"
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
          stroke="#000"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M15 18v.75a3 3 0 1 1-6 0V18m11.048-1.527c-1.204-1.473-2.054-2.223-2.054-6.285 0-3.72-1.9-5.044-3.463-5.688a.835.835 0 0 1-.466-.495C13.791 3.072 13.022 2.25 12 2.25s-1.79.823-2.062 1.756a.827.827 0 0 1-.467.494c-1.565.645-3.462 1.965-3.462 5.688-.003 4.062-.853 4.812-2.056 6.285-.499.61-.062 1.527.81 1.527h14.479c.868 0 1.302-.92.806-1.527Z"
        />
      </Svg>
    )
}
export default NotificationsIcon
