import React from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import Leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';

const newicon = new Leaflet.Icon({
  iconUrl: 'https://cdn.iconscout.com/icon/free/png-512/free-pin-locate-marker-location-navigation-16-28668.png?f=avif&w=512',
  iconSize: [45, 45],
});

const DetailMap = ({ position = [-7.010838, 106.7900198], contentDetailMark, positionMark = [-7.010838, 106.7900198] }) => {
  return (
    <MapContainer center={position} zoom={10} scrollWheelZoom={false} style={{ width: '100%' }} className="w-72 h-96 ">
      <TileLayer attribution='&copy; <Link href="https://www.openstreetmap.org/copyright">OpenStreetMap</Link> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={positionMark} icon={newicon}>
        <Popup>{contentDetailMark}</Popup>
      </Marker>
    </MapContainer>
  );
};

export default DetailMap;
