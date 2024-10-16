import * as React from "react";
import Svg, { Path } from "react-native-svg";
const SVGComponent = (props) => (
  <Svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M9 12.7499L11.25 14.9999L15 9.74987M12 2.71387C9.73574 4.8641 6.72026 6.04344 3.598 5.99987C3.20084 7.20985 2.99898 8.47537 3 9.74887C3 15.3409 6.824 20.0389 12 21.3719C17.176 20.0399 21 15.3419 21 9.74987C21 8.43987 20.79 7.17887 20.402 5.99887H20.25C17.054 5.99887 14.15 4.75087 12 2.71387Z"
      stroke="#B8B8B8"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default SVGComponent;
