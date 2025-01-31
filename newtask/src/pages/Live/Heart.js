// import React from 'react';
// import styled, { keyframes } from 'styled-components';
// import { BiCart } from 'react-icons/bi';

// // Định nghĩa keyframes cho animation
// const svgFilledAnimation = keyframes`
//   0% {
//     transform: scale(0);
//   }
//   25% {
//     transform: scale(1.2);
//   }
//   50% {
//     transform: scale(1);
//     filter: brightness(1.5);
//   }
// `;

// const svgCelebrateAnimation = keyframes`
//   0% {
//     transform: scale(0);
//   }
//   50% {
//     opacity: 1;
//     filter: brightness(1.5);
//   }
//   100% {
//     transform: scale(1.4);
//     opacity: 0;
//     display: none;
//   }
// `;

// // Styled-components
// const HeartContainer = styled.div`
//   --heart-color: rgb(91, 255, 195);
//   position: relative;
//   width: 50px;
//   height: 50px;
//   transition: 0.3s;
// `;

// const Checkbox = styled.input`
//   position: absolute;
//   width: 100%;
//   height: 100%;
//   opacity: 0;
//   z-index: 20;
//   cursor: pointer;
// `;

// const SvgContainer = styled.div`
//   width: 100%;
//   height: 100%;
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `;

// const SvgOutline = styled.svg`
//   fill: var(--heart-color);
//   position: absolute;
// `;

// const SvgFilled = styled.svg`
//   fill: var(--heart-color);
//   position: absolute;
//   animation: ${svgFilledAnimation} 1s;
//   display: none;
// `;

// const SvgCelebrate = styled.svg`
//   position: absolute;
//   animation: ${svgCelebrateAnimation} 0.5s;
//   animation-fill-mode: forwards;
//   display: none;
//   stroke: var(--heart-color);
//   fill: var(--heart-color);
//   stroke-width: 2px;
// `;

// const HeartComponent = () => {
//   return (
//     <HeartContainer title="Like">
//       <Checkbox id="Give-It-An-Id" className="checkbox" type="checkbox" />
//       <SvgContainer>
//         <SvgOutline xmlns="http://www.w3.org/2000/svg" className="svg-outline" viewBox="0 0 24 24">
//           <path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Zm-3.585,18.4a2.973,2.973,0,0,1-3.83,0C4.947,16.006,2,11.87,2,8.967a4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,11,8.967a1,1,0,0,0,2,0,4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,22,8.967C22,11.87,19.053,16.006,13.915,20.313Z"></path>
//         </SvgOutline>
//         <SvgFilled xmlns="http://www.w3.org/2000/svg" className="svg-filled" viewBox="0 0 24 24">
//           <path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Z"></path>
//         </SvgFilled>
//         <SvgCelebrate xmlns="http://www.w3.org/2000/svg" height="100" width="100" className="svg-celebrate">
//           <polygon points="10,10 20,20"></polygon>
//           <polygon points="10,50 20,50"></polygon>
//           <polygon points="20,80 30,70"></polygon>
//           <polygon points="90,10 80,20"></polygon>
//           <polygon points="90,50 80,50"></polygon>
//           <polygon points="80,80 70,70"></polygon>
//         </SvgCelebrate>
//       </SvgContainer>
//     </HeartContainer>
//   );
// };

// export default HeartComponent;
