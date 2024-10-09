import * as React from "react";
import Svg, { Path } from "react-native-svg";
const SVGComponent = (props) => (
    <Svg
        width={28}
        height={26}
        viewBox="0 0 25 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M7.75 1.62507C7.01131 1.62507 6.27986 1.77056 5.59741 2.05325C4.91495 2.33593 4.29485 2.75027 3.77252 3.27259C3.25019 3.79492 2.83586 4.41502 2.55318 5.09748C2.27049 5.77993 2.125 6.51138 2.125 7.25007C2.125 7.98876 2.27049 8.72021 2.55318 9.40266C2.83586 10.0851 3.25019 10.7052 3.77252 11.2275C4.29485 11.7499 4.91495 12.1642 5.59741 12.4469C6.27986 12.7296 7.01131 12.8751 7.75 12.8751C9.24184 12.8751 10.6726 12.2824 11.7275 11.2275C12.7824 10.1727 13.375 8.74191 13.375 7.25007C13.375 5.75823 12.7824 4.32749 11.7275 3.27259C10.6726 2.2177 9.24184 1.62507 7.75 1.62507ZM0.875 7.25007C0.875146 6.14598 1.1412 5.05817 1.65066 4.07865C2.16012 3.09913 2.89799 2.25672 3.80186 1.62267C4.70574 0.988622 5.74902 0.581591 6.84347 0.436007C7.93791 0.290423 9.05132 0.41057 10.0895 0.786283C11.1277 1.162 12.0601 1.78223 12.808 2.5945C13.5558 3.40678 14.0969 4.38722 14.3857 5.45287C14.6745 6.51853 14.7023 7.63805 14.4669 8.71675C14.2315 9.79545 13.7398 10.8016 13.0333 11.6501L16.9417 15.5584C17.0031 15.6156 17.0523 15.6846 17.0865 15.7613C17.1206 15.838 17.139 15.9207 17.1405 16.0046C17.142 16.0886 17.1265 16.1719 17.0951 16.2497C17.0637 16.3276 17.0169 16.3983 16.9575 16.4576C16.8982 16.517 16.8275 16.5637 16.7497 16.5952C16.6718 16.6266 16.5885 16.642 16.5046 16.6406C16.4206 16.6391 16.3379 16.6207 16.2612 16.5866C16.1846 16.5524 16.1156 16.5031 16.0583 16.4417L12.15 12.5334C11.146 13.3696 9.92452 13.9025 8.6286 14.0695C7.33268 14.2364 6.01602 14.0307 4.83284 13.4762C3.64967 12.9218 2.64899 12.0417 1.94803 10.939C1.24707 9.83632 0.874856 8.5567 0.875 7.25007Z"
            stroke="#B8B8B8" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"
            fill="black"
            {...props}
        />
    </Svg>
);
export default SVGComponent;
