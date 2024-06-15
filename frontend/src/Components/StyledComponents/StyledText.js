import styled from "@emotion/styled/macro";

export const StyledHeading = styled.h1`
font-family: ${props => props.theme.fonts.heading};
font-size: ${props => `${props.theme.fontSizes[3]}px`};
color: ${props => props.theme.colors.white};
font-weight:${props => props.theme.fontWeights.heading};
line-height: ${props => `${props.theme.lineHeights.heading}px`};
`;
export const StyledP= styled.p`
font-family: ${props => props.theme.fonts.body};
font-size: ${props => `${props.theme.fontSizes[props.size]}px`};
color: ${props => props.theme.colors.white};
font-weight:${props => props.theme.fontWeights[props.weight] || props.theme.fontWeights.body};
line-height: ${props => `${props.theme.lineHeights.body}px`};
`;
export const StyledHeading3 = styled.h3`
font-family: ${props => props.theme.fonts.bold};
font-size: ${props => `${props.theme.fontSizes[2]}px`};
color: ${props => props.theme.colors.white};
font-weight:${props => props.theme.fontWeights.bold};
line-height: ${props => `${props.theme.lineHeights.heading}px`};
`;