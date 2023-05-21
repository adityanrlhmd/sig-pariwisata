import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { createClient } from 'contentful';
import dynamic from 'next/dynamic';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] })

const SectionMap = dynamic(() => import('@/components/Home/SectionMap'), { ssr: false })

export default function Home({ data }) {
  return (
    <main
      className={` min-h-screen ${inter.className}`}
    >
      <Navbar />

      <section id="home" className="py-48 bg-cover" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1682686579688-c2ba945eda0e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80)' }}>
        <div className="container px-4 text-white">
          <h2 className="mb-6 text-base lg:text-xl xl:text-2xl">Sistem Informasi Geografis Destinasi Wisata</h2>
          <h1 className="max-w-md mb-6 text-5xl font-semibold uppercase lg:text-6xl xl:text-8xl">kabupaten sukabumi</h1>
          <p className="max-w-xl text-base lg:max-w-3xl lg:text-xl xl:text-2xl">
            Sistem informasi ini merupakan aplikasi geografis pemetaan destinasi wisata di wilayah Sukabumi. aplikasi ini memberikan informasi dan lokasi dari tempat wisata di Sukabumi.
          </p>
        </div>
      </section>

      <SectionMap dataWisata={data.items} />

      <Footer />
    </main>
  )
}

export async function getServerSideProps() {
  const client = createClient({
    space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE,
    accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_KEY
  })

  const res = await client.getEntries({ content_type: 'wisata' })
  return { props: { data: res } };
}