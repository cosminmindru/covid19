import React, { useContext } from "react";
import styled from "styled-components/macro";
import { linearGradient, transparentize } from "polished";
import { Link } from "react-router-dom";
import ThemeContext from "../../context/ThemeContext";
import { ReactComponent as SunIcon } from "../../assets/icons/sun.svg";
import { ReactComponent as MoonIcon } from "../../assets/icons/moon.svg";
import Container from "../../design/components/Container";

const backgroundGradient = (props) =>
  linearGradient({
    colorStops: [
      `${transparentize(1, props.theme.colors.background)} 0%`,
      `${transparentize(0.5, props.theme.colors.background)} 20%`,
      `${transparentize(0.25, props.theme.colors.background)} 35%`,
      `${props.theme.colors.background} 100%`,
    ],
    toDirection: "0deg",
  });

const SHeader = styled.header`
  z-index: 10;
  position: sticky;
  top: 0;
  padding: 1rem 0;
  ${backgroundGradient}
`;

const SContainer = styled(Container)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LogoLink = styled(Link)`
  text-decoration: none;
`

const Logo = styled.p`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${(props) => props.theme.colors.text};
  text-decoration: none;

  @media ${(props) => props.theme.breakpoints.desktop} {
    font-size: 1.75rem;
  }
`;

const ColorModeButton = styled.button`
  display: block;
  width: 1.5rem;
  height: 1.5rem;
  padding: 0;
  margin: 0;
  background: transparent;
  border: none;
  outline: none;
  color: ${(props) => props.theme.colors.text};
  cursor: pointer;
`;

const Header = () => {
  const { colorMode, setColorMode } = useContext(ThemeContext);

  const switchColorMode = () => {
    const newColorMode = colorMode === "dark" ? "light" : "dark";

    setColorMode(newColorMode);
  };

  return (
    <SHeader>
      <SContainer>
        <LogoLink to="/">
          <Logo>COVID-19 DASHBOARD</Logo>
        </LogoLink>
        <ColorModeButton onClick={switchColorMode}>
          {colorMode === "dark" ? <MoonIcon /> : <SunIcon />}
        </ColorModeButton>
      </SContainer>
    </SHeader>
  );
};

export default Header;
