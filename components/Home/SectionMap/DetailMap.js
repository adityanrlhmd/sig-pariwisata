import { createClient } from 'contentful';
import React, { useEffect, useState } from 'react'

async function getDetailMap(id) {
  const client = createClient({
    space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE,
    accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_KEY
  })

  const res = await client.getEntry(id)
  return res;
}

const DetailMap = ({ idEntry }) => {
  const [dataDetail, setDataDetail] = useState(null);
  const [isLoadDetail, setIsLoadDetail] = useState(false);

  useEffect(() => {
    if (idEntry) {
      setIsLoadDetail(true)
      getDetailMap(idEntry)
        .then((res) => {
          console.log(res)
          setDataDetail(res.fields)
        }).catch((err) => console.error(err))
        .finally(() => setIsLoadDetail(false))
    }
  }, [idEntry])

  return (
    <div>
      {dataDetail?.name}
    </div>
  )
}

export default DetailMap