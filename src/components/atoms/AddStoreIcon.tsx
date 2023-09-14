import * as React from "react"
import Svg, {
  SvgProps,
  G,
  Path,
  Circle,
  Rect,
  Defs,
  ClipPath,
} from "react-native-svg"

const AddStoreIcon = (props: SvgProps) => (
  <Svg
    width={96}
    height={96}
    fill="none"
    {...props}
  >
    <G clipPath="url(#a)">
      <Path
        fill="#2E9958"
        d="M21.436 19.55c-.987.437-1.174 1.05-1.187 3.925v2.275L18.124 30l-2.125 4.25v1.775c0 2.25.138 3.162.6 4.162.65 1.375 1.738 2.338 3.212 2.838l.625.212.038 13 .025 13.013h-1.1c-.925 0-1.2.05-1.738.312-1.312.663-1.662 1.5-1.662 4.025 0 2.013.112 2.45.737 2.825.338.2 2.363.213 31.263.213 28.9 0 30.925-.013 31.262-.213.626-.375.738-.812.738-2.825 0-2.525-.35-3.362-1.662-4.025-.538-.262-.813-.312-1.738-.312h-1.1l.025-13.013.037-13.025.5-.15c1.675-.5 2.913-1.675 3.563-3.375.25-.65.288-1.05.35-3.062l.063-2.313-2.113-4.187-2.113-4.188-.062-2.562c-.063-2.813-.137-3.1-.912-3.675l-.35-.263-21.888-.037-21.9-.025-.288.275c-.5.475-.312 1.2.388 1.475.225.087 7.225.125 21.712.125h21.375l-.037 1.837-.038 1.85H22.186l-.037-1.85-.038-1.837h2.238c1.313 0 2.4-.063 2.637-.138.675-.237.863-.987.35-1.462-.274-.263-.387-.275-2.912-.275-1.887.012-2.712.05-2.988.175Zm6.026 7.475a338.7 338.7 0 0 1-1.163 3.25l-1.1 3.1h-6.7l1.625-3.25 1.625-3.25h2.888c2.262 0 2.875.037 2.825.15Zm7.875 0c-.026.087-.35 1.55-.713 3.25l-.675 3.1h-3.35c-1.837 0-3.35-.05-3.35-.1s.513-1.5 1.125-3.213a185.195 185.195 0 0 0 1.125-3.15c0-.025 1.325-.037 2.95-.037 2.313 0 2.938.037 2.888.15Zm7.787 0c0 .087-.088 1.55-.213 3.25l-.212 3.1H35.874l.063-.288c.125-.537 1.312-6.112 1.312-6.162 0-.025 1.325-.05 2.938-.05 2.262 0 2.937.037 2.937.15Zm7.987 2c.076 1.187.188 2.65.226 3.25l.074 1.1H44.587l.075-1.1c.038-.6.15-2.063.225-3.25l.15-2.15H50.962l.15 2.15Zm7.638-2.1c0 .05 1.188 5.625 1.313 6.162l.062.288H53.299l-.212-3.1a155.98 155.98 0 0 1-.213-3.25c0-.113.675-.15 2.938-.15 1.612 0 2.937.025 2.937.05Zm7.75-.013c0 .013.513 1.438 1.125 3.15.625 1.713 1.125 3.163 1.125 3.213 0 .05-1.512.1-3.35.1h-3.35l-.675-3.1a203.43 203.43 0 0 0-.713-3.25c-.05-.113.575-.15 2.888-.15 1.625 0 2.95.012 2.95.037Zm9.375 3.213 1.625 3.25h-6.7l-1.1-3.1a338.7 338.7 0 0 1-1.162-3.25c-.05-.113.562-.15 2.825-.15h2.887l1.625 3.25Zm-51 6.85c0 1.687-.012 1.75-.387 2.512-.675 1.338-1.863 1.988-3.425 1.863-1.288-.113-2.288-.825-2.826-2.038-.237-.512-.287-.912-.337-2.35l-.063-1.712h7.038v1.725Zm8.85.112c-.037 1.613-.075 1.913-.313 2.363-1.4 2.65-5.087 2.562-6.3-.138-.237-.525-.3-.9-.337-2.35l-.05-1.712h7.05l-.05 1.837Zm8.9-.212c0 1.9-.213 2.65-.963 3.425-1.375 1.412-3.7 1.437-5 .062-.812-.875-.962-1.362-1.012-3.337l-.05-1.775h7.025v1.625Zm8.875-.088c0 1.9-.175 2.588-.9 3.4-1.412 1.6-3.787 1.6-5.2 0-.725-.812-.9-1.5-.9-3.4V35.25h7v1.537Zm8.85.238c-.037 1.575-.075 1.85-.325 2.35-1.175 2.25-3.962 2.712-5.688.925-.75-.775-.962-1.525-.962-3.425V35.25h7.025l-.05 1.775Zm8.875-.063c-.038 1.45-.1 1.825-.338 2.35-1.212 2.7-4.9 2.788-6.3.138-.237-.45-.274-.75-.312-2.363l-.05-1.837h7.05l-.05 1.712Zm8.875 0c-.05 1.438-.1 1.838-.338 2.35-.537 1.213-1.537 1.925-2.825 2.038-1.562.125-2.75-.525-3.425-1.863-.374-.762-.387-.825-.387-2.512V35.25h7.038l-.063 1.712ZM27.624 42.6c.813.475 1.825.687 3 .625.925-.038 1.225-.113 1.95-.475a6.239 6.239 0 0 0 1.5-1.063l.625-.65.825.775c1.163 1.1 1.862 1.363 3.663 1.375 1.312 0 1.425-.025 2.237-.425a6.114 6.114 0 0 0 1.513-1.087l.675-.675.337.437c.45.588 1.65 1.375 2.475 1.613.862.25 2.288.25 3.15 0 .825-.238 2.025-1.025 2.475-1.613l.337-.437.675.675c.388.4 1.026.85 1.513 1.087.813.4.925.425 2.238.425 1.8-.012 2.5-.275 3.662-1.375l.825-.775.625.65c.375.375.987.813 1.5 1.063.725.362 1.025.437 1.95.475 1.763.087 2.988-.375 4.175-1.588l.6-.612.675.675c.7.7 1.362 1.1 2.225 1.35l.512.15.038 13.025.025 13.025h-35.25V58.675c0-11.7.037-11.113-.8-11.713l-.387-.275h-6c-6.613 0-6.338-.037-6.9.788-.213.325-.226.925-.263 11.05l-.025 10.725h-1.625l.025-13.025.037-13.025.513-.15c.862-.25 1.525-.65 2.212-1.35l.65-.663.688.65c.375.35.888.763 1.125.913Zm8.875 16.275V69.25H25.874V48.5h10.625v10.375Zm41.262 12.612c.363.363.363.388.363 1.813v1.45h-60.25V73.3c0-1.425 0-1.45.363-1.813l.362-.362h58.8l.362.362Z"
      />
      <Path
        fill="#2E9958"
        d="M41.313 46.875c-.288.137-.626.437-.75.65-.238.4-.25.675-.25 8.35 0 7.4.012 7.962.224 8.35.126.225.4.525.626.65.387.237.737.25 14.537.25h14.138l.425-.288c.9-.587.862-.262.862-8.9 0-7.412-.013-7.775-.25-8.287-.188-.425-.362-.588-.8-.788-.538-.237-.813-.237-6.563-.212-5.687.037-6 .05-6.25.275-.337.312-.35.987-.012 1.325.237.237.413.25 6.125.25h5.875v14.75h-27V48.5H53.838l.262-.288c.337-.362.35-.837.038-1.225l-.238-.3-6.05-.037c-5.837-.025-6.05-.025-6.538.225ZM33.563 56.9c-.488.262-.563.487-.563 1.637 0 1.25.087 1.488.612 1.7.3.125.425.125.738-.037.475-.25.525-.388.525-1.638 0-1.237-.05-1.387-.513-1.625-.412-.225-.474-.225-.8-.037Z"
      />
      <Circle cx={68} cy={65} r={9} fill="#fff" />
      <Path
        stroke="#2E9958"
        strokeMiterlimit={10}
        strokeWidth={1.5}
        d="M77 65c0-4.969-4.031-9-9-9s-9 4.031-9 9 4.031 9 9 9 9-4.031 9-9Z"
      />
      <Path
        stroke="#2E9958"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M68 61.25v7.5M71.75 65h-7.5"
      />
    </G>
    <Rect width={95} height={95} x={0.5} y={0.5} stroke="#60BF86" rx={7.5} />
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M15.999 16h64v64h-64z" />
      </ClipPath>
    </Defs>
  </Svg>
)
export default AddStoreIcon