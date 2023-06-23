import { createClient } from 'contentful-management';
import React from 'react';
('use client');
import { useState } from 'react';
// import {createClient} from 'contentful-management';

export async function addNewWisata(data) {
  try {
    const client = createClient({
      accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_MANAGEMENT_KEY,
    });

    const space = await client.getSpace(process.env.NEXT_PUBLIC_CONTENTFUL_SPACE);
    const environment = await space.getEnvironment(process.env.NEXT_PUBLIC_CONTENTFUL_ENVIRONMENT);
    const entry = await environment.createEntry('wisata', {
      fields: data,
    });

    await entry.publish();
  } catch (err) {
    throw err;
  }
}

const AddWisata = ({ setRefreshData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoadAdd, setIsLoadAdd] = useState(false);

  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [longitude, setLongitude] = useState(0);
  const [latitude, setLatitude] = useState(0);
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');

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

    setIsLoadAdd(true);
    addNewWisata(dataForm)
      .then(() => {
        setRefreshData((prev) => !prev);
        handleModal();
      })
      .finally(() => setIsLoadAdd(false));
  };
  return (
    <div>
      <button className="btn btn-outline btn-primary" onClick={handleModal}>
        + Add New
      </button>
      <div className={isOpen ? 'modal modal-open' : 'modal'}>
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-4">Add New Wisata</h3>
          <form onSubmit={onSubmit}>
            <div className="form-control w-full mb-2">
              <input type="text" placeholder="Nama Wisata" className="input input-bordered" onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="form-control w-full mb-2">
              <input type="text" placeholder="Alamat" className="input input-bordered" onChange={(e) => setAddress(e.target.value)} />
            </div>
            <div className="form-control w-full mb-2">
              <input type="number" placeholder="Longitude" className="input input-bordered" step={'any'} onChange={(e) => setLongitude(e.target.value)} />
            </div>
            <div className="form-control w-full mb-2">
              <input type="number" placeholder="Latitude " className="input input-bordered" step={'any'} onChange={(e) => setLatitude(e.target.value)} />
            </div>
            <div className="form-control w-full mb-2">
              <input type="text" placeholder="Deskripsi" className="input input-bordered" onChange={(e) => setDescription(e.target.value)} />
            </div>
            <div className="form-control w-full mb-2">
              <input type="text" placeholder="Harga Tiket" className="input input-bordered" onChange={(e) => setPrice(e.target.value)} />
            </div>
            <div className="modal-action">
              <button type="button" className="btn" onClick={handleModal}>
                Close
              </button>
              <button disabled={isLoadAdd} type="submit" className="btn btn-primary">
                {isLoadAdd ? <span className="loading loading-spinner text-primary"></span> : 'Submit'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddWisata;
