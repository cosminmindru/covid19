import styled from "styled-components/macro";

const WidgetStat = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
`;

const Title = styled.h5`
  font-size: 1.1rem;

  @media ${(props) => props.theme.breakpoints.desktop} {
    font-size: ${(props) => props.theme.sizes.fontHeading5};
  }
`;

const Value = styled.p`
  font-size: 1.5rem;

  @media ${(props) => props.theme.breakpoints.desktop} {
    font-size: ${(props) => props.theme.sizes.fontHeading2};
  }
`;

WidgetStat.Title = Title;
WidgetStat.Value = Value;

export default WidgetStat;
