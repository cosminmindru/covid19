import styled from "styled-components/macro";

export const Widget = styled.article`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: [header] auto [content] 1fr;
  border-width: 1px;
  border-style: solid;
  border-color: ${(props) => props.theme.colors.grey};
  border-radius: 0.5rem;
  background-color: ${(props) => props.theme.colors.white};
`;

export const Header = styled.header`
  grid-row: header;
`;

export const Content = styled.main`
  grid-row: content;
`;

Widget.Header = Header;
Widget.Content = Content;

export default Widget;
