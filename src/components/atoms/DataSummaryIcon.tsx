import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"


const DataSummaryIcon = (props: SvgProps) => (
  <Svg
    width={64}
    height={64}
    fill="none"
    {...props}
  >
    <Path
      fill="#fff"
      d="M2 4v2h28V2H2v2ZM47.188 2.175c-.513.225-1.038.862-1.126 1.362-.037.225-.062 3.188-.037 6.588l.038 6.187.312.563c.175.3.5.687.737.837l.438.3 6.588-.037c6.437-.038 6.6-.038 6.937-.3.912-.675 1.087-1.538.75-3.738-.925-6.087-5.65-10.837-11.7-11.75-1.462-.225-2.438-.225-2.938-.012ZM2 12v2h18v-4H2v2Z"
    />
    <Path
      fill="#fff"
      d="M37.813 10.175c-2.963.487-5.588 1.825-7.7 3.937-6.038 6.038-5.338 15.963 1.5 21.163 1.075.812 3.312 1.9 4.55 2.225 3.662.925 7.125.55 10.362-1.15 4.063-2.125 6.738-6.013 7.363-10.688.25-1.912.062-2.687-.813-3.337-.325-.25-.55-.263-4.612-.325-3.838-.05-4.325-.088-4.738-.3-.525-.25-1.287-1.038-1.512-1.55-.1-.225-.163-1.7-.213-4.613-.062-4.062-.075-4.287-.325-4.612-.512-.7-.862-.863-1.9-.888a13.18 13.18 0 0 0-1.962.138ZM10 24.162c-.613.2-1.662 1.275-1.85 1.913C8.037 26.462 8 29.9 8 40.3V54h12V40.3c0-10.225-.038-13.838-.15-14.2-.075-.275-.388-.775-.688-1.1-.862-.963-1.1-1-5.212-.988-2.175.013-3.675.063-3.95.15ZM28 40.162c-.613.2-1.663 1.275-1.85 1.913-.112.375-.15 2.112-.15 6.225V54h12v-5.7c0-4.05-.038-5.85-.15-6.2-.075-.275-.388-.775-.688-1.1-.862-.963-1.1-1-5.212-.988-2.175.013-3.675.063-3.95.15ZM46 46.162c-.612.2-1.663 1.275-1.85 1.913-.1.337-.15 1.462-.15 3.225V54h12v-2.7c0-1.738-.05-2.888-.15-3.2-.075-.275-.388-.775-.688-1.1-.862-.963-1.1-1-5.212-.988-2.175.013-3.675.063-3.95.15ZM2 60v2h60v-4H2v2Z"
    />
  </Svg>
)
export default DataSummaryIcon
