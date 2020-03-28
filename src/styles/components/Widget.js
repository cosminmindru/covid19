import styled from "styled-components/macro";

export const Widget = styled.article`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: [header] 4rem [content] auto;
  border-width: 1px;
  border-style: solid;
  border-color: ${(props) => props.theme.colors.grey};
  border-radius: 0.5rem;
  background-color: ${(props) => props.theme.colors.white};
`;

export const WidgetHeader = styled.header`
  grid-row: header;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1.5rem;
  border-bottom: 1px solid ${(props) => props.theme.colors.grey};
`;

export const WidgetContent = styled.main`
  grid-row: content;
`;
