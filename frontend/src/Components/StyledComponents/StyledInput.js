import styled from '@emotion/styled';

export const StyledInput = styled.input`
  width: 100%;
  padding: 0.5rem;
  margin: 0.5rem 0;
  border: 1px solid ${props => props.theme.colors.primary};
  border-radius: 4px;
  font-size: 1rem;
  box-sizing: border-box;

  &:focus {
    border-color: ${props => props.theme.colors.secondary};
    outline: none;
  }
`;