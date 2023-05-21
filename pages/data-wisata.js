import Image from 'next/image'
import { Inter } from 'next/font/google'
import { createClient } from 'contentful';
import Navbar from '@/components/Navbar';

const inter = Inter({ subsets: ['latin'] })

export async function getServerSideProps() {
  const client = createClient({
    space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE,
    accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_KEY
  })

  const res = await client.getEntries({ content_type: 'wisata' })
  return { props: { data: res } };
}

export default function DataWisata({ data }) {
  console.log(data.items)
  return (
    <main
      className={` min-h-screen ${inter.className}`}
    >
      <Navbar />

      <section id="home" class="bg-cover py-48" style={{backgroundImage: 'url(https://images.unsplash.com/photo-1682686579688-c2ba945eda0e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80)'}}>
        <div class="container px-4 text-center text-white">
          <h1 class="mb-6 text-5xl font-semibold lg:text-4xl xl:text-5xl">Data Wisata</h1>
          <p class="text-base lg:text-xl xl:text-2xl">Halaman ini memuat informasi mengenai destinasi wisata di Kabupaten Sukabumi</p>
        </div>
      </section>

      <section>
        <div class="my-48 container h-96 bg-slate-500 text-center">Data Wisata</div>
      </section>
    </main>
  )
}
