import styled from '@emotion/styled';
export const PrimaryButton = styled.button`
margin: ${props => `${props.theme.space[2]}px`};
padding: ${props => `${props.theme.space[3]}px`};
font-family: ${props => props.theme.fonts.special};
font-size: ${props => `${props.theme.fontSizes[2]}px`};
background-color: ${props => props.backgroundColor};
border-radius: ${props => `${props.theme.radii.default}px`};
cursor: pointer;
&:hover{
background-color:${props => props.hoverColor};
}
`;
export const SecondaryButton = styled.button`
border-radius: ${props => `${props.theme.radii[props.size]}px` ||`${props.theme.radii.circle}px`};
cursor: pointer;
&:hover{
background-color:${props => props.hoverColor};
padding: ${props => `${props.theme.space[3]}px`};

}

`;