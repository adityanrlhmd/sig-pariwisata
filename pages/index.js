import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { createClient } from 'contentful';
import dynamic from 'next/dynamic';
import { Inter } from 'next/font/google';
import Nav from '@/components/Nav';

// const inter = Inter({ subsets: ['latin'] });

const SectionMap = dynamic(() => import('@/components/Home/SectionMap'), { ssr: false });

export default function Home({ data }) {
  // console.log(data);
  return (
    <main className="min-h-screen font-roboto">
      <Nav />

      <section
        id="home"
        className="py-28 lg:py-48 bg-cover"
        style={{
          backgroundImage: 'url(img/istawali.jpg)',
        }}
      >
        <div className="container px-4 text-white">
          <h2 className="mb-6 text-base uppercase lg:text-lg xl:text-xl">Sistem Informasi Geografis Destinasi Wisata</h2>
          <h1 className="max-w-md mb-6 text-4xl font-semibold uppercase lg:text-5xl xl:text-7xl">kabupaten sukabumi</h1>
          <p className="max-w-xl text-justify text-base lg:max-w-3xl lg:text-lg xl:text-xl">
            Sistem informasi ini merupakan aplikasi geografis pemetaan destinasi wisata di wilayah Sukabumi. aplikasi ini memberikan informasi dan lokasi dari tempat wisata di Sukabumi.
          </p>
        </div>
      </section>

      <SectionMap dataWisata={data.items} />

      <Footer />
    </main>
  );
}

export async function getServerSideProps() {
  const client = createClient({
    space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE,
    accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_KEY,
  });

  const res = await client.getEntries({ content_type: 'wisata' });
  return { props: { data: res } };
}
