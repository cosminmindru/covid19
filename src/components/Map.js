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
import { getCountries } from "../libs/novelCovid/functions/countries";

import worldCountriesGeoJson from "../assets/world_countries.geo.json";

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

const BeepBoop = () => {
  return (
    <div>
      <h1>Hello bro</h1>
    </div>
  );
};

const COLOR_RANGES = {
  500000: "#00ff00",
  100000: "#00ff00",
  50000: "#00ff00",
  10000: "#00ff00",
  1000: "#00ff00",
  100: "#00ff00",
};

const WorldMap = ({ selectedCountry = null, onCountryClick = () => {} }) => {
  const [position, setPosition] = useState([7, 2]);
  const [zoom, setZoom] = useState(3);

  const [geoJson, setGeoJson] = useState(null);
  const [maxBounds, setMaxBounds] = useState(null);

  const mapRef = useRef();
  const geoJsonRef = useRef();

  // Detailed countries query
  const { status: countriesQueryStatus, data: countriesQueryData } = useQuery(
    ["detailed-countries", { sortBy: "cases" }],
    getCountries
  );

  // Map effect
  useEffect(() => {
    console.log("puta madre");
    if (!mapRef.current || !countriesQueryData) return;

    const countriesGeoJson = {
      ...worldCountriesGeoJson,
      features: worldCountriesGeoJson.features
        .map(({ type, properties, geometry }) => {
          const countryData = countriesQueryData.find((country) => {
            if (!country) return false;

            return country.countryInfo.iso3 === properties.iso_a3;
          });

          if (countryData) {
            return {
              type,
              properties: {
                ...properties,
                covid19: countryData,
              },
              geometry,
            };
          }

          return null;
        })
        .filter((country) => country),
    };
    const newGeoJson = Leaflet.geoJSON(countriesGeoJson);

    const newMaxBounds = newGeoJson.getBounds();

    setGeoJson(countriesGeoJson);
    setMaxBounds(newMaxBounds);
  }, [mapRef, countriesQueryData]);

  useEffect(() => {
    if (mapRef && !selectedCountry && maxBounds) {
      mapRef.current.leafletElement.fitBounds(maxBounds);
    }

    if (mapRef && selectedCountry && geoJson) {
      const country = geoJson.features.find(({ properties }) => {
        return (
          properties.covid19.countryInfo.iso3 ===
          selectedCountry.countryInfo.iso3
        );
      });

      if (country) {
        const countryGeoJson = Leaflet.geoJSON({
          type: "FeatureCollection",
          features: [country],
        });

        const bounds = countryGeoJson.getBounds();

        mapRef.current.leafletElement.fitBounds(bounds);
      }
    }
  }, [mapRef, selectedCountry, geoJson, maxBounds]);

  const tileLayerUrl = `https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token=${config.mapboxAccessToken}`;

  return (
    <Wrapper>
      {countriesQueryData && (
        <LeafletMap
          center={position}
          zoom={zoom}
          ref={mapRef}
          zoomControl={false}
          minZoom={2}
          // maxBounds={maxBounds}
          worldCopyJump
        >
          <TileLayer
            // url={tileLayerUrl}
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='© <a href="https://www.mapbox.com/feedback/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            tileSize={512}
            zoomOffset={-1}
          />
          {selectedCountry && (
            // Get Selected country data
            // Render popup with position and data of the selectedCountry
            <Popup
              position={[
                selectedCountry.countryInfo.lat,
                selectedCountry.countryInfo.long,
              ]}
              autoClose={false}
              closeButton={false}
              closeOnClick={false}
              closeOnEscapeKey={false}
            >
              <h1>{selectedCountry.country}</h1>
            </Popup>
          )}
          <GeoJSON
            ref={geoJsonRef}
            data={geoJson}
            onclick={({ layer }) => {
              const country = layer.feature.properties.covid19;

              onCountryClick(country);
            }}
            onEachFeature={(feature, layer) => {
              console.groupCollapsed("onEachFeature");
              console.log(feature);
              console.log(layer);
              console.groupEnd();
            }}
          />
        </LeafletMap>
      )}
    </Wrapper>
  );
};

export { WorldMap };
