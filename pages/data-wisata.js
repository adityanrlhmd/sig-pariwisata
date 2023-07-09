import image from 'next/image';
import { Inter } from 'next/font/google';
import { createClient } from 'contentful';
import Navbar from '@/components/Navbar';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { useRouter } from 'next/router';

const inter = Inter({ subsets: ['latin'] });

export async function getServerSideProps() {
  const client = createClient({
    space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE,
    accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_KEY,
  });

  const res = await client.getEntries({ content_type: 'wisata' });
  return { props: { data: res.items } };
}

export default function DataWisata({ data }) {
  const router = useRouter();
  // console.log(data);
  return (
    <main className="min-h-screen font-roboto">
      <Nav />

      <section id="home" className="bg-bottom py-52 bg-contrast-50" style={{ backgroundImage: 'url(img/pixabay.jpg)' }}>
        <div className="container px-4 text-center text-white">
          <h1 className=" text-5xl font-semibold lg:text-4xl xl:text-5xl">Data Wisata</h1>
          <p className="text-base lg:text-xl xl:text-2xl">Halaman ini memuat informasi mengenai destinasi wisata di Kabupaten Sukabumi</p>
        </div>
      </section>
      <div className="px-2 py-6 lg:p-10 flex flex-wrap justify-center gap-4 bg-repeat" style={{ backgroundImage: 'url(img/group.png)' }}>
        {data.map((item, index) => {
          const dataWisata = item.fields;
          return (
            <div key={index} className="card w-full md:w-96 bg-slate-900 bg-opacity-10 backdrop-blur-sm shadow-sm text-gray-600 ">
              <div className="card-body">
                <h2 className="card-title">{dataWisata.name}</h2>
                <p>{dataWisata.address}</p>
                <p>Harga Tiket: {dataWisata.price}</p>
                <button
                  onClick={() => {
                    router.push(`/data-wisata/${item.sys.id}`);
                  }}
                  className="rounded-full px-4 py-2 font-normal bg-info w-32 text-xs hover:translate-x-3 transition"
                >
                  Lihat detail
                </button>
              </div>
            </div>
          );
        })}
        ;
      </div>
      <Footer />
    </main>
  );
}
