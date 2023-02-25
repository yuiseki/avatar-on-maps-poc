import { SimpleMarker } from "./SimpleMarker";
import "./IconMarker.css";
import { MapboxEvent, useMap } from "react-map-gl";
import { useCallback, useEffect, useState } from "react";

type IconMarkerProps = {
  latitude: number;
  longitude: number;
  title: string;
  desc?: string;
  photo?: string;
  icon: string;
};

export const IconMarker: React.FC<IconMarkerProps> = ({
  latitude,
  longitude,
  title,
  desc,
  photo,
  icon,
}) => {
  const [currentZoom, setCurrentZoom] = useState(7);
  const { current: map } = useMap();

  useEffect(() => {
    if (!map) return;

    map.on("zoomend", (e) => {
      setCurrentZoom(e.viewState.zoom);
    });
  }, []);

  const flyTo = useCallback(
    (e: MapboxEvent<MouseEvent>) => {
      if (!map) return;

      if (currentZoom < 16) {
        map.flyTo({ center: [longitude, latitude], zoom: currentZoom + 4 });
      }
    },
    [map, currentZoom]
  );

  return (
    <SimpleMarker latitude={latitude} longitude={longitude} onClick={flyTo}>
      <div
        className="IconMarkerWrap"
        title={title + " " + desc}
        style={{
          opacity: (() => {
            if (!currentZoom) {
              return 1;
            } else {
              if (currentZoom < 8) {
                return 0.7;
              } else if (currentZoom < 9) {
                return 0.75;
              } else if (currentZoom < 12) {
                return 0.8;
              } else if (currentZoom < 13) {
                return 0.85;
              } else if (currentZoom < 14) {
                return 0.9;
              } else {
                return 1;
              }
            }
          })(),
        }}
      >
        {currentZoom < 16 ? (
          <div className="IconMarkerBalloon">
            <div className="IconMarkerBalloonTitle IconMarkerBalloonTitleMoreZoom">
              {currentZoom < 13 ? "" : title}...
            </div>
          </div>
        ) : (
          <div className="IconMarkerBalloon">
            <div className="IconMarkerBalloonTitle">{title}</div>
            <div className="IconMarkerBalloonContent">
              {photo && photo.length > 0 && (
                <div className="IconMarkerBalloonPhoto">
                  <img src={photo + "/raw"} />
                </div>
              )}
              {desc && desc.length > 0 && (
                <div className="IconMarkerBalloonDesc">{desc}</div>
              )}
            </div>
          </div>
        )}
        <div className="IconMarKerIcon">
          <img src={icon} />
        </div>
      </div>
    </SimpleMarker>
  );
};
