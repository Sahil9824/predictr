import * as React from "react";
import Svg, { Path } from "react-native-svg";
const SVGComponent = (props) => (
  <Svg
    width={25}
    height={24}
    viewBox="0 0 25 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M6.75 21H3.25C2.7 21 2.25 20.55 2.25 20V10C2.25 9.45 2.7 9 3.25 9H6.75C7.3 9 7.75 9.45 7.75 10V20C7.75 20.55 7.3 21 6.75 21ZM14 3H10.5C9.95 3 9.5 3.45 9.5 4V20C9.5 20.55 9.95 21 10.5 21H14C14.55 21 15 20.55 15 20V4C15 3.45 14.55 3 14 3ZM21.25 11H17.75C17.2 11 16.75 11.45 16.75 12V20C16.75 20.55 17.2 21 17.75 21H21.25C21.8 21 22.25 20.55 22.25 20V12C22.25 11.45 21.8 11 21.25 11Z"
      fill="#999999"
      {...props}
    />
  </Svg>
);
export default SVGComponent;
