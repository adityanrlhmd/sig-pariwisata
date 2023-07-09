import { createClient } from 'contentful-management';
import React from 'react';
{
  ('useClient');
}
import { useState } from 'react';
import { FaTrash } from 'react-icons/fa';

export async function deleteWisata(idWisata) {
  try {
    const client = createClient({
      accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_MANAGEMENT_KEY,
    });

    const space = await client.getSpace(process.env.NEXT_PUBLIC_CONTENTFUL_SPACE);
    const environment = await space.getEnvironment(process.env.NEXT_PUBLIC_CONTENTFUL_ENVIRONMENT);
    const entry = await environment.getEntry(idWisata);

    if (entry.isPublished()) {
      await entry.unpublish();
      await entry.delete();
    } else {
      await entry.delete();
    }
  } catch (err) {
    throw err;
  }
}

const DeleteWisata = ({ idWisata, setRefreshData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoadDelete, setIsLoadDelete] = useState(false);

  const handleModal = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div>
      <button className="btn bg-transparent border-none hover:bg-transparent px-11" onClick={handleModal}>
        <FaTrash color="red" className="w-5 h-5" />
      </button>
      <div className={isOpen ? 'modal modal-open' : 'modal'}>
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-4">Apa anda yakin menghapus data wisata ini </h3>
          <div className="modal-action">
            <button type="button" className="btn" onClick={handleModal}>
              No
            </button>
            <button
              disabled={isLoadDelete}
              onClick={(e) => {
                e.preventDefault();

                setIsLoadDelete(true);
                deleteWisata(idWisata)
                  .then(() => {
                    setRefreshData((prev) => !prev);
                    handleModal();
                  })
                  .finally(() => setIsLoadDelete(false));
              }}
              type="button"
              className="btn btn-primary"
            >
              {isLoadDelete ? <span className="loading loading-dots loading-md"></span> : 'Ya'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteWisata;
