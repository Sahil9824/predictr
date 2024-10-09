import * as React from "react";
import Svg, { Path } from "react-native-svg";
const SVGComponent = (props) => (
    <Svg
        width={27}
        height={30}
        viewBox="0 0 25 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M4.625 1V2.875M13.375 1V2.875M1.5 14.125V4.75C1.5 4.25272 1.69754 3.77581 2.04917 3.42417C2.40081 3.07254 2.87772 2.875 3.375 2.875H14.625C15.1223 2.875 15.5992 3.07254 15.9508 3.42417C16.3025 3.77581 16.5 4.25272 16.5 4.75V14.125M1.5 14.125C1.5 14.6223 1.69754 15.0992 2.04917 15.4508C2.40081 15.8025 2.87772 16 3.375 16H14.625C15.1223 16 15.5992 15.8025 15.9508 15.4508C16.3025 15.0992 16.5 14.6223 16.5 14.125M1.5 14.125V7.875C1.5 7.37772 1.69754 6.90081 2.04917 6.54917C2.40081 6.19754 2.87772 6 3.375 6H14.625C15.1223 6 15.5992 6.19754 15.9508 6.54917C16.3025 6.90081 16.5 7.37772 16.5 7.875V14.125"
            stroke="#B8B8B8" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"
            fill="#999999"
            {...props}
        />
    </Svg>
);
export default SVGComponent;
