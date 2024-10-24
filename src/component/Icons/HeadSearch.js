import * as React from "react";
import Svg, { Path } from "react-native-svg";
const SVGComponent = (props) => (
  <Svg
    width={18}
    height={18}
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M14.6003 8.33627C14.6003 9.60199 14.225 10.8393 13.5218 11.8917C12.8186 12.9441 11.8191 13.7644 10.6498 14.2488C9.48043 14.7332 8.19369 14.86 6.95228 14.6131C5.71087 14.3662 4.57054 13.7568 3.67549 12.8618C2.78044 11.9669 2.17087 10.8266 1.92384 9.58526C1.67682 8.34388 1.80345 7.05713 2.28772 5.88771C2.77199 4.7183 3.59214 3.71874 4.64448 3.01544C5.69681 2.31214 6.93407 1.93667 8.19978 1.93652C9.04027 1.93642 9.87255 2.10189 10.6491 2.42346C11.4256 2.74503 12.1312 3.21642 12.7256 3.8107C13.3199 4.40498 13.7914 5.11052 14.1131 5.88702C14.4347 6.66352 14.6003 7.49578 14.6003 8.33627Z"
      stroke="#717272"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M16.2002 16.3366L12.7202 12.8566"
      stroke="#717272"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default SVGComponent;
