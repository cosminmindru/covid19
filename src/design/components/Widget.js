import styled from "styled-components/macro";
import { transparentize } from "polished";

const Widget = styled.article`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: [header] minmax(4rem, min-content) [content] auto;
  width: 100%;
  height: 100%;
  border-radius: ${(props) => props.theme.sizes.borderRadius};
  border-width: 1px;
  border-style: solid;
  border-color: ${(props) => props.theme.colors.grey100};
  background-color: ${(props) => props.theme.colors.grey50};
  box-shadow: 0 0.15rem 0.15rem
    ${(props) => transparentize(0.9, props.theme.colors.grey900)};
  overflow: hidden;
`;

const WidgetHeader = styled.header`
  grid-row: header;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 1rem;
  border-bottom: 1px solid ${(props) => props.theme.colors.grey200};

  @media ${(props) => props.theme.breakpoints.desktop} {
    padding: 0 1.5rem;
  }
`;

const WidgetContent = styled.main`
  grid-row: content;
`;

const WidgetTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${(props) => props.theme.colors.text};
`;

Widget.Header = WidgetHeader;
Widget.Content = WidgetContent;
Widget.Title = WidgetTitle;

export { Widget, WidgetHeader, WidgetContent };

export default Widget;
