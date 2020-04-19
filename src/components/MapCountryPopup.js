import React from "react";
import styled from "styled-components/macro";
import dayjs from "dayjs";
import { formatNumber } from "../utils/formatNumber";

const Wrapper = styled.article`
  position: relative;
  display: grid;
  grid-template-columns: repeat(2, minmax(100px, min-content));
  grid-template-rows: 1fr repeat(auto, 1.5fr);
  gap: 0.5rem;
  padding: 0.5rem;
`;

const HeaderSection = styled.div`
  display: flex;
  justify-content: ${(props) => props.alignRight ? 'flex-end' : 'flex-start'};
  align-items: center;
`;

const HeaderIcon = styled.img`
  width: 1.5rem;
  height: 1.5rem;
  margin-right: 0.25rem;
`;

const HeaderTitle = styled.p``;

const Separator = styled.hr`
  grid-column: span 2;
  width: calc(100% + 1rem);
  margin-left: -0.5rem;
`;

const Stat = styled.div``;

const StatTitle = styled.p`
  margin: 0;
  padding: 0;
`;

const StatValue = styled.p`
  margin: 0;
  padding: 0;
`;

const MapCountryPopup = ({
  name,
  icon,
  lastUpdated,
  confirmedCount,
  activeCount,
  recoveredCount,
  deathCount,
}) => {
  return (
    <Wrapper>
      <HeaderSection>
        {icon && <HeaderIcon src={icon} alt={name} />}
        <HeaderTitle>{name}</HeaderTitle>
      </HeaderSection>
      <HeaderSection alignRight>
        {/* TODO: Abstract away from here */}
        {dayjs(lastUpdated).format("D MMM YYYY")}
      </HeaderSection>
      <Separator />
      {confirmedCount && (
        <Stat>
          <StatTitle>Confirmed</StatTitle>
          <StatValue>{formatNumber({ value: confirmedCount })}</StatValue>
        </Stat>
      )}
      {activeCount && (
        <Stat>
          <StatTitle>Active</StatTitle>
          <StatValue>{formatNumber({ value: activeCount })}</StatValue>
        </Stat>
      )}
      {recoveredCount && (
        <Stat>
          <StatTitle>Recovered</StatTitle>
          <StatValue>{formatNumber({ value: recoveredCount })}</StatValue>
        </Stat>
      )}
      {deathCount && (
        <Stat>
          <StatTitle>Deaths</StatTitle>
          <StatValue>{formatNumber({ value: deathCount })}</StatValue>
        </Stat>
      )}
    </Wrapper>
  );
};

export { MapCountryPopup };
