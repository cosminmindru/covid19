import React from "react";
import styled from "styled-components/macro";
import { Link as RouterLink } from "react-router-dom";
import { Typography, Link } from "@material-ui/core";
import LanguageIcon from "@material-ui/icons/Language";
import InstagramIcon from "@material-ui/icons/Instagram";
import Container from "../../design/components/Container";
import { transparentize } from "polished";

const SFooter = styled.footer`
  padding: 1.5rem 0;
  background-color: ${(props) => props.theme.colors.grey50};
  box-shadow: 0 -0.15rem 0.15rem ${(props) => transparentize(0.9, props.theme.colors.grey900)};
`;

const Content = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  grid-template-rows: repeat(3, auto);
  gap: 1rem;
`;

const LogoLink = styled(RouterLink)`
  text-decoration: none;
`;

const Logo = styled.p`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${(props) => props.theme.colors.text};

  @media ${(props) => props.theme.breakpoints.desktop} {
    font-size: 1.75rem;
  }
`;

const Socials = styled.aside`
  display: grid;
  grid-template-columns: repeat(2, 1.75rem);
  grid-template-rows: 1fr;
  gap: 1rem;
  align-items: center;
`;

const SocialLink = styled.a`
  width: 1.5rem;
  height: 1.5rem;

  @media ${(props) => props.theme.breakpoints.desktop} {
    width: 1.75rem;
    height: 1.75rem;
  }
`;

const Social = styled.div`
  width: 100%;
  height: 100%;
  color: ${(props) => props.theme.colors.text};
  transition: color ${(props) => `${props.theme.durations.baseTransition}ms`}
    ease-in-out;

  &:hover {
    color: ${(props) => props.theme.colors.accentPrimary};
  }
`;

const Credit = styled(Typography)`
  grid-column: 1 / span 2;
`;

function Footer() {
  return (
    <SFooter>
      <Container>
        <Content>
          <LogoLink to="/">
            <Logo>COVID-19 STATISTICS</Logo>
          </LogoLink>
          <Socials>
            <Link
              href="https://cosminmindru.com/"
              title="Cosmin's Website"
              component={SocialLink}
            >
              <Social as={LanguageIcon} />
            </Link>
            <Link
              href="https://instagram.com/cosmindev"
              title="Cosmin's Instagram"
              component={SocialLink}
            >
              <Social as={InstagramIcon} />
            </Link>
          </Socials>
          <Credit variant="p">
            Developed by{" "}
            <Link href="https://cosminmindru.com/">Cosmin Mindru</Link>
          </Credit>
          <Credit variant="p">
            API Provided by{" "}
            <Link
              href="https://disease.sh/"
              target="_blank"
              rel="noopener noreferrer"
F            >
              The NovelCOVID API
            </Link>
          </Credit>
        </Content>
      </Container>
    </SFooter>
  );
}

export default Footer;
