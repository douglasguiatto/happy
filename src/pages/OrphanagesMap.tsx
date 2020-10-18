import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiPlus, FiArrowRight } from "react-icons/fi"; //icone arrow
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import mapMarkerImg from "../images/map-marker.svg";
import "../styles/pages/orphanages-map.css";
import mapIcon from "../utils/mapIcon";
import api from "../services/apis";

interface Orphanage {
  id: number;
  latitude: number;
  longitude: number;
  name: string;
}
function OrphanagesMap() {
  const [orphanages, setOrphanages] = useState<Orphanage[]>([]);
  // prettier-ignore
  useEffect(() => {
    api.get("orphanages").then(response => {
      setOrphanages(response.data);
    });
  }, []);

  return (
    <div id="page-map">
      <aside>
        <header>
          <img src={mapMarkerImg} alt="Happy" />
          <h2>Escolha um orfanato no mapa</h2>
          <p>Muitas crianças estão esperando a sua visita :)</p>
        </header>
        <footer>
          <strong>Jundiaí</strong>
          <span>São Paulo</span>
        </footer>
      </aside>

      <Map
        center={[-23.1430301, -46.9666557]}
        zoom={12}
        style={{ width: "100%", height: "100%" }}
      >
        {/* <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" /> */}
        <TileLayer
          url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
        />
        {orphanages.map((orphanage) => {
          return (
            <Marker
              key={orphanage.id}
              icon={mapIcon}
              position={[orphanage.latitude, orphanage.longitude]}
            >
              <Popup
                className="map-popup"
                closeButton={false}
                minWidth={240}
                maxWidth={240}
              >
                {orphanage.name}
                <Link to={`/orphanages/${orphanage.id}`}>
                  <FiArrowRight size={20} color="#FFF" />
                </Link>
              </Popup>
            </Marker>
          );
        })}
      </Map>

      <Link to="/orphanages/create" className="create-orphanage">
        <FiPlus size={32} color="#FFF" />
      </Link>
    </div>
  );
}
export default OrphanagesMap;
