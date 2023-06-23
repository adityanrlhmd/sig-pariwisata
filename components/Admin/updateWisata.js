import { createClient } from 'contentful-management';
import React from 'react';
('use client');
import { useState } from 'react';

export async function updateWisata(data, idWisata) {
  try {
    const client = createClient({
      accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_MANAGEMENT_KEY,
    });

    const space = await client.getSpace(process.env.NEXT_PUBLIC_CONTENTFUL_SPACE);
    const environment = await space.getEnvironment(process.env.NEXT_PUBLIC_CONTENTFUL_ENVIRONMENT);
    const entry = await environment.getEntry(idWisata);
    Object.assign(entry.fields, data);

    const changedEntry = await entry.update();

    await changedEntry.publish();
  } catch (err) {
    throw err;
  }
}

const UpdateWisata = ({ dataWisata, idWisata, setRefreshData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoadUpdate, setIsLoadUpdate] = useState(false);

  const [name, setName] = useState(dataWisata ? dataWisata.name : '');
  const [address, setAddress] = useState(dataWisata ? dataWisata.address : '');
  const [longitude, setLongitude] = useState(dataWisata ? dataWisata.coordinate.lon : 0);
  const [latitude, setLatitude] = useState(dataWisata ? dataWisata.coordinate.lat : 0);
  const [price, setPrice] = useState(dataWisata ? dataWisata.price : '');
  const [description, setDescription] = useState(dataWisata ? dataWisata.description : '');
  const handleModal = () => {
    setIsOpen(!isOpen);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const dataForm = {
      name: {
        'en-US': name,
      },
      address: {
        'en-US': address,
      },
      coordinate: {
        'en-US': {
          lon: parseFloat(longitude),
          lat: parseFloat(latitude),
        },
      },
      description: {
        'en-US': description,
      },
      price: {
        'en-US': price,
      },
    };

    setIsLoadUpdate(true);
    updateWisata(dataForm, idWisata)
      .then(() => {
        setRefreshData((prev) => !prev);
        handleModal();
      })
      .finally(() => setIsLoadUpdate(false));
  };

  return (
    <div>
      <button className="btn btn-xs btn-primary mb-2" onClick={handleModal}>
        Update
      </button>
      <div className={isOpen ? 'modal modal-open' : 'modal'}>
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-4">Update Data Wisata</h3>
          <form onSubmit={onSubmit}>
            <div className="form-control w-full mb-2">
              <input type="text" placeholder="Nama Wisata" className="input input-bordered" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="form-control w-full mb-2">
              <input type="text" placeholder="Alamat" className="input input-bordered" value={address} onChange={(e) => setAddress(e.target.value)} />
            </div>
            <div className="form-control w-full mb-2">
              <input type="number" placeholder="Longitude" className="input input-bordered" value={longitude} step={'any'} onChange={(e) => setLongitude(e.target.value)} />
            </div>
            <div className="form-control w-full mb-2">
              <input type="number" placeholder="Latitude " className="input input-bordered" value={latitude} step={'any'} onChange={(e) => setLatitude(e.target.value)} />
            </div>
            <div className="form-control w-full mb-2">
              <input type="text" placeholder="Deskripsi" className="input input-bordered" value={description} onChange={(e) => setDescription(e.target.value)} />
            </div>
            <div className="form-control w-full mb-2">
              <input type="text" placeholder="Harga Tiket" className="input input-bordered" value={price} onChange={(e) => setPrice(e.target.value)} />
            </div>
            <div className="modal-action">
              <button type="button" className="btn" onClick={handleModal}>
                Close
              </button>
              <button disabled={isLoadUpdate} type="submit" className="btn btn-primary">
                {isLoadUpdate ? (
                  <>
                    <span className="loading loading-spinner"></span> loading
                  </>
                ) : (
                  'Update'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateWisata;
