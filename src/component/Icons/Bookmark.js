import * as React from "react";
import Svg, { Path } from "react-native-svg";
const SVGComponent = (props) => (
  <Svg
    width={20}
    height={21}
    viewBox="0 0 20 21"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M15.999 18.5L9.99902 15.1667L3.99902 18.5V5.16667C3.99902 4.72464 4.17964 4.30072 4.50113 3.98816C4.82262 3.67559 5.25865 3.5 5.71331 3.5H14.2847C14.7394 3.5 15.1754 3.67559 15.4969 3.98816C15.8184 4.30072 15.999 4.72464 15.999 5.16667V18.5Z"
      stroke="#717272"
      strokeWidth={1.25}
      strokeLinecap="round"
      {...props}
    />
  </Svg>
);
export default SVGComponent;
