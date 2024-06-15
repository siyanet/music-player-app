import styled from '@emotion/styled';
export const PrimaryButton = styled.button`
margin: ${props => `${props.theme.space[0]}px`};
padding: 0px;
// padding: ${props => `${props.theme.space[0]}px`};
font-family: ${props => props.theme.fonts.special};
font-size: ${props => `${props.theme.fontSizes[2]}px`};
background-color: ${props => props.backgroundColor || props.theme.colors.primary};
border-radius: ${props => `${props.theme.radii.default}px`};
cursor: pointer;
width: 160px;
text-align: left;

&:hover{
background-color:${props => props.hoverColor || props.theme.colors.secondary};
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