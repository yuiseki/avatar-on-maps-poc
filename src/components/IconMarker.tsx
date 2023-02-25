import { SimpleMarker } from "./SimpleMarker";
import "./IconMarker.css";
import { useMap } from "react-map-gl";
import { useEffect, useState } from "react";

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

  return (
    <SimpleMarker latitude={latitude} longitude={longitude}>
      <div className="IconMarkerWrap" title={desc}>
        {currentZoom < 16 ? (
          <div className="IconMarkerBalloon">
            <div className="IconMarkerBalloonTitle IconMarkerBalloonTitleMoreZoom">
              {title}...
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
