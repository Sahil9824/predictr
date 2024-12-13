import * as React from "react";
import Svg, { Path } from "react-native-svg";
const SVGComponent = (props) => (
  <Svg
    width={14}
    height={14}
    viewBox="0 0 14 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M3.59152 3.70017L6.89135 7M6.89135 7L10.1912 10.2998M6.89135 7L10.1912 3.70017M6.89135 7L3.59152 10.2998"
      stroke="#151B26"
      strokeWidth={1.125}
      strokeLinecap="round"
    />
  </Svg>
);
export default SVGComponent;
