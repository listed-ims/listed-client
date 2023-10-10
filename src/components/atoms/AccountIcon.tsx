import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

interface AccountIconProps extends SvgProps {
  selected: boolean;
}

const AccountIcon = (props: AccountIconProps) => {
  if (props.selected)
    return (
      <Svg
        width={25}
        height={25}
        fill="none"
        {...props}
      >
        <Path
          fill={props.color}
          d="M15.983 3.297c-.912-.985-2.186-1.527-3.592-1.527-1.414 0-2.692.539-3.6 1.517-.918.99-1.365 2.335-1.26 3.787.208 2.865 2.388 5.196 4.86 5.196 2.472 0 4.648-2.33 4.86-5.195.106-1.44-.344-2.781-1.268-3.778Zm4.658 19.473H4.14a1.453 1.453 0 0 1-1.134-.522 1.655 1.655 0 0 1-.337-1.365c.396-2.194 1.63-4.038 3.57-5.332 1.725-1.15 3.909-1.781 6.15-1.781 2.243 0 4.427.632 6.15 1.78 1.942 1.294 3.176 3.138 3.572 5.333.09.503-.032 1-.337 1.364a1.453 1.453 0 0 1-1.134.523Z"
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
          d="M16.125 6.75c-.184 2.478-2.063 4.5-4.125 4.5s-3.944-2.021-4.125-4.5c-.187-2.578 1.64-4.5 4.125-4.5 2.484 0 4.313 1.969 4.125 4.5Z"
        />
        <Path
          stroke="#000"
          strokeMiterlimit={10}
          strokeWidth={1.5}
          d="M12 14.25c-4.078 0-8.217 2.25-8.983 6.497-.092.512.197 1.003.733 1.003h16.5c.536 0 .826-.491.734-1.003C20.217 16.5 16.078 14.25 12 14.25Z"
        />
      </Svg>
    )
}
export default AccountIcon
