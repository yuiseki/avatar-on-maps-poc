import { Map, NavigationControl } from "react-map-gl";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { fetcher } from "./lib/fetcher";
import { points } from "./points";
import { IconMarker } from "./components/IconMarker";
import useSWR from "swr";

import "./App.css";

type GyamapResponse = {
  desc: string;
  latitude: number;
  longitude: number;
  photo: string;
  title: string;
  zoom: number;
}[];

const IconMarkerFromGyamap: React.FC<{
  projectName?: string;
  pageName?: string;
  iconName: string;
}> = ({ projectName, pageName, iconName }) => {
  const gyamapUrl = projectName
    ? "https://gyamap.com/project_entries/" + projectName
    : "https://gyamap.com/page_entries/" + pageName;
  const { data } = useSWR<GyamapResponse>(gyamapUrl, fetcher);

  if (!data) {
    return null;
  }

  return (
    <>
      {data.map((poi) => {
        return <IconMarker key={poi.title} icon={iconName} {...poi} />;
      })}
    </>
  );
};

function App() {
  return (
    <div className="App">
      <Map
        style={{
          display: "block",
          width: "100vw",
          height: "100vh",
        }}
        mapLib={maplibregl}
        mapStyle="https://tile.openstreetmap.jp/styles/osm-bright/style.json"
        attributionControl={true}
        initialViewState={{
          latitude: 37.69,
          longitude: 138.35,
          zoom: 4,
        }}
        hash={true}
        maxZoom={22}
        maxPitch={85}
      >
        {points.map((poi) => {
          return (
            <IconMarker key={poi.title} icon="./yuiseki_icon.png" {...poi} />
          );
        })}
        <IconMarkerFromGyamap
          projectName="yuiseki"
          iconName="yuiseki_icon.png"
        />
        <IconMarkerFromGyamap
          projectName="inoue2002"
          iconName="inoue2002_icon.png"
        />
        <IconMarkerFromGyamap
          projectName="masuimap"
          iconName="masui_icon.png"
        />
        <IconMarkerFromGyamap pageName="増井俊之" iconName="masui_icon.png" />
        <NavigationControl
          position="bottom-right"
          visualizePitch={true}
          showZoom={true}
          showCompass={true}
        />
      </Map>
    </div>
  );
}

export default App;
