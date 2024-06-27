import styled from '@emotion/styled';
import { Slider } from "theme-ui";
// export const CustomSlider = styled(Slider)`
//   width: 100%;
//   height: 8px;
//   background-color: ${props => props.backgroundColor || props.theme.colors.white};
//   border-radius: 4px;
//   overflow: hidden; /* Ensure children (thumb) stays within bounds */
//   cursor: pointer;

//   /* Customize the thumb/handle */
//   & > div {
//     width: 16px;
//     height: 16px;
//     background-color:${props => props.hoverColor || props.theme.colors.secondary};
//     border-radius: 50%;
//     margin-top: -4px; /* Adjust vertically to center */
//     transform: scale(1); /* Ensure no scale transformation */
//     transition: transform 0.2s ease-in-out;

//     &:hover {
//       transform: scale(1.2); /* Example hover effect */
//     }
//   }
// `;



export const CustomSlider = styled(Slider)`
 
  background-color: ${props =>  props.theme.colors.primary};
  
  &::-webkit-slider-thumb {
   
    background-color:${props =>  props.theme.colors.white};

  }

  &::-moz-range-thumb {
   
   background-color:${props =>  props.theme.colors.secondary};
   
  }

  &::-ms-thumb {
    
    background-color:${props =>  props.theme.colors.secondary};
   
  
  }


`;

// import { Slider } from 'theme-ui';
// import styled from '@emotion/styled';

// export const CustomSlider = styled(Slider)`
//   appearance: none;
 
//   height: 6px;
//   background: transparent;
//   position: relative;
//   margin: 20px 0;

//   &::before {
//     content: '';
//     position: absolute;
//     top: 50%;
//     left: 0;
//     width: 100%;
//     height: 6px;
//     background: #ccc;
//     border-radius: 5px;
//     transform: translateY(-50%);
//     z-index: 1;
//   }

//   &::after {
//     content: '';
//     position: absolute;
//     top: 50%;
//     left: 0;
//     width: calc(${({ value }) => value}%);
//     height: 6px;
//     background: #007bff;
//     border-radius: 5px;
//     transform: translateY(-50%);
//     z-index: 2;
//   }

//   &::-webkit-slider-thumb,
//   &::-moz-range-thumb,
//   &::-ms-thumb {
//     appearance: none;
//     width: 16px;
//     height: 16px;
//     background-color: #007bff;
//     border: none;
//     border-radius: 50%;
//     cursor: pointer;
//     position: relative;
//     z-index: 3;
//   }

//   &:hover::-webkit-slider-thumb,
//   &:hover::-moz-range-thumb,
//   &:hover::-ms-thumb {
//     transform: scale(1.2);
//   }
// `;





