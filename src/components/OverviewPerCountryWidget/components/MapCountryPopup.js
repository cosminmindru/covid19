import React from "react";
import styled from "styled-components/macro";
import { Popup as LeafletPopup } from "react-leaflet";
import formatNumber from "../../../utils/formatNumber";

const SMapCountryPopup = styled.article`
  position: relative;
  display: grid;
  grid-template-columns: repeat(2, minmax(6.25rem, min-content));
  grid-template-rows: 1fr repeat(auto, 1.5fr);
  gap: 0.5rem;
  width: 100%;
  max-width: 37.5rem;
  padding: 0.5rem;
  background-color: ${(props) => props.theme.colors.background};
  border-radius: ${(props) => props.theme.sizes.borderRadius};
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  grid-column: span 2;
`;

const CountryIcon = styled.img`
  height: 1.5rem;
  margin-right: 0.5rem;
  border-radius: 1rem;
`;

const CountryName = styled.p`
  font-size: 1rem;
  font-weight: 600;
  color: ${(props) => props.theme.colors.foreground};
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Separator = styled.div`
  grid-column: span 2;
  width: calc(100% + 1rem);
  height: 2px;
  margin-left: -0.5rem;
  background-color: ${(props) => props.theme.colors.accents2};
`;

const Stat = styled.div`
  color: ${(props) => props.theme.colors.foreground};
`;

const StatTitle = styled.p`
  margin: 0;
  padding: 0;
  font-size: 1rem;
  color: inherit;
`;

const StatValue = styled.p`
  margin: 0;
  padding: 0;
  color: inherit;
  font-size: 1.05rem;
  font-weight: 600;
`;

const MapCountryPopup = ({
  name,
  icon,
  confirmedCount,
  activeCount,
  recoveredCount,
  deathCount,
  countryInfo: { lat, long },
}) => {
  const position = [lat, long];

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
        <Header>
          {icon && <CountryIcon src={icon} alt={name} />}
          <CountryName>{name}</CountryName>
        </Header>
        <Separator />
        <Stat>
          <StatTitle>Confirmed</StatTitle>
          <StatValue>{formatNumber({ value: confirmedCount })}</StatValue>
        </Stat>
        <Stat>
          <StatTitle>Active</StatTitle>
          <StatValue>{formatNumber({ value: activeCount })}</StatValue>
        </Stat>
        <Stat>
          <StatTitle>Recovered</StatTitle>
          <StatValue>{formatNumber({ value: recoveredCount })}</StatValue>
        </Stat>
        <Stat>
          <StatTitle>Deaths</StatTitle>
          <StatValue>{formatNumber({ value: deathCount })}</StatValue>
        </Stat>
      </SMapCountryPopup>
    </LeafletPopup>
  );
};

export default MapCountryPopup;
