import React, { useState } from 'react'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import Leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css'

import Drawer from 'react-modern-drawer'
import 'react-modern-drawer/dist/index.css'
import DetailMap from './DetailMap';

const position = [-6.9208, 106.9258]

const newicon = new Leaflet.Icon({
  iconUrl: "https://cdn.iconscout.com/icon/free/png-512/free-pin-locate-marker-location-navigation-16-28668.png?f=avif&w=512",
  iconSize: [45, 45],
})

const SectionMap = ({ dataWisata }) => {
  const [isOpenDetail, setIsOpenDetail] = useState(false);
  const [idEntry, setIdEntry] = useState('');

  return (
    <>
      <Drawer
        open={isOpenDetail}
        onClose={() => {
          setIsOpenDetail(prev => !prev)
          setIdEntry('')
        }}
        direction='right'
        className='wrap-detail-wisata'
      >
        <DetailMap idEntry={idEntry} />
      </Drawer>

      <section>
        <div className="text-center">
          <h1 className="mt-48 mb-4 text-2xl font-semibold md:text-3xl lg:text-4xl">Peta Lokasi Wisata</h1>

          <MapContainer
            center={position}
            zoom={12}
            scrollWheelZoom={false}
            style={{ width: '100%' }}
            className='min-h-[300px] lg:min-h-[60vh]'
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {
              dataWisata.map((item, index) => {
                const fields = item.fields;
                const coordinateMark = [fields.coordinate.lat, fields.coordinate.lon];

                const openDetail = () => {
                  setIsOpenDetail(true)
                  setIdEntry(item.sys.id)
                }

                return (
                  <Marker
                    key={index}
                    position={coordinateMark}
                    icon={newicon}
                  >
                    <Popup>
                      <span>{fields.name}</span> <br />
                      <span onClick={openDetail} className='cursor-pointer'>Open detail</span>
                    </Popup>
                  </Marker>
                )
              })
            }
          </MapContainer>

          <h1 className="mb-4 text-2xl font-semibold mt-28 md:text-3xl lg:text-4xl">Jangkauan Peta</h1>
          <p className="p-4 text-base font-medium text-slate-600 md:px-48 lg:px-60 lg:text-lg">
            Aplikasi pemetaan geografis Wisata di kabupaten Sukabumi ini memberikan informasi dan lokasi dari Wisata ALam dan WIsata Kuliner di Sukabumi. Pemetaan diambil dari data lokasi Google Maps dan data dari website masing-masing tempat
            wisata. Aplikasi ini memuat sejumlah informasi mengenai :
          </p>
        </div>
        <div className="my-48">
          <h1 className="mb-4 text-2xl font-semibold text-center md:text-3xl lg:text-4xl">Jumlah Tempat Wisata</h1>
          <h2 className="text-2xl font-semibold text-center md:text-3xl lg:text-4xl">20</h2>
        </div>
      </section>
    </>
  )
}

export default SectionMap