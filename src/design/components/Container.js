import styled from "styled-components/macro";

const Container = styled.div`
  width: 100%;
  max-width: ${(props) => props.theme.sizes.containerMaxWidth};
  padding: 0 1rem;
  margin: 0 auto;

  @media ${(props) => props.theme.breakpoints.desktop} {
    padding: 0 2rem;
  }
`;

export default Container;
