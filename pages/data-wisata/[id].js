import { createClient } from 'contentful';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';

export async function getServerSideProps(ctx) {
  const client = createClient({
    space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE,
    accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_KEY,
  });

  const res = await client.getEntry(ctx.query.id);
  return { props: { data: res } };
}

export default function DetailWisata({ data }) {
  const detailWisata = data.fields;
  // const [photos, setPhotos] = useState([]);

  // useEffect(() => {
  //   async function fetchData() {
  //     const photoData = await fetchPhotoData();
  //     setPhotos(photoData);
  //   }

  //   fetchData();
  // }, []);
  // console.log(data.fields);
  return (
    <main className="font-roboto " style={{ backgroundImage: 'url(../img/group.png)' }}>
      <Navbar />
      <section className="bg-bottom py-52" style={{ backgroundImage: 'url(../img/francesco.jpg)' }}>
        <div className="container px-4 text-center text-white">
          <h1 className=" text-5xl font-semibold lg:text-4xl xl:text-5xl uppercase">detail data wisata</h1>
        </div>
      </section>
      <div className="my-32 flex bg-slate-600 bg-opacity-20 shadow-sm backdrop-blur-lg rounded-3xl py-16 container gap-2 ">
        <div className="w-3/4">
          <h1 className="text-2xl font-semibold px-1 pb-2">Informasi Wisata</h1>
          <table className="table-normal w-full">
            <tbody className="text-slate-500">
              <tr className="border-b border-slate-100">
                <td className="py-2 align-top  left w-[20%]">Nama Wisata</td>
                <td className="py-2 font-semibold align-top left">{detailWisata.name}</td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="py-2 align-top  left">Alamat</td>
                <td className="py-2 text-justify font-semibold align-top  left">{detailWisata.address}</td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="py-2 align-top  left">Deskripsi</td>
                <td className="py-2 text-justify font-semibold align-top  left">
                  It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as
                  opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum'
                  will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
                </td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="py-2 align-top text left">Harga Tiket</td>
                <td className="py-2 font-semibold align-top text left">{detailWisata.price}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="">
          <h1 className="text-2xl font-semibold px-1 pb-2">Lokasi</h1>
        </div>
      </div>
      <Footer />
    </main>
  );
}
