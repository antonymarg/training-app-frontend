import styled from 'styled-components';

export const StyledNav = styled.nav`
  background-color: ${(props) => props.theme.palette.primary.main};
  padding: 10px 10%;
  display: flex;
  flex-direction: row;
  align-items: baseline;
`;
