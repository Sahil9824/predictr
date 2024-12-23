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
      d="M5.13067 5.78595L9.84472 10.5M9.84472 10.5L14.5588 15.214M9.84472 10.5L14.5588 5.78595M9.84472 10.5L5.13067 15.214"
      stroke="#717272"
      strokeWidth={2}
      strokeLinecap="round"
    />
  </Svg>
);
export default SVGComponent;
