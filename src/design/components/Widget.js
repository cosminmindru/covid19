import styled, { css } from "styled-components/macro";
import { transparentize } from "polished";

const Widget = styled.article`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: minmax(4rem, min-content) 1fr;
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
  grid-row: 1 / span 1;
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
  grid-row: 2 / span 1;
  padding: ${(props) =>
    `${props.yPadding ? "1rem" : 0} ${props.xPadding ? "1rem" : 0}`};

  @media ${(props) => props.theme.breakpoints.desktop} {
    padding: ${(props) =>
      `${props.yPadding ? "1.5rem" : 0} ${props.xPadding ? "1.5rem" : 0}`};
  }
`;

const HeaderTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${(props) => props.theme.colors.text};
`;

const HeaderIcon = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 0 0 auto;
  color: ${(props) => props.theme.colors.accentPrimary};

  ${(props) =>
    props.clickable &&
    css`
      &:hover {
        transition: color ${props.theme.duration.baseTransition}ms ease-in-out;
        color: ${props.theme.colors.grey600};
        cursor: pointer;
      }
    `}
`;

const HeaderAction = styled.div`
  margin: 0 0 0 auto;
`;

Widget.Header = Header;
Widget.Content = Content;
Widget.HeaderTitle = HeaderTitle;
Widget.HeaderIcon = HeaderIcon;
Widget.HeaderAction = HeaderAction;

export default Widget;
