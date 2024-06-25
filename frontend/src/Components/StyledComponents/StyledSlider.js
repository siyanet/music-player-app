// import styled from '@emotion/styled';
// import { Slider } from "theme-ui";
// // export const CustomSlider = styled(Slider)`
// //   width: 100%;
// //   height: 8px;
// //   background-color: ${props => props.backgroundColor || props.theme.colors.white};
// //   border-radius: 4px;
// //   overflow: hidden; /* Ensure children (thumb) stays within bounds */
// //   cursor: pointer;

// //   /* Customize the thumb/handle */
// //   & > div {
// //     width: 16px;
// //     height: 16px;
// //     background-color:${props => props.hoverColor || props.theme.colors.secondary};
// //     border-radius: 50%;
// //     margin-top: -4px; /* Adjust vertically to center */
// //     transform: scale(1); /* Ensure no scale transformation */
// //     transition: transform 0.2s ease-in-out;

// //     &:hover {
// //       transform: scale(1.2); /* Example hover effect */
// //     }
// //   }
// // `;



// export const CustomSlider = styled(Slider)`
//   width: 100%;
//   background-color: ${props => props.backgroundColor || props.theme.colors.white};
//   border-radius: 4px;
//   cursor: pointer;
//   &::-webkit-slider-thumb {
//     width: 16px;
//     height: 16px;
//     background-color:${props => props.hoverColor || props.theme.colors.secondary};
//     border-radius: 50%;
//     position: relative;
//     z-index: 1;
//     cursor: grab;
//   }

//   &::-moz-range-thumb {
//     width: 16px;
//     height: 16px;
//    background-color:${props => props.hoverColor || props.theme.colors.secondary};
//     border-radius: 50%;
//     position: relative;
//     z-index: 1;
//     cursor: grab;
//   }

//   &::-ms-thumb {
//     width: 16px;
//     height: 16px;
//     background-color:${props => props.hoverColor || props.theme.colors.secondary};
//     border-radius: 50%;
//     position: relative;
//     z-index: 1;
//     cursor: grab;
//   }

//   &:hover::-webkit-slider-thumb {
//     transform: scale(1.2);
//   }

//   &:hover::-moz-range-thumb {
//     transform: scale(1.2);
//   }

//   &:hover::-ms-thumb {
//     transform: scale(1.2);
//   }
//      &::-webkit-slider-runnable-track {
//     background: linear-gradient(to right, #007bff 0%, #007bff ${(props) => props.value}%, #ddd ${(props) => props.value}%, #ddd 100%);
   
//     border-radius: 5px;
//   }

//   &::-moz-range-progress {
//     background-color: #007bff;
  
//   }

//   &::-ms-fill-lower {
//     background-color: #007bff;

//   }

//   &::-moz-range-track {
//     background-color: #ddd;
//     }
// `;

import { Slider } from 'theme-ui';
import styled from '@emotion/styled';

export const CustomSlider = styled(Slider)`
  appearance: none;
 
  height: 6px;
  background: transparent;
  position: relative;
  margin: 20px 0;

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    width: 100%;
    height: 6px;
    background: #ccc;
    border-radius: 5px;
    transform: translateY(-50%);
    z-index: 1;
  }

  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    width: calc(${({ value }) => value}%);
    height: 6px;
    background: #007bff;
    border-radius: 5px;
    transform: translateY(-50%);
    z-index: 2;
  }

  &::-webkit-slider-thumb,
  &::-moz-range-thumb,
  &::-ms-thumb {
    appearance: none;
    width: 16px;
    height: 16px;
    background-color: #007bff;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    position: relative;
    z-index: 3;
  }

  &:hover::-webkit-slider-thumb,
  &:hover::-moz-range-thumb,
  &:hover::-ms-thumb {
    transform: scale(1.2);
  }
`;





