import * as React from "react";
import Svg, { Path } from "react-native-svg";
const SVGComponent = (props) => (
  <Svg
    width={12}
    height={12}
    viewBox="0 0 12 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M3.32188 3.72124L5.91461 6.31396M5.91461 6.31396L8.50733 8.90669M5.91461 6.31396L8.50733 3.72124M5.91461 6.31396L3.32188 8.90669"
      stroke="white"
      strokeWidth={2}
      strokeLinecap="round"
    />
  </Svg>
);
export default SVGComponent;
