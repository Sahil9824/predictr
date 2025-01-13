import * as React from "react";
import Svg, { Rect, Defs, LinearGradient, Stop } from "react-native-svg";
const SVGComponent = (props) => (
  <Svg
    width={141}
    height={5}
    viewBox="0 0 141 5"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Rect
      width={140}
      height={5}
      rx={2.5}
      transform="matrix(1 0 0 -1 0.5 5)"
      fill="url(#paint0_linear_2973_31701)"
    />
    <Defs>
      <LinearGradient
        id="paint0_linear_2973_31701"
        x1={140}
        y1={2.5}
        x2={0}
        y2={2.5}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#F0F3F5" />
        <Stop offset={0.15} stopColor="#DADFE3" />
        <Stop offset={0.85} stopColor="#DADFE3" />
        <Stop offset={1} stopColor="#F0F3F5" />
      </LinearGradient>
    </Defs>
  </Svg>
);
export default SVGComponent;
