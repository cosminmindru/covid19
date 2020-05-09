import styled from "styled-components/macro";
import { transparentize } from "polished";

const Widget = styled.article`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: minmax(4rem, min-content) auto;
  width: 100%;
  height: 100%;
  border-radius: ${(props) => props.theme.sizes.borderRadius};
  border-width: 1px;
  border-style: solid;
  border-color: ${(props) => transparentize(0.6, props.theme.colors.grey100)};
  background-color: ${(props) =>
    props.theme.colorMode === "dark"
      ? props.theme.colors.grey50
      : props.theme.colors.background};
  box-shadow: 0 0.15rem 0.15rem
    ${(props) => transparentize(0.9, props.theme.colors.grey900)};
  overflow: hidden;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 1rem;
  border-bottom: 1px solid
    ${(props) =>
      props.theme.colorMode === "dark"
        ? props.theme.colors.grey100
        : props.theme.colors.grey300};

  @media ${(props) => props.theme.breakpoints.desktop} {
    padding: 0 1.5rem;
  }
`;

const Content = styled.main`
  grid-row: content;
  padding-top: ${(props) => (props.yPadding ? "1rem" : 0)};
  padding-right: ${(props) => (props.xPadding ? "1rem" : 0)};
  padding-bottom: ${(props) => (props.yPadding ? "1rem" : 0)};
  padding-left: ${(props) => (props.xPadding ? "1rem" : 0)};

  @media ${(props) => props.theme.breakpoints.desktop} {
    padding-top: ${(props) => (props.yPadding ? "1.5rem" : 0)};
    padding-right: ${(props) => (props.xPadding ? "1.5rem" : 0)};
    padding-bottom: ${(props) => (props.yPadding ? "1.5rem" : 0)};
    padding-left: ${(props) => (props.xPadding ? "1.5rem" : 0)};
  }
`;

const Title = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${(props) => props.theme.colors.text};
`;

Widget.Header = Header;
Widget.Content = Content;
Widget.Title = Title;

export default Widget;
