import React from "react";
import styled from "styled-components/macro";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 0.25rem 0;
`;

const Title = styled.div`
  width: 100%;
  max-width: 6rem;
  height: 1rem;
  background-color: ${props => props.theme.colors.grey100};
  margin-bottom: 1.25rem;
`;

const Value = styled.div`
  width: 100%;
  max-width: 10rem;
  height: 2rem;
  background-color: ${props => props.theme.colors.grey100};
`;

const StatSkeleton = () => {
  return (
    <Wrapper>
      <Title />
      <Value />
    </Wrapper>
  );
};

export default StatSkeleton;
