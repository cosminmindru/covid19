import React from "react";
import styled from "styled-components/macro";
import dayjs from "dayjs";
import { Popup as LeafletPopup } from "react-leaflet";
import { formatNumber } from "../utils/formatNumber";

const SMapCountryPopup = styled.article`
  position: relative;
  display: grid;
  grid-template-columns: repeat(2, minmax(100px, min-content));
  grid-template-rows: 1fr repeat(auto, 1.5fr);
  gap: 0.5rem;
  padding: 0.5rem;
`;

const HeaderSection = styled.div`
  display: flex;
  justify-content: ${(props) => (props.alignRight ? "flex-end" : "flex-start")};
  align-items: center;
`;

const CountryFlag = styled.img`
  height: 1.25rem;
  margin-right: 0.25rem;
`;

const CountryName = styled.p``;

const HeaderLastUpdated = styled.p``;

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
  lastUpdated,
  lastUpdatedFormat = "D MMM YYYY",
  confirmedCount,
  activeCount,
  recoveredCount,
  deathCount,
  countryInfo: { lat, long, flag },
}) => {
  const position = [lat, long];
  const formattedLastUpdated = dayjs(lastUpdated).format(lastUpdatedFormat);

  return (
    <LeafletPopup
      position={position}
      autoClose={false}
      closeButton={false}
      closeOnClick={false}
      closeOnEscapeKey={false}
      autoPan={false}
    >
      <SMapCountryPopup>
        <HeaderSection>
          {flag && <CountryFlag src={flag} alt={name} />}
          <CountryName>{name}</CountryName>
        </HeaderSection>
        <HeaderSection alignRight>
          {formattedLastUpdated && (
            <HeaderLastUpdated>{formattedLastUpdated}</HeaderLastUpdated>
          )}
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
      </SMapCountryPopup>
    </LeafletPopup>
  );
};

export { MapCountryPopup };
