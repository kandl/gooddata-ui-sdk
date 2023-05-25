// (C) 2022 GoodData Corporation
import React from "react";
import { IIconProps } from "../../typings.js";

/**
 * @internal
 */
export const Geo: React.FC<IIconProps> = ({ className, width, height, color }) => {
    return (
        <svg
            width={width}
            height={height}
            className={className}
            viewBox="0 0 24 26"
            xmlns="http://www.w3.org/2000/svg"
        >
            <g stroke="none" strokeWidth="1" fill={color ?? "#B0BECA"} fillRule="nonzero">
                <path
                    d="M18.4881639,6.99992205 C20.1231176,7.07423868 21.4227036,7.64534542 22.389245,8.62334769 C23.4236953,9.66486554 24.0029463,11.0740729 24.0000579,12.543 C24.0000579,13.4310841 23.6685813,14.5133431 23.1683618,15.640959 L22.9261012,16.1640759 C22.7573958,16.514245 22.5750836,16.8665407 22.3839046,17.2166278 L22.0910785,17.7395602 L22.0910785,17.7395602 L21.7885071,18.2559283 L21.7885071,18.2559283 L21.4797453,18.7624808 C21.4279666,18.8459076 21.3760781,18.92879 21.3241539,19.0110601 L21.012772,19.4967929 L21.012772,19.4967929 L20.704087,19.9645816 L20.704087,19.9645816 L20.4016539,20.411175 L20.4016539,20.411175 L20.1090276,20.8333215 L20.1090276,20.8333215 L19.5674151,21.5912689 L19.5674151,21.5912689 L18.9174205,22.4635549 L18.9174205,22.4635549 L18.4990121,23 L18.0437541,22.4163187 L18.0437541,22.4163187 L17.425771,21.5950337 L17.425771,21.5950337 L17.0518513,21.0831232 L17.0518513,21.0831232 L16.6477195,20.5163147 L16.6477195,20.5163147 L16.2231807,19.9040686 L16.2231807,19.9040686 L15.9336595,19.4753332 L15.9336595,19.4753332 L15.4968979,18.8083809 L15.4968979,18.8083809 L15.0658761,18.1212187 C15.0186668,18.044095 14.9717454,17.9667722 14.9251723,17.8893087 C15.5783634,16.6925101 16.1383035,15.555251 16.5946996,14.4870234 C16.734693,14.6502269 16.8977596,14.7952498 17.0792309,14.919045 C17.5870002,15.2621025 18.1787812,15.3993656 18.7512952,15.3425344 C19.3238092,15.2857031 19.8770562,15.0347775 20.305897,14.6001942 C20.7363248,14.1657347 20.9850293,13.6091023 21.0412774,13.0336577 C21.0975255,12.4582131 20.9613173,11.8639565 20.6226185,11.353542 C20.343666,10.9313404 19.9445758,10.6010738 19.476728,10.4056369 C19.0107591,10.2111315 18.4974229,10.160362 18.0025118,10.2597959 L17.8953607,10.2843895 C17.9645574,9.83497746 18,9.40872602 18,9.007 C18,8.33912321 17.9375491,7.68152152 17.8165484,7.04171719 C18.037319,7.01317073 18.2619524,6.99925889 18.4881639,6.99992205 Z"
                    fillOpacity=".45"
                ></path>
                <path d="M8.5,0 C10.8467603,0 12.9723568,1.00775503 14.5103291,2.63813768 C16.0484587,4.26830834 17,6.51960452 17,9.007 C17,11.0895638 15.9328171,13.8286776 14.5546993,16.4980597 L14.2041296,17.1635322 L14.2041296,17.1635322 L13.8432302,17.8235774 L13.8432302,17.8235774 L13.4746269,18.4756735 L13.4746269,18.4756735 L13.1009456,19.1172987 C13.038388,19.2232236 12.9757283,19.328607 12.9130212,19.4333966 L12.5366463,20.054587 L12.5366463,20.054587 L12.1617579,20.659002 L12.1617579,20.659002 L11.7909821,21.2441197 L11.7909821,21.2441197 L11.2482732,22.0800975 L11.2482732,22.0800975 L10.7295879,22.8584712 L10.7295879,22.8584712 L10.090695,23.791986 L10.090695,23.791986 L9.4062959,24.7628572 L9.4062959,24.7628572 L8.88709862,25.4791492 L8.88709862,25.4791492 L8.50001211,25.999 L8.00148307,25.3302572 L8.00148307,25.3302572 L7.40953009,24.5153045 L7.40953009,24.5153045 L6.81798513,23.6819196 L6.81798513,23.6819196 L6.32050013,22.9662546 L6.32050013,22.9662546 L5.78759038,22.1837698 L5.78759038,22.1837698 L5.22889674,21.3442389 L5.22889674,21.3442389 L4.84687085,20.7576859 L4.84687085,20.7576859 L4.46052683,20.1530189 L4.46052683,20.1530189 L4.07272123,19.5331338 L4.07272123,19.5331338 L3.68631059,18.9009267 C3.62218376,18.7946929 3.55823408,18.6880663 3.49452106,18.5811073 L3.11555891,17.9358469 L3.11555891,17.9358469 L2.74513311,17.2855042 C2.68426553,17.1768511 2.62387266,17.0681069 2.564014,16.959332 L2.21174875,16.3067958 C1.00459004,14.0250055 0.0855094323,11.7828607 0.00564258406,10.1390962 L0,9.912 C0,7.02457468 0.918166942,4.58246328 2.40760029,2.84542837 C3.95140985,1.04463099 6.11104406,0 8.5,0 Z M7.71825113,5.07661799 C6.92486218,5.23378847 6.21766411,5.62270239 5.66960811,6.17075838 C5.12155212,6.71881437 4.73263821,7.42601245 4.57538104,8.21983795 C4.4171186,9.0127937 4.50592685,9.81503249 4.8026761,10.531097 C5.09942535,11.2471615 5.60411561,11.8770518 6.27747795,12.3260107 C7.06983002,12.8564981 7.99539141,13.0699346 8.8912613,12.9817465 C9.78713119,12.8935583 10.6533096,12.5037455 11.3276908,11.8282655 C12.2736513,10.8854084 12.6858512,9.53073301 12.4251361,8.219577 C12.1644209,6.90842098 11.2653305,5.81448749 10.0294938,5.30477186 C9.2994645,5.00165924 8.49465635,4.92209343 7.71825113,5.07661799 Z"></path>
            </g>
        </svg>
    );
};
