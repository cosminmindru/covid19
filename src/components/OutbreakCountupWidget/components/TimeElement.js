import React from "react";
import styled from "styled-components/macro";
import { useTransition, animated } from "react-spring";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

const Value = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 2rem;
  margin-bottom: 0.5rem;
  font-size: 1.5rem;
  text-align: center;
  color: ${(props) => props.theme.colors.text};

  @media ${(props) => props.theme.breakpoints.tablet} {
    height: 2.5rem;
    font-size: 1.8rem;
  }
`;

const Label = styled.h5`
  font-size: 1rem;

  @media ${(props) => props.theme.breakpoints.desktop} {
    font-size: 1.2rem;
  }
`;

/**
 * @param {object} params
 * @param {number} params.value
 * @param {string} params.label
 * @returns {React.FC}
 */
const TimeElement = ({ value, label }) => {
  const transitions = useTransition(value, (x) => x, {
    from: {
      opacity: 0,
      transform: "translate3d(0,100%,0)",
      position: "absolute",
    },
    enter: { opacity: 1, transform: "translate3d(0,0%,0)" },
    leave: { opacity: 0, transform: "translate3d(0,-65%,,0)" },
    initial: {
      opacity: 1,
      transform: "translate3d(0,0%,0)",
    },
  });

  return (
    <Wrapper>
      <Value>
        {transitions.map(({ item, props, key }) => (
          <animated.span key={key} style={props}>
            {item}
          </animated.span>
        ))}
      </Value>
      <Label>{label}</Label>
    </Wrapper>
  );
};

export default TimeElement;
