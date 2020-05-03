import React, { useEffect } from "react";
import styled from "styled-components/macro";
import formatNumber from "../../../utils/formatNumber";
import { useCountUp } from "react-countup";

const SStat = styled.div`
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

const Stat = ({ title, value: rawValue = 0 }) => {
  const { countUp: value } = useCountUp({
    start: 0,
    end: rawValue,
    delay: 0, // Start animating immediately
  });

  return (
    <SStat>
      <Title>{title}</Title>
      <Value>{formatNumber({ value })}</Value>
    </SStat>
  );
};

export default Stat;
