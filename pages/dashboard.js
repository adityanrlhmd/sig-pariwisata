import React, { useEffect, useState } from 'react';
import NavAdmin from '@/components/Admin/navbar';
import { createClient } from 'contentful';
import Footer from '@/components/Footer';
import { Inter } from 'next/font/google';
import Link from 'next/link';
import AddWisata from '@/components/Admin/addWisata';
import DeleteWisata from '@/components/Admin/deleteWisata';
import UpdateWisata from '@/components/Admin/updateWisata';

// const inter = Inter({ subsets: ['latin'] });

export async function getAllWisata() {
  try {
    const client = createClient({
      space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE,
      accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_KEY,
    });

    const res = await client.getEntries({ content_type: 'wisata' });

    return res;
  } catch (err) {
    throw err;
  }
}

export default function DataWisata() {
  const [refreshData, setRefreshData] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    getAllWisata()
      .then((res) => {
        setData(res.items);
      })
      .catch((err) => {
        console.error(err);
      });

    return () => setRefreshData(false);
  }, [refreshData]);

  return (
    <main className="font-roboto min-h-screen">
      <NavAdmin />
      <div className="px-14 py-28">
        <div className="flex justify-between mb-4">
          <div>
            <AddWisata setRefreshData={setRefreshData} />
          </div>
          <div className="form-control">
            <input type="text" placeholder="Search" className="input input-bordered" />
          </div>
        </div>
        <table className="table-normal table-zebra w-full border">
          <thead className="border bg-gray-200">
            <tr className="">
              <th className="px-2 py-4 border w-[5%]">No.</th>
              <th className="px-2 py-4 w-[20%]">Nama Wisata</th>
              <th className="px-2 py-4 w-[30%]">Alamat</th>
              <th className="px-2 py-4 w-[10%]">Longitude</th>
              <th className="px-2 py-4 w-[10%]">Latitude</th>
              <th className="px-2 py-4 w-[10%]">Harga Tiket</th>
              <th className="px-2 py-4 w-[10%]">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => {
              const dataWisata = item.fields;
              return (
                <tr className="border" key={index}>
                  <td className="p-4 align-top text left border text-center">{index + 1}</td>
                  <td className="p-4 align-top text left ">{dataWisata.name}</td>
                  <td className="p-4 text-justify align-top text left ">{dataWisata.address}</td>
                  <td className="p-4 align-top text left ">{dataWisata.coordinate.lon}</td>
                  <td className="p-4 align-top text left ">{dataWisata.coordinate.lat}</td>
                  <td className="p-4 align-top text left ">{dataWisata.price}</td>
                  <td className="p-4 align-top">
                    <UpdateWisata idWisata={item.sys.id} dataWisata={dataWisata} setRefreshData={setRefreshData} />
                    <DeleteWisata idWisata={item.sys.id} setRefreshData={setRefreshData} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <Footer />
    </main>
  );
}
