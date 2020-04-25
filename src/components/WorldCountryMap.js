import React, { useState, useEffect, useRef, useCallback } from "react";
import styled from "styled-components/macro";
import Leaflet from "leaflet";
import { Map, GeoJSON, TileLayer } from "react-leaflet";
import { createWorldCountriesGeoJSON } from "../utils/createWorldCountriesGeoJSON";
import config from "../config";
import { MapCountryPopup } from "../components/MapCountryPopup";

import "leaflet/dist/leaflet.css";

const SWorldCountryMap = styled.div`
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

  & .leaflet-popup-content,
  & .leaflet-popup-content p {
    margin: initial;
    padding: initial;
  }

  & .leaflet-popup-content-wrapper {
    padding: 0;
    border-radius: 0;
    background-color: transparent;
  }
`;

const WorldCountryMap = ({
  countries = [],
  activeCountry = null,
  onCountryClick = () => {},
}) => {
  const [geoJSON, setGeoJson] = useState(null);
  const [maxBounds, setMaxBounds] = useState(null);

  const [hoveredCountry, setHoveredCountry] = useState(null);

  const mapRef = useRef();
  const center = [7, 2];
  const zoom = 3;
  const minZoom = 2;
  const tileLayerUrl = `https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token=${config.mapboxAccessToken}`;

  const handleGeoJSONClick = (event) => {
    const {
      layer: {
        feature: { properties: country },
      },
    } = event;

    onCountryClick(country);
  };

  /**
   * Resets the map zoom
   */
  const resetZoom = useCallback(() => {
    if (mapRef && maxBounds) {
      mapRef.current.leafletElement.fitBounds(maxBounds);
    }
  }, [mapRef, maxBounds]);

  /**
   * Zoom on a country if it is available in the geoJSON
   */
  const zoomOnCountry = useCallback(
    (country) => {
      if (mapRef && geoJSON) {
        const geoJSONClass = Leaflet.geoJSON(geoJSON);

        const {
          countryInfo: { iso3: countryIso3 },
        } = country;

        // Find the feature related to the country
        const countryLayer = Object.values(geoJSONClass._layers).find(
          (layer) => {
            const {
              feature: {
                properties: {
                  countryInfo: { iso3: layerIso3 },
                },
              },
            } = layer;

            return countryIso3 === layerIso3;
          }
        );

        if (countryLayer) {
          const countryFeatureBounds = countryLayer.getBounds();

          mapRef.current.leafletElement.fitBounds(countryFeatureBounds);
        }
      }
    },
    [mapRef, geoJSON]
  );

  // Generate and set the countries GeoJSON and max bounds
  useEffect(() => {
    if (mapRef && countries.length) {
      const countriesGeoJSONObject = createWorldCountriesGeoJSON({ countries });
      const countriesGeoJSONClass = Leaflet.geoJSON(countriesGeoJSONObject);
      const countriesGeoJSONBounds = countriesGeoJSONClass.getBounds();

      setGeoJson(countriesGeoJSONObject);
      setMaxBounds(countriesGeoJSONBounds);
    }
  }, [mapRef, countries]);

  // Control the map zoom
  useEffect(() => {
    // If no country is selected reset the map zoom
    if (!activeCountry) {
      resetZoom();

      return;
    }

    // Zoom on the selected country
    zoomOnCountry(activeCountry);
  }, [activeCountry, resetZoom, zoomOnCountry]);

  return (
    <SWorldCountryMap>
      <Map
        ref={mapRef}
        center={center}
        zoom={zoom}
        minZoom={minZoom}
        worldCopyJump
      >
        <TileLayer
          url={tileLayerUrl}
          // url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='© <a href="https://www.mapbox.com/feedback/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          tileSize={512}
          zoomOffset={-1}
        />
        {activeCountry && (
          <MapCountryPopup
            name={activeCountry.country}
            icon={activeCountry.icon}
            lastUpdated={activeCountry.updated}
            confirmedCount={activeCountry.cases}
            activeCount={activeCountry.active}
            recoveredCount={activeCountry.recovered}
            deathCount={activeCountry.deaths}
            countryInfo={activeCountry.countryInfo}
          />
        )}
        {geoJSON && (
          <GeoJSON
            data={geoJSON}
            onclick={handleGeoJSONClick}
            onmouseover={(event) => {
              setHoveredCountry(event.layer.feature.properties);
            }}
            onmouseout={() => {
              setHoveredCountry(null);
            }}
            style={(feature) => {
              const isHovered =
                hoveredCountry &&
                feature.properties.countryInfo.iso3 ===
                  hoveredCountry.countryInfo.iso3;

              if (isHovered) {
                return {
                  fillColor: "transparent",
                  color: "blue",
                  opacity: 0.6,
                };
              }

              return {
                fillColor: feature.properties.color,
                color: "transparent",
              };
            }}
          />
        )}
      </Map>
    </SWorldCountryMap>
  );
};

export { WorldCountryMap };
