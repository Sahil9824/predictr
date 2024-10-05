import * as React from "react";
import Svg, { Path } from "react-native-svg";
const SVGComponent = (props) => (
  <Svg
    width={28}
    height={19}
    viewBox="0 0 28 19"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      opacity={0.8}
      d="M14.3604 15L16.0309 4.81818H17.2241L15.5536 15H14.3604ZM9.75178 12.2756L9.94567 11.0824H17.6616L17.4677 12.2756H9.75178ZM10.7809 15L12.4513 4.81818H13.6445L11.9741 15H10.7809ZM10.3434 8.7358L10.5373 7.54261H18.2532L18.0593 8.7358H10.3434Z"
      fill="#717272"
    />
  </Svg>
);
export default SVGComponent;
