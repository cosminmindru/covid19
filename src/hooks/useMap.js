import { useState, useEffect } from "react";
import mapboxgl from "mapbox-gl";

import config from "../config";

/**
 * @param {string} container - DOM element to use as a mapbox container
 */
function useMap(container) {
  const [map, setMap] = useState(null);

  useEffect(() => {
    if (container) {
      mapboxgl.accessToken = config.mapboxAccessToken;

      const map = new mapboxgl.Map({
        container,
        style: "mapbox://styles/mapbox/streets-v11",
        center: [0, 0],
        zoom: 1,
      });

      setMap(map);
    }
  }, [container]);

  return { map };
}

export { useMap };
