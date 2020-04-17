import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components/macro";
import {
  Map as LeafletMap,
  GeoJSON,
  TileLayer,
  Popup,
  FeatureGroup,
  Marker,
} from "react-leaflet";
import { default as Leaflet, latLng } from "leaflet";
import { useQuery } from "react-query";
import { getDetailedCountries } from "../libs/covid19";
import { formatCountriesToGeoJson } from "../utils/formatCountriesToGeoJson";

import "leaflet/dist/leaflet.css";
import config from "../config";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;

  & .leaflet-container {
    width: 100%;
    height: 100%;
  }

  & .leaflet-pane {
    z-index: 1;
  }

  & .leaflet-control-container > * {
    z-index: 2;
  }

  & .leaflet-marker-icon {
    background-color: red;
  }
`;

const WorldMap = ({}) => {
  const [position, setPosition] = useState([7, 2]);
  const [zoom, setZoom] = useState(3);

  const mapRef = useRef();

  const [countriesGeoJson, setCountriesGeoJson] = useState(null);
  const [countriesGeoJsonLayers, setCountriesGeoJsonLayers] = useState(null);

  // Detailed countries query
  const { status: countriesQueryStatus, data: countriesQueryData } = useQuery(
    ["detailed-countries", {}],
    getDetailedCountries
  );

  // Map effect
  useEffect(() => {
    console.log("puta madre");
    if (!mapRef.current || !countriesQueryData) return;

    const newCountriesGeoJson = formatCountriesToGeoJson({
      countries: countriesQueryData,
    });

    setCountriesGeoJson(newCountriesGeoJson);
  }, [mapRef, countriesQueryData]);

  const tileLayerUrl = `https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token=${config.mapboxAccessToken}`;

  return (
    <Wrapper>
      {countriesQueryData && (
        <LeafletMap
          center={position}
          zoom={zoom}
          ref={mapRef}
          zoomControl={false}
        >
          <TileLayer
            // url={tileLayerUrl}
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='© <a href="https://www.mapbox.com/feedback/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            tileSize={512}
            zoomOffset={-1}
          />
          {countriesQueryData.map((country) => (
            <Marker
              position={[country.countryInfo.lat, country.countryInfo.long]}
              onclick={(e) => console.log(country)}
            >
              <Popup>
                {country.country} - {country.cases}
              </Popup>
            </Marker>
          ))}
        </LeafletMap>
      )}
    </Wrapper>
  );
};

export { WorldMap };
