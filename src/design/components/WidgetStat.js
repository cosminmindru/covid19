import styled from "styled-components/macro";

const WidgetStat = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
`;

const Title = styled.h5`
  margin-bottom: 0.5rem;
`;

const Value = styled.p`
  font-size: ${(props) => props.theme.sizes.fontHeading2};
`;

WidgetStat.Title = Title;
WidgetStat.Value = Value;

export default WidgetStat;
