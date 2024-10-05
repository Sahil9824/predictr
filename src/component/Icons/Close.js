import * as React from "react";
import Svg, { Path } from "react-native-svg";
const SVGComponent = (props) => (
  <Svg
    width={24}
    height={25}
    viewBox="0 0 24 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M6.15685 6.84315L11.8137 12.5M11.8137 12.5L17.4706 18.1569M11.8137 12.5L17.4706 6.84315M11.8137 12.5L6.15685 18.1569"
      stroke="#717272"
      strokeWidth={1.5}
      strokeLinecap="round"
    />
  </Svg>
);
export default SVGComponent;
