// (C) 2021-2022 GoodData Corporation
import React from "react";
/**
 * @internal
 */
export const Function = ({ color, className, width = 18, height = 16 }) => {
    return (React.createElement("svg", { className: className, width: width, height: height, viewBox: "0 0 18 16", version: "1.1", xmlns: "http://www.w3.org/2000/svg", xmlnsXlink: "http://www.w3.org/1999/xlink" },
        React.createElement("g", { stroke: "none", strokeWidth: "1", fill: "none", fillRule: "evenodd" },
            React.createElement("path", { d: "M13.2831949,6.12074212 C13.44004,6.09880468 13.5867484,6.13482824 13.7152912,6.23659193 C13.8357121,6.34057897 13.8982123,6.48307496 13.8971568,6.64466089 C13.8962862,6.76698287 13.8591691,6.88094577 13.7903506,6.98069493 L13.7328641,7.05275024 L11.6797788,9.336 L13.0354581,11.5953607 C13.0849984,11.6759074 13.1111081,11.7635738 13.1142401,11.8544222 L13.1097297,11.9461855 L13.0900017,12.0391951 C13.0474474,12.1846739 12.9588482,12.304745 12.8253913,12.3961986 C12.7728209,12.4301226 12.716994,12.4560928 12.6583934,12.4735873 C12.6000308,12.4910107 12.5411543,12.5 12.4823096,12.5 C12.3887318,12.5 12.2999686,12.4774784 12.2203448,12.4322232 C12.1692809,12.4032003 12.123957,12.3664134 12.0834359,12.3204535 L12.0261393,12.2444577 L10.8397788,10.267 L9.0243821,12.2880448 L8.95958266,12.3485546 L8.88884742,12.3998218 L8.81239659,12.4415498 C8.73034813,12.479718 8.64618499,12.5 8.56119764,12.5 C8.50066223,12.5 8.44111325,12.4904727 8.38352843,12.4715946 C8.32266976,12.4516432 8.26661598,12.4213495 8.20938999,12.375354 C8.08896906,12.2713669 8.02646884,12.1288709 8.02752441,11.967285 C8.02839492,11.844963 8.06551202,11.7310001 8.13433057,11.631251 L8.19181706,11.5591957 L10.2437788,9.275 L8.88922307,7.0165852 C8.83968273,6.93603853 8.81357309,6.84837215 8.81044105,6.75752372 L8.81495142,6.66576043 L8.8346795,6.5727508 C8.87723374,6.42727204 8.965833,6.30720091 9.10031299,6.21509057 C9.23001075,6.1322865 9.37409517,6.09932939 9.52223086,6.12095395 C9.65018703,6.13963274 9.75970717,6.19750412 9.84203312,6.29086814 L9.89854182,6.36748822 L11.0837788,8.344 L12.8970799,6.32735579 C12.9599562,6.2585904 13.0324066,6.20551198 13.1126922,6.16952205 L13.195525,6.1392802 L13.2831949,6.12074212 Z M7.21492902,3.5 C7.37788777,3.5 7.52519744,3.5079965 7.65718333,3.52421883 C7.79221597,3.54081564 7.91579992,3.56604734 8.03003446,3.6008955 C8.18346304,3.64908773 8.29770211,3.75537292 8.35613155,3.90485241 C8.41201474,4.04781785 8.40464494,4.20012197 8.33909142,4.35064737 C8.27657176,4.48968669 8.17161648,4.59645838 8.03237641,4.66439182 C7.91813171,4.72013033 7.79932955,4.74097062 7.68078091,4.72332145 L7.59199214,4.70281169 C7.54442209,4.68721672 7.4820619,4.67453418 7.40565568,4.66570144 C7.32377926,4.65623634 7.2275764,4.65138993 7.11744557,4.65138993 C7.02713938,4.65138993 6.91491114,4.66606095 6.78203867,4.69626161 C6.68653,4.71796983 6.59508634,4.77642686 6.50944951,4.87394054 C6.43993084,4.95773286 6.37742955,5.07016455 6.32350288,5.21191875 C6.28124366,5.32300337 6.24580802,5.4512706 6.21754453,5.59657688 L6.19168465,5.74755755 L6.13677876,6.111 L7.48181561,6.11194591 C7.57866541,6.11194591 7.66848543,6.13464469 7.74703157,6.17889439 L7.82166256,6.23028522 L7.88783449,6.29578824 C7.9899615,6.41588885 8.02985973,6.56531362 8.00601545,6.72464244 C7.98312811,6.87757694 7.90965684,7.00994333 7.79168731,7.11255635 C7.69736355,7.19460166 7.58938894,7.2459605 7.47257197,7.26322222 L7.38337643,7.26972201 L5.96277876,7.269 L5.26176899,11.9613066 C5.24834815,12.0509854 5.21649183,12.1336289 5.16778996,12.2074576 L5.11353179,12.278282 L5.04839657,12.3428343 C4.93049187,12.445391 4.79125771,12.5 4.64008569,12.5 C4.47529996,12.5 4.33108203,12.4377569 4.22768063,12.3161577 C4.14597902,12.2200772 4.10410384,12.1052292 4.1028301,11.9815569 L4.10949967,11.8873035 L5.03941534,5.6735544 C5.086769,5.35713452 5.15970315,5.0754988 5.25894717,4.8286176 C5.36059112,4.57576626 5.49271113,4.35494175 5.65486259,4.16804881 C5.84488085,3.94729388 6.07476456,3.77952527 6.34208776,3.6665899 C6.60571128,3.55521753 6.89726475,3.5 7.21492902,3.5 Z", fill: color !== null && color !== void 0 ? color : "#049ECD", fillRule: "nonzero" }))));
};
//# sourceMappingURL=Function.js.map