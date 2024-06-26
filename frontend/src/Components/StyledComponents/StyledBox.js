import { Box } from 'rebass';
import styled from '@emotion/styled';

export const StyledBox = styled(Box)`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  background-color: #006100;  /* Use background-color instead of bg */
  padding: 1rem;  /* Adjust the padding as needed */
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
`;
