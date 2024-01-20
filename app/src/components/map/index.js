import React, { useRef, useState, useEffect } from "react";
import "./style.css";
import * as ol from "ol";
import XYZ from "ol/source/XYZ";
import { MapContainer } from "./style";
import { fromLonLat } from "ol/proj";
import OLTileLayer from "ol/layer/Tile";

const Map = ({ children, zoom, center, data }) => {
  const mapRef = useRef();
  const [map, setMap] = useState(null);

  useEffect(() => {
    var viewPorts = document.getElementsByClassName("ol-viewport");
    if (viewPorts.length == 0) {
      const view = new ol.View({
        center: center,
        zoom: zoom,
      });
      let mapObject = new ol.Map({
        target: "map",
        layers: [
          new OLTileLayer({
            source: new XYZ({
              url: "https://maps.googleapis.com/maps/vt?pb=!1m5!1m4!1i{z}!2i{x}!3i{y}!4i256!2m3!1e0!2sm!3i629365462!3m17!2sen-US!3sUS!5e18!12m4!1e68!2m2!1sset!2sRoadmap!12m3!1e37!2m1!1ssmartmaps!12m4!1e26!2m2!1sstyles!2zcy5lOmx8cC52Om9uLHMuZTpsLnQuZnxwLnM6MzZ8cC5jOiMwMDAwMDB8cC5sOjQwLHMuZTpsLnQuc3xwLnY6b258cC5jOiMwMDAwMDB8cC5sOjE2LHMuZTpsLml8cC52Om9mZixzLnQ6MXxzLmU6Zy5mfHAuYzojMDAwMDAwfHAubDoyMCxzLnQ6MXxzLmU6Zy5zfHAuYzojMDAwMDAwfHAubDoxN3xwLnc6MS4yLHMudDoxOXxzLmU6bC50LmZ8cC5jOiNjNGM0YzQscy50OjIwfHMuZTpsLnQuZnxwLmM6IzcwNzA3MCxzLnQ6NXxzLmU6Z3xwLmM6IzAwMDAwMHxwLmw6MjAscy50OjJ8cy5lOmd8cC5jOiMwMDAwMDB8cC5sOjIxfHAudjpvbixzLnQ6MzN8cy5lOmd8cC52Om9uLHMudDo0OXxzLmU6Zy5mfHAuYzojYmUyMDI2fHAubDowfHAudjpvbixzLnQ6NDl8cy5lOmcuc3xwLnY6b2ZmLHMudDo0OXxzLmU6bC50LmZ8cC52Om9mZixzLnQ6NDl8cy5lOmwudC5zfHAudjpvZmZ8cC5oOiNmZjAwMGEscy50OjUwfHMuZTpnfHAuYzojMDAwMDAwfHAubDoxOCxzLnQ6NTB8cy5lOmcuZnxwLmM6IzU3NTc1NyxzLnQ6NTB8cy5lOmwudC5mfHAuYzojZmZmZmZmLHMudDo1MHxzLmU6bC50LnN8cC5jOiMyYzJjMmMscy50OjUxfHMuZTpnfHAuYzojMDAwMDAwfHAubDoxNixzLnQ6NTF8cy5lOmwudC5mfHAuYzojOTk5OTk5LHMudDo1MXxzLmU6bC50LnN8cC5zOi01MixzLnQ6NHxzLmU6Z3xwLmM6IzAwMDAwMHxwLmw6MTkscy50OjZ8cy5lOmd8cC5jOiMwMDAwMDB8cC5sOjE3!4e0!23i1379903&key=AIzaSyAOqYYyBbtXQEtcHG7hwAwyCPQSYidG8yU&token=31558",
            }),
          }),
        ],
        view: view,
      });
      mapObject.setTarget(mapRef.current);
      setMap(mapObject);
    }
  }, [center, zoom]);

  useEffect(() => {
    if (map && data) {
      data.forEach((element) => {
        var marker_el = document.getElementById(`marker${element.id}`);
        var marker = new ol.Overlay({
          position: fromLonLat([element.latitude, element.longitude]),
          positioning: "center-center",
          element: marker_el,
          dragging: false,
        });
        map.addOverlay(marker);
      });
    }

    //eslint-disable-next-line
  }, [map, data]);

  return <MapContainer ref={mapRef}>{children}</MapContainer>;
};

export default Map;
