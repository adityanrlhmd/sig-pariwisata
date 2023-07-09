import React from 'react';
import { createClient } from 'contentful';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import Leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MdZoomOutMap } from 'react-icons/md';
import { useState } from 'react';
import Drawer from 'react-modern-drawer';
import 'react-modern-drawer/dist/index.css';
import DetailMap from './SectionMap/DetailMap';

const position = [-7.010838, 106.7900198];

const newicon = new Leaflet.Icon({
  iconUrl: 'https://cdn.iconscout.com/icon/free/png-512/free-pin-locate-marker-location-navigation-16-28668.png?f=avif&w=512',
  iconSize: [45, 45],
});

const ZoomMap = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenDetail, setIsOpenDetail] = useState(false);
  const [idEntry, setIdEntry] = useState('');

  const handleModal = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div>
      <Drawer
        open={isOpenDetail}
        onClose={() => {
          setIsOpenDetail((prev) => !prev);
          setIdEntry('');
        }}
        direction="right"
        className="wrap-detail-wisata"
      >
        <DetailMap idEntry={idEntry} />
      </Drawer>
      <button className="btn bg-transparent border-none hover:bg-transparent absolute top-2 right-2 z-[9997]" onClick={handleModal}>
        <MdZoomOutMap className="w-8 h-8" color="black" />
      </button>
      <div className={isOpen ? 'modal modal-open' : 'modal'}>
        <div className="modal-box max-w-screen-2xl min-h-screen">
          <MapContainer center={position} zoom={10} scrollWheelZoom={false} style={{ width: '100%' }} className="min-h-[300px] lg:min-h-[70vh] ">
            <TileLayer attribution='&copy; <Link href="https://www.openstreetmap.org/copyright">OpenStreetMap</Link> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {data.map((item, index) => {
              const fields = item.fields;
              const coordinateMark = [fields.coordinate.lat, fields.coordinate.lon];

              const openDetail = () => {
                setIsOpenDetail(true);
                setIdEntry(item.sys.id);
              };

              return (
                <Marker key={index} position={coordinateMark} icon={newicon}>
                  <Popup>
                    <span>{fields.name}</span> <br />
                    <span onClick={openDetail} className="cursor-pointer">
                      Open detail
                    </span>
                  </Popup>
                </Marker>
              );
            })}
          </MapContainer>
        </div>
      </div>
    </div>
  );
};

export default ZoomMap;
