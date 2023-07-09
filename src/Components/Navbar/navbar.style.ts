import styled from 'styled-components';

export const StyledNav = styled.nav`
  background-color: ${(props) => props.theme.palette.primary.main};
  padding: 8px 10%;
  display: flex;
  flex-direction: row;
  min-height: 60px;
  align-items: center;

  @media only screen and (max-width: 768px) {
    padding: 8px 16px;
  }
`;
