import * as React from "react";
import Svg, { G, Ellipse, Defs } from "react-native-svg";
/* SVGR has dropped some elements not supported by react-native-svg: filter */
const SVGComponent = (props) => (
  <Svg
    width={143}
    height={234}
    viewBox="0 0 143 234"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <G filter="url(#filter0_f_1825_29482)">
      <Ellipse
        cx={147.084}
        cy={107.117}
        rx={48}
        ry={22.5}
        transform="rotate(-17.8316 147.084 107.117)"
        fill="white"
      />
    </G>
    <Defs></Defs>
  </Svg>
);
export default SVGComponent;
