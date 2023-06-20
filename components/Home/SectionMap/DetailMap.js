import { createClient } from 'contentful';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

async function getDetailMap(id) {
  const client = createClient({
    space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE,
    accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_KEY,
  });

  const res = await client.getEntry(id);
  return res;
}

const DetailMap = ({ idEntry }) => {
  const [dataDetail, setDataDetail] = useState(null);
  const [isLoadDetail, setIsLoadDetail] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (idEntry) {
      setIsLoadDetail(true);
      getDetailMap(idEntry)
        .then((res) => {
          console.log(res);
          setDataDetail(res.fields);
        })
        .catch((err) => console.error(err))
        .finally(() => setIsLoadDetail(false));
    }
  }, [idEntry]);

  if (isLoadDetail) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-2 mt-20">
      <table>
        <tr>
          <td className="border-b align-top text-start " width="40%">
            Nama Wisata
          </td>
          <td className="border-b align-top text-start " width="60%">
            {dataDetail?.name}
          </td>
        </tr>
        <tr>
          <td className="border-b align-top text-start">Alamat</td>
          <td className="border-b align-top text-start">{dataDetail?.address}</td>
        </tr>
      </table>
    </div>
  );
};

export default DetailMap;
